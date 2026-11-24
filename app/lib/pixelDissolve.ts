// Pixel dissolve between two page states using the View Transitions API.
// The browser snapshots the old page; the new page is revealed through a mask
// of square cells that switch on in random order. Falls back to an instant
// change when View Transitions are unsupported or reduced motion is requested.

type ViewTransitionLike = { ready: Promise<void>; finished: Promise<void> };
type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => ViewTransitionLike;
};

const DURATION = 550; // ms
const SCALE = 8; // canvas px per cell; keeps cell edges crisp when the mask is stretched

let running = false;

export function pixelDissolve(apply: () => void) {
  const doc = document as DocWithVT;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || reduced) {
    apply();
    return;
  }
  if (running) return;
  running = true;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const cell = Math.max(16, Math.round(Math.min(w, h) / 36));
  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);
  const total = cols * rows;

  // Random reveal order (Fisher-Yates)
  const order = new Uint32Array(total);
  for (let i = 0; i < total; i++) order[i] = i;
  for (let i = total - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = order[i];
    order[i] = order[j];
    order[j] = t;
  }

  const canvas = document.createElement("canvas");
  canvas.width = cols * SCALE;
  canvas.height = rows * SCALE;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    running = false;
    apply();
    return;
  }
  ctx.fillStyle = "#000";

  const root = document.documentElement;
  const setMask = () => root.style.setProperty("--px-mask", `url(${canvas.toDataURL()})`);
  root.style.setProperty("--px-mask-size", `${cols * cell}px ${rows * cell}px`);
  setMask(); // fully transparent: new state starts hidden
  root.classList.add("px-dissolving");

  const cleanup = () => {
    root.classList.remove("px-dissolving");
    root.style.removeProperty("--px-mask");
    root.style.removeProperty("--px-mask-size");
    running = false;
  };

  const transition = doc.startViewTransition(apply);
  transition.ready
    .then(() => {
      let shown = 0;
      const start = performance.now();
      const frame = (now: number) => {
        const p = Math.min(1, (now - start) / DURATION);
        const eased = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
        const target = p >= 1 ? total : Math.floor(eased * total);
        for (; shown < target; shown++) {
          const idx = order[shown];
          ctx.fillRect((idx % cols) * SCALE, Math.floor(idx / cols) * SCALE, SCALE, SCALE);
        }
        setMask();
        if (p < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    })
    .catch(cleanup);
  transition.finished.then(cleanup, cleanup);
}
