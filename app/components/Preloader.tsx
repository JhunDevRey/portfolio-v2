/**
 * Full-screen loader shown on first visit / reload.
 * Server-rendered so it paints before any JS runs; the inline script in
 * layout.tsx sets html[data-loaded] once the window "load" event fires
 * (with a short minimum so the animation is actually seen), and CSS fades it out.
 * The element is never removed from the DOM, so hydration stays clean.
 */
const ELLIPSE_TILTS = [0, 60, 120];

export function Preloader() {
  return (
    <div id="preloader" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="pl-svg">
        {/* outer ring of points */}
        <g className="pl-spin pl-slow">
          <circle cx="100" cy="100" r="92" className="pl-dots" />
        </g>

        {/* crossing orbit lines */}
        {ELLIPSE_TILTS.map((deg, i) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            <g className={`pl-spin ${i % 2 ? "pl-rev" : ""}`} style={{ animationDuration: `${14 + i * 4}s` }}>
              <ellipse
                cx="100"
                cy="100"
                rx="84"
                ry="30"
                pathLength={100}
                className="pl-line pl-draw"
                style={{ animationDelay: `${i * 0.12}s` }}
              />
            </g>
          </g>
        ))}

        {/* concentric rings */}
        <circle cx="100" cy="100" r="66" className="pl-line pl-faint" />
        <g className="pl-spin pl-rev pl-mid">
          <circle cx="100" cy="100" r="50" className="pl-stripe" />
        </g>
        <circle cx="100" cy="100" r="32" className="pl-line pl-faint" />

        {/* orbiting points */}
        <g className="pl-spin pl-fast">
          <circle cx="166" cy="100" r="3.2" className="pl-point" />
        </g>
        <g className="pl-spin pl-rev pl-mid">
          <circle cx="100" cy="50" r="2.4" className="pl-point pl-point-fg" />
          <circle cx="100" cy="150" r="2.4" className="pl-point pl-point-fg" />
        </g>
        <g className="pl-spin pl-faster">
          <circle cx="132" cy="100" r="2.6" className="pl-point" />
        </g>

        {/* core */}
        <circle cx="100" cy="100" r="5" className="pl-core" />
      </svg>
      <p className="pl-label">[00] Loading</p>
    </div>
  );
}
