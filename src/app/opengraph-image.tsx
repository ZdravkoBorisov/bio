import { ImageResponse } from "next/og";
import { hero } from "@/content/hero";
import { site } from "@/content/site";

export const dynamic = "force-static";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(ellipse 70% 60% at 20% 0%, rgba(124,196,255,0.14), #06070a 70%)",
          color: "#e9ecef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#a3aab3", letterSpacing: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#7cc4ff" }} />
          {hero.eyebrow.join(" · ").toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05, letterSpacing: -3 }}>
          <span>{hero.headline[0]}</span>
          <span style={{ color: "#a3aab3" }}>{hero.headline[1]}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#a3aab3" }}>
          <span style={{ color: "#e9ecef" }}>{site.name}</span>
          <span>.NET · Microservices · AWS · Kafka · Terraform</span>
        </div>
      </div>
    ),
    size,
  );
}
