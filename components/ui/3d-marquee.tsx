"use client";

import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <>
      {/* Desktop: 3D perspective marquee */}
      <div
        className={cn(
          "mx-auto hidden lg:block h-[600px] overflow-hidden rounded-2xl",
          className,
        )}
      >
        <div className="flex size-full items-center justify-center">
          <div className="w-[2200px] h-[1720px] shrink-0 scale-100">
            <div
              style={{
                transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
              }}
              className="relative top-96 right-[50%] grid size-full origin-top-left grid-cols-4 gap-8 transform-3d"
            >
              {chunks.map((subarray, colIndex) => (
                <div
                  key={colIndex + "marquee"}
                  className={cn(
                    "flex flex-col items-start gap-8",
                    colIndex % 2 === 0 ? "marquee-col-down" : "marquee-col-up"
                  )}
                >
                  <GridLineVertical className="-left-4" offset="80px" />
                  {subarray.map((image, imageIndex) => (
                    <div className="relative" key={imageIndex + image}>
                      <GridLineHorizontal className="-top-4" offset="20px" />
                      <img
                        key={imageIndex + image}
                        src={image}
                        alt={`Image ${imageIndex + 1}`}
                        className="aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl hover:-translate-y-2.5 transition-transform duration-300"
                        width={970}
                        height={700}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: 2D flat marquee grid */}
      <div
        className={cn(
          "mx-auto block lg:hidden overflow-hidden rounded-2xl h-[260px] sm:h-[340px]",
          className,
        )}
      >
        <div className="grid grid-cols-2 gap-3 p-3 h-full">
          {[0, 1].map((colIndex) => (
            <div
              key={colIndex + "flat-marquee"}
              className={cn(
                "flex flex-col gap-3",
                colIndex % 2 === 0 ? "marquee-col-down" : "marquee-col-up"
              )}
            >
              {chunks[colIndex]?.map((image, imageIndex) => (
                <img
                  key={imageIndex + image}
                  src={image}
                  alt={`Image ${imageIndex + 1}`}
                  className="w-full aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5"
                />
              ))}
              {chunks[colIndex]?.map((image, imageIndex) => (
                <img
                  key={imageIndex + image + "-dup"}
                  src={image}
                  alt={`Image ${imageIndex + 1}`}
                  className="w-full aspect-[970/700] rounded-lg object-cover ring ring-gray-950/5"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const GridLineHorizontal = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "5px",
          "--fade-stop": "90%",
          "--offset": offset || "200px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

const GridLineVertical = ({
  className,
  offset,
}: {
  className?: string;
  offset?: string;
}) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          "--offset": offset || "150px",
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};
