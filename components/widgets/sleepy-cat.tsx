const SLEEPING = [
  "................",
  ".x....x.........",
  ".xx..xx.........",
  ".xxxxxx.xxxxx...",
  ".xexxexxxxxxxxx.",
  ".xxxxxxxxoooxxxx",
  ".xxxxxxxxxxxxxxx",
  "..gggggggggggg..",
];

const SITTING = [
  "................",
  "....x......x....",
  "....xxxxxxxx....",
  "....xxxxxxxx....",
  "....xexxxxex....",
  "....xxxppxxx....",
  "....xxxxxxxx....",
  "...xxxooooxxx...",
  "...xxxxxxxxxx...",
  "...xxxxxxxxxx..x",
  "...xxxxxxxxxx.xx",
  "...xxxxxxxxxxxx.",
];

const PIXEL = 6; // size of one pixel in px

function Sprite({ rows, className }: { rows: string[]; className: string }) {
  return (
    <svg
      viewBox={`0 0 16 ${rows.length}`}
      width={16 * PIXEL}
      height={rows.length * PIXEL}
      shapeRendering="crispEdges"
      aria-hidden
      className={`absolute bottom-0 left-0 transition-opacity duration-200 ${className}`}
    >
      {rows.flatMap((row, y) =>
        [...row].map((c, x) => {
          if (c === ".") return null;
            const fill =
  c === "e"
    ? "fill-background"
    : c === "p" || c === "o"
    ? "fill-primary"
    : c === "g"
    ? "fill-muted-foreground"
    : "fill-foreground";
          return (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} className={fill} />
          );
        })
      )}
    </svg>
  );
}
export function SleepyCat() {
  return (
    <div
      tabIndex={0}
      aria-label="A sleeping cat that sits up when you hover over it"
      className="group relative outline-none"
      style={{ width: 16 * PIXEL, height: 12 * PIXEL }}
    >
      {/* sleeping: visible by default */}
      <Sprite
        rows={SLEEPING}
        className="opacity-100 group-hover:opacity-0 group-focus:opacity-0 group-active:opacity-0"
      />
      {/* sitting: visible on hover / focus / tap */}
      <Sprite
        rows={SITTING}
        className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100"
      />

      {/* floating zzz, hidden while awake */}
<span className="pointer-events-none absolute left-[46px] top-1 animate-pulse font-mono text-[10px] text-muted-foreground transition-opacity group-hover:opacity-0 group-focus:opacity-0">        z<span className="ml-0.5 text-xs">z</span>
        <span className="ml-0.5 text-sm">Z</span>
      </span>
    </div>
  );
}