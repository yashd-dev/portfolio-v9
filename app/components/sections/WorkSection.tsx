"use client";

/**
 * Full-width hero image collage with mask shape and colour-tint overlays.
 * Uses responsive srcset-like approach via CSS background-image breakpoints.
 */
export default function WorkSection() {
  return (
    <section
      id="section-work"
      className="flex w-full"
      style={{ padding: 0 }}
    >
      <div className="w-full" style={{ paddingTop: "50vh", paddingBottom: "20px" }}>
        <div className="w-full">
          <figure
            className="relative w-full"
            style={{
              maskImage: 'url("/images/collage-shape.svg")',
              maskSize: "contain",
              maskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskImage:
                'url("/images/collage-shape.svg")',
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            {/* The collage image */}
            <div
              className="w-full"
              style={{
                paddingBottom: "205.556%",
                backgroundImage:
                  'url("/images/collage.png")',
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            {/* Colour-tint overlays (controlled by theme class in globals.css) */}
            <div className="image-overlay-01 absolute inset-0" />
            <div className="image-overlay-02 absolute inset-0" />
          </figure>
        </div>
      </div>
    </section>
  );
}
