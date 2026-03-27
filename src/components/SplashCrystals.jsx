import { useState } from 'react';
import { motion } from 'framer-motion';

// ── palette ───────────────────────────────────────────────────────────────────
const S_DIM = 'rgba(215,205,255,0.28)';
const S_LIT = 'rgba(238,230,255,0.95)';
const F_DIM = 'rgba(192,132,252,0.18)';  // normal facet dim
const F_LIT = 'rgba(220,205,255,0.55)';  // normal facet lit
const H_DIM = 'rgba(240,228,255,0.38)';  // highlight (lit face) dim
const H_LIT = 'rgba(255,228,100,0.92)';  // highlight lit → golden specular
const I_DIM = 'rgba(100,40,200,0.05)';   // interior dim — more visible for glass look
const I_LIT = 'rgba(150,70,240,0.22)';   // interior lit

// Golden-purple glow — gold core radiating out to purple
const GLOW_OFF = 'none';
const GLOW_ON =
  'drop-shadow(0px 0px 5px rgba(255,215,50,0.94)) drop-shadow(0px 0px 18px rgba(192,100,255,0.72)) drop-shadow(0px 0px 38px rgba(100,30,220,0.38))';

// ── crystal geometry ──────────────────────────────────────────────────────────
function mkPts(w, h, tipR) {
  return [
    [0,          -h / 2    ],
    [ w * 0.46,  -h * tipR ],
    [ w * 0.50,   h / 2    ],
    [-w * 0.50,   h / 2    ],
    [-w * 0.46,  -h * tipR ],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(' ');
}

// 7 facet lines: 2 internal termination lines, 3 shoulder segments,
// 2 column verticals — each starting exactly at their shoulder junction y.
// Polygon outline already draws the outer edges so no redundant lines.
// [x1, y1, x2, y2, isHighlight]
function mkFacets(w, h, tipR) {
  const sy   = -h * tipR;   // polygon shoulder y (matches polygon vertices)
  const cBot = h / 2;

  // Asymmetric internal division positions for 3D perspective
  const xL = -w * 0.16;
  const xR =  w * 0.28;

  // Both internal junctions sit BELOW the polygon corners (sy).
  // Outer segments slope down (left-up right-down / left-down right-up).
  // Middle segment is nearly flat.
  const sIL = sy + h * 0.050;   // inner-left: below polygon shoulder
  const sIR = sy + h * 0.044;   // inner-right: nearly same → middle nearly flat

  return [
    // 2 internal termination lines: junction → tip
    [xL,  sIL,  0, -h / 2, true ],   // lit — left face edge
    [xR,  sIR,  0, -h / 2, false],
    // 3 shoulder segments
    [-w * 0.46, sy,  xL,       sIL, false],   // left:   moderate slope down (left-up right-down)
    [xL,        sIL, xR,       sIR, false],   // middle: nearly flat
    [xR,        sIR, w * 0.46, sy,  false],   // right:  moderate slope up  (left-down right-up)
    // 2 column verticals: each starts exactly at its junction y — no gap
    [xL, sIL, xL, cBot, true ],
    [xR, sIR, xR, cBot, false],
  ];
}

// ── single crystal ────────────────────────────────────────────────────────────
function Crystal({ cx, cy, w, h, angle, tipR = 0.24 }) {
  const [on, setOn] = useState(false);
  const pts    = mkPts(w, h, tipR);
  const facets = mkFacets(w, h, tipR);

  return (
    <g transform={`translate(${cx},${cy}) rotate(${angle})`}>
      <motion.g
        style={{ pointerEvents: 'auto', cursor: 'default', willChange: 'filter' }}
        initial={{ filter: GLOW_OFF }}
        animate={{ filter: on ? GLOW_ON : GLOW_OFF }}
        transition={{ duration: 0.10, ease: 'easeOut' }}
        onHoverStart={() => setOn(true)}
        onHoverEnd={() => setOn(false)}
      >
        {/* Base polygon */}
        <polygon
          points={pts}
          strokeWidth={0.72}
          strokeLinejoin="round"
          style={{
            stroke: on ? S_LIT : S_DIM,
            fill: on ? I_LIT : I_DIM,
            transition: 'stroke 0.10s, fill 0.10s',
          }}
        />
        {/* Glass shimmer */}
        <polygon points={pts} fill="url(#crystalShim)" stroke="none"
          style={{ opacity: on ? 0.95 : 0.55, transition: 'opacity 0.10s' }} />
        {/* Depth refraction */}
        <polygon points={pts} fill="url(#crystalDepth)" stroke="none"
          style={{ opacity: on ? 0.70 : 0.35, transition: 'opacity 0.10s' }} />
        {/* Facet lines */}
        {facets.map(([x1, y1, x2, y2, isHL], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            strokeWidth={isHL ? 0.85 : 0.45}
            strokeLinecap="round"
            style={{
              stroke: on ? (isHL ? H_LIT : F_LIT) : (isHL ? H_DIM : F_DIM),
              transition: 'stroke 0.10s',
            }}
          />
        ))}
      </motion.g>
    </g>
  );
}

// ── deterministic seeded pseudo-random (0..1) ─────────────────────────────────
function sr(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// ── crystal data (~90 total) ──────────────────────────────────────────────────
// Back layer crystals:
//   top tips y ≈ 245-345  (text at y≈380)
//   bottom tips y ≈ 545-645  (button at y≈525)
//   left tips x ≈ 155-285  (text left edge ~x=360)
//   right tips x ≈ 1155-1285
const CRYSTALS = (() => {
  const back  = [];
  const front = [];

  // ── BACK layer ──────────────────────────────────────────────────────────────
  // top back — 11 crystals, cx spans 155-1215
  for (let i = 0; i < 11; i++) {
    const cx    = Math.round(155 + i * 106 + (sr(i * 9 + 1) - 0.5) * 44);
    const h     = Math.round(220 + sr(i * 9 + 2) * 160);
    const w     = Math.round(h * (0.30 + sr(i * 9 + 3) * 0.26));
    const cy    = Math.round(158 + sr(i * 9 + 4) * 42);
    const angle = Math.round((180 + (sr(i * 9 + 5) - 0.5) * 46) * 10) / 10;
    const tipR  = Math.round((0.17 + sr(i * 9 + 6) * 0.17) * 100) / 100;
    back.push({ cx, cy, w, h, angle, tipR });
  }

  // bottom back — 10 crystals, cx spans 155-1155
  for (let i = 0; i < 10; i++) {
    const cx    = Math.round(155 + i * 111 + (sr(i * 9 + 101) - 0.5) * 44);
    const h     = Math.round(220 + sr(i * 9 + 102) * 150);
    const w     = Math.round(h * (0.30 + sr(i * 9 + 103) * 0.26));
    const cy    = Math.round(724 + sr(i * 9 + 104) * 36);
    const angle = Math.round(((sr(i * 9 + 105) - 0.5) * 46) * 10) / 10;
    const tipR  = Math.round((0.17 + sr(i * 9 + 106) * 0.17) * 100) / 100;
    back.push({ cx, cy, w, h, angle, tipR });
  }

  // left back — 6 crystals, cy spans 175-725
  for (let i = 0; i < 6; i++) {
    const cy    = Math.round(175 + i * 110 + (sr(i * 9 + 201) - 0.5) * 28);
    const h     = Math.round(210 + sr(i * 9 + 202) * 130);
    const w     = Math.round(h * (0.32 + sr(i * 9 + 203) * 0.26));
    const cx    = Math.round(44 + sr(i * 9 + 204) * 55);
    const angle = Math.round((90 + (sr(i * 9 + 205) - 0.5) * 44) * 10) / 10;
    const tipR  = Math.round((0.17 + sr(i * 9 + 206) * 0.17) * 100) / 100;
    back.push({ cx, cy, w, h, angle, tipR });
  }

  // right back — 6 crystals, cy spans 175-725
  for (let i = 0; i < 6; i++) {
    const cy    = Math.round(175 + i * 110 + (sr(i * 9 + 301) - 0.5) * 28);
    const h     = Math.round(210 + sr(i * 9 + 302) * 130);
    const w     = Math.round(h * (0.32 + sr(i * 9 + 303) * 0.26));
    const cx    = Math.round(1341 + sr(i * 9 + 304) * 55);
    const angle = Math.round((-90 + (sr(i * 9 + 305) - 0.5) * 44) * 10) / 10;
    const tipR  = Math.round((0.17 + sr(i * 9 + 306) * 0.17) * 100) / 100;
    back.push({ cx, cy, w, h, angle, tipR });
  }

  // ── FRONT layer ─────────────────────────────────────────────────────────────
  // top front — 10 crystals (start cx=180 to leave corner zone clear)
  // top front — 9 crystals, cx spans 155-1155
  for (let i = 0; i < 9; i++) {
    const cx    = Math.round(155 + i * 125 + (sr(i * 9 + 501) - 0.5) * 50);
    const h     = Math.round(82 + sr(i * 9 + 502) * 128);
    const w     = Math.round(h * (0.24 + sr(i * 9 + 503) * 0.24));
    const cy    = Math.round(146 + sr(i * 9 + 504) * 28);
    const angle = Math.round((180 + (sr(i * 9 + 505) - 0.5) * 44) * 10) / 10;
    const tipR  = Math.round((0.19 + sr(i * 9 + 506) * 0.17) * 100) / 100;
    front.push({ cx, cy, w, h, angle, tipR });
  }

  // bottom front — 8 crystals, cx spans 155-1120
  for (let i = 0; i < 8; i++) {
    const cx    = Math.round(155 + i * 138 + (sr(i * 9 + 601) - 0.5) * 50);
    const h     = Math.round(82 + sr(i * 9 + 602) * 128);
    const w     = Math.round(h * (0.24 + sr(i * 9 + 603) * 0.24));
    const cy    = Math.round(742 + sr(i * 9 + 604) * 28);
    const angle = Math.round(((sr(i * 9 + 605) - 0.5) * 44) * 10) / 10;
    const tipR  = Math.round((0.19 + sr(i * 9 + 606) * 0.17) * 100) / 100;
    front.push({ cx, cy, w, h, angle, tipR });
  }

  // left front — 4 crystals, cy spans 175-700
  for (let i = 0; i < 4; i++) {
    const cy    = Math.round(175 + i * 175 + (sr(i * 9 + 701) - 0.5) * 30);
    const h     = Math.round(82 + sr(i * 9 + 702) * 112);
    const w     = Math.round(h * (0.24 + sr(i * 9 + 703) * 0.24));
    const cx    = Math.round(6 + sr(i * 9 + 704) * 18);
    const angle = Math.round((90 + (sr(i * 9 + 705) - 0.5) * 40) * 10) / 10;
    const tipR  = Math.round((0.19 + sr(i * 9 + 706) * 0.17) * 100) / 100;
    front.push({ cx, cy, w, h, angle, tipR });
  }

  // right front — 4 crystals, cy spans 175-700
  for (let i = 0; i < 4; i++) {
    const cy    = Math.round(175 + i * 175 + (sr(i * 9 + 801) - 0.5) * 30);
    const h     = Math.round(82 + sr(i * 9 + 802) * 112);
    const w     = Math.round(h * (0.24 + sr(i * 9 + 803) * 0.24));
    const cx    = Math.round(1426 + sr(i * 9 + 804) * 18);
    const angle = Math.round((-90 + (sr(i * 9 + 805) - 0.5) * 40) * 10) / 10;
    const tipR  = Math.round((0.19 + sr(i * 9 + 806) * 0.17) * 100) / 100;
    front.push({ cx, cy, w, h, angle, tipR });
  }

  // ── CLUSTERS: 3 groups of 5 ────────────────────────────────────────────────
  const clusterDefs = [
    { baseCx: 175,  baseCy: 832, baseAngle:   2, spreadX: 50, spreadY: 26 },
    { baseCx: 1265, baseCy: 832, baseAngle:  -2, spreadX: 50, spreadY: 26 },
    { baseCx: 720,  baseCy:  98, baseAngle: 180, spreadX: 60, spreadY: 16 },
  ];
  clusterDefs.forEach(({ baseCx, baseCy, baseAngle, spreadX, spreadY }, ci) => {
    for (let j = 0; j < 5; j++) {
      const s    = ci * 45 + j * 9 + 1100;
      const h    = Math.round(88 + sr(s + 1) * 82);
      const w    = Math.round(h * (0.28 + sr(s + 2) * 0.24));
      const cx   = Math.round(baseCx + (sr(s + 3) - 0.5) * spreadX * 2);
      const cy   = Math.round(baseCy + (sr(s + 4) - 0.5) * spreadY * 2);
      const angle = Math.round((baseAngle + (sr(s + 5) - 0.5) * 52) * 10) / 10;
      const tipR = Math.round((0.19 + sr(s + 6) * 0.17) * 100) / 100;
      front.push({ cx, cy, w, h, angle, tipR });
    }
  });

  return [...back, ...front];
})();

// ── export ────────────────────────────────────────────────────────────────────
export default function SplashCrystals() {
  return (
    <motion.svg
      className="hidden md:block absolute inset-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ pointerEvents: 'none' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15, duration: 1.4 }}
    >
      <defs>
        {/* Diagonal highlight band — peaks on left face, simulating lit surface */}
        <linearGradient id="crystalShim" x1="0%" y1="0%" x2="100%" y2="28%">
          <stop offset="0%"   stopColor="rgba(80,20,200,0.00)" />
          <stop offset="20%"  stopColor="rgba(240,225,255,0.22)" />
          <stop offset="40%"  stopColor="rgba(255,252,255,0.12)" />
          <stop offset="65%"  stopColor="rgba(170,130,255,0.05)" />
          <stop offset="100%" stopColor="rgba(80,20,200,0.00)" />
        </linearGradient>
        {/* Depth refraction — vertical gradient giving glass body thickness */}
        <linearGradient id="crystalDepth" x1="15%" y1="0%" x2="72%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.06)" />
          <stop offset="38%"  stopColor="rgba(168,85,247,0.07)" />
          <stop offset="72%"  stopColor="rgba(100,40,220,0.04)" />
          <stop offset="100%" stopColor="rgba(60,10,180,0.00)" />
        </linearGradient>
      </defs>

      {CRYSTALS.map((c, i) => (
        <Crystal key={i} {...c} />
      ))}
    </motion.svg>
  );
}
