// Raster image wrapped in an SVG, 51x32 box with the wordmark centered
export function LogoVinir({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 51 32"
      fill="none"
      className={className}
      role="img"
      aria-label="VINIR"
    >
      <rect y="8" width="51" height="16" fill="url(#logo-vinir-pattern)" />
      <defs>
        <pattern
          id="logo-vinir-pattern"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#logo-vinir-image"
            transform="scale(0.00980392 0.03125)"
          />
        </pattern>
        <image
          id="logo-vinir-image"
          width="102"
          height="32"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}
