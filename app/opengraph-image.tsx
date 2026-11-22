import { ImageResponse } from "next/og";

export const alt = "Shivam Juyal — Backend engineer building LLM systems you can trust.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "80px 88px",
        backgroundColor: "#0e0d0c",
        color: "#f2ede4",
      }}
    >
      <div style={{ color: "#34d399", fontFamily: "sans-serif", fontSize: 32, fontWeight: 700 }}>
        SJ.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontFamily: "serif", fontSize: 112, letterSpacing: -4, lineHeight: 1 }}>
          Shivam Juyal
        </div>
        <div style={{ fontFamily: "sans-serif", fontSize: 34, color: "#b5aea2" }}>
          Backend engineer building LLM systems you can trust.
        </div>
      </div>
      <div style={{ width: 72, height: 4, backgroundColor: "#34d399" }} />
    </div>,
    size
  );
}
