// Split from logo-clinics.tsx (raster image wrapped in an SVG)
export function LogoTanam({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 48 32"
      fill="none"
      className={className}
      role="img"
      aria-label="TANAM"
    >
      <rect width="48" height="32" fill="url(#logo-tanam-pattern)" />
      <defs>
        <pattern
          id="logo-tanam-pattern"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#logo-tanam-image"
            transform="matrix(0.00716846 0 0 0.0107527 -0.00537634 0)"
          />
        </pattern>
        <image
          id="logo-tanam-image"
          width="141"
          height="93"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}
