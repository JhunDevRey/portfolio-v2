type LogoProps = {
  size?: number;
  className?: string;
};

// J + P monogram: one shared stem, the P's bowl off the top and the J's hook off the bottom.
export const LOGO_PATH = "M11 8.5H19a4 4 0 0 1 0 8h-3M16 8.5V21a4 4 0 0 1-8 0";

export function Logo({ size = 28, className = "" }: LogoProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`inline-flex shrink-0 rounded-[28%] bg-gradient-to-br from-red-500 to-red-800 shadow-[0_0_16px_-2px_rgb(239_68_68/0.7),inset_0_1px_0_rgb(255_255_255/0.25)] ${className}`}
    >
      <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
        <path
          d={LOGO_PATH}
          stroke="#fff"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="22.5" cy="23" r="1.9" fill="#fff" fillOpacity="0.55" />
      </svg>
    </span>
  );
}
