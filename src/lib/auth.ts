import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { log } from "@/lib/observability/logger";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!googleClientId || !googleClientSecret) {
    log.warn("auth.provider.unavailable", { provider: "google", reason: "CREDENTIALS_NOT_CONFIGURED" });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user || !user.passwordHash) return null;

                const valid = await bcrypt.compare(
                    credentials.password as string,
                    user.passwordHash
                );

                if (!valid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role as "ADMIN" | "INSTRUCTOR" | "LEARNER",
                    passwordChangedAt: user.passwordChangedAt?.getTime() ?? 0,
                };
            },
        }),
        Google({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    logger: {
        error(error) {
            // Auth.js errors are structured and do not require logging tokens or cookies.
            log.error("auth.error", { error });
        },
        warn(code) {
            log.warn("auth.warning", { code: String(code).slice(0, 100) });
        },
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.passwordChangedAt = "passwordChangedAt" in user ? user.passwordChangedAt : 0;
            } else if (token.id) {
                const current = await prisma.user.findUnique({
                    where: { id: token.id as string },
                    select: { passwordChangedAt: true },
                });
                const changedAt = current?.passwordChangedAt?.getTime() ?? 0;
                if (changedAt > Number(token.passwordChangedAt ?? 0)) {
                    return null;
                }
            }
            if (!token.role) token.role = "LEARNER";
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as "ADMIN" | "INSTRUCTOR" | "LEARNER";
            }
            return session;
        },
    },
});
