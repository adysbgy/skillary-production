import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Skillary — Modern Learning Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#FFFDF9",
                    backgroundImage: "linear-gradient(135deg, #FFF8EC 0%, #FFFDF9 50%, #FFF3E4 100%)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 100,
                        height: 100,
                        borderRadius: 28,
                        background: "linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))",
                        color: "white",
                        fontSize: 48,
                        fontWeight: 700,
                        marginBottom: 32,
                    }}
                >
                    S
                </div>
                <div
                    style={{
                        fontSize: 56,
                        fontWeight: 700,
                        letterSpacing: "-0.04em",
                        color: "#181818",
                    }}
                >
                    Skillary
                </div>
                <div
                    style={{
                        fontSize: 24,
                        color: "rgba(0,0,0,0.5)",
                        marginTop: 12,
                    }}
                >
                    Modern Learning Platform for Business & Digital Skills
                </div>
            </div>
        ),
        { ...size }
    );
}
