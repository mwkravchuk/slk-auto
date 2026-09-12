import Image from "next/image";

type RideshareInspectionGraphicProps = {
  className?: string;
  compact?: boolean;
};

const rideshareBrands = [
  {
    name: "Uber",
    src: "/images/uber-logo.svg",
    width: 112,
    height: 39,
    className: "h-7 w-auto",
    compactClassName: "h-5 w-auto",
  },
  {
    name: "Lyft",
    src: "/images/lyft-logo.png",
    width: 118,
    height: 80,
    className: "h-9 w-auto",
    compactClassName: "h-7 w-auto",
  },
];

export function RideshareInspectionGraphic({
  className = "",
  compact = false,
}: RideshareInspectionGraphicProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        compact ? "min-h-16 gap-5 py-4" : "min-h-28 gap-7 py-8"
      } ${className}`}
    >
      {rideshareBrands.map((brand) => (
        <Image
          key={brand.name}
          src={brand.src}
          alt={`${brand.name} logo`}
          width={brand.width}
          height={brand.height}
          className={compact ? brand.compactClassName : brand.className}
        />
      ))}
    </div>
  );
}
