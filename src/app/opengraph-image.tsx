import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shuvadipta Das - Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
  const profilePicRes = await fetch(new URL("/profile.jpg", baseUrl));
  const profilePicBuffer = await profilePicRes.arrayBuffer();
  const uint8 = new Uint8Array(profilePicBuffer);
  let binary = "";
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  const profilePicBase64 = `data:image/jpeg;base64,${btoa(binary)}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0a0a0a",
        position: "relative",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 70% 40%, rgba(255,107,53,0.15), transparent), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(247,147,30,0.1), transparent)",
        }}
      />

      {/* Grid dots */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "60px 80px",
        }}
      >
        {/* Left side - Profile pic + name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
            gap: "24px",
          }}
        >
          {/* Profile image */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 9999,
              overflow: "hidden",
              border: "3px solid rgba(255,107,53,0.5)",
              display: "flex",
              flexShrink: 0,
            }}
          >
            <img
              src={profilePicBase64}
              alt="Shuvadipta Das"
              width={140}
              height={140}
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: 800,
                color: "#fafafa",
                fontFamily: "Inter",
                letterSpacing: "-1px",
              }}
            >
              Shuvadipta Das
            </span>
            <span
              style={{
                fontSize: 28,
                color: "#ff6b35",
                fontWeight: 600,
                fontFamily: "Inter",
              }}
            >
              Full Stack Developer
            </span>
          </div>

          {/* Tech pills */}
          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Tailwind",
              "PostgreSQL",
            ].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#a3a3a3",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  padding: "6px 12px",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right side - Decorative terminal snippet */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 380,
            flexShrink: 0,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(23,23,23,0.8)",
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(38,38,38,0.6)",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#ff5f57",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#febc2e",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 9999,
                background: "#28c840",
              }}
            />
            <span
              style={{
                marginLeft: 12,
                fontSize: 12,
                color: "#525252",
                fontFamily: "monospace",
              }}
            >
              portfolio.sh
            </span>
          </div>

          {/* Terminal body */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "20px",
              fontFamily: "monospace",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ color: "#ff6b35", fontWeight: 700 }}>$</span>
              <span style={{ color: "#e5e5e5" }}>whoami</span>
            </div>
            <span style={{ color: "#a3a3a3", paddingLeft: 20 }}>
              Shuvadipta Das
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ color: "#ff6b35", fontWeight: 700 }}>$</span>
              <span style={{ color: "#e5e5e5" }}>cat status.txt</span>
            </div>
            <span style={{ color: "#a3a3a3", paddingLeft: 20 }}>
              Open to Work
            </span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ color: "#ff6b35", fontWeight: 700 }}>$</span>
              <span style={{ color: "#e5e5e5" }}>./launch-portfolio.sh</span>
              <span
                style={{
                  display: "block",
                  width: 8,
                  height: 16,
                  background: "#ff6b35",
                  marginLeft: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom url */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 80,
          fontSize: 16,
          color: "rgba(255,255,255,0.2)",
          fontFamily: "monospace",
        }}
      >
        shoob.me
      </div>
    </div>,
    { ...size }
  );
}
