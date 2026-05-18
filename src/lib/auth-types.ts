import "next-auth";

declare module "next-auth" {
    interface User {
        id?: string;
        role?: "ADMIN" | "INSTRUCTOR" | "LEARNER";
    }
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            role: "ADMIN" | "INSTRUCTOR" | "LEARNER";
        };
    }
}
