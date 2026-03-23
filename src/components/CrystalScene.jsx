import React from 'react';

// Crystal data: [cx, tipY, halfW] within a 1440 x 500 viewbox (base at y=500)
const BACK = [
  [160, 340, 40],
  [360, 295, 45],
  [560, 265, 42],
  [760, 245, 50],
  [960, 260, 44],
  [1160, 285, 44],
  [1340, 325, 38],
];

const FRONT = [
  [60, 375, 35],
  [250, 268, 52],
  [460, 195, 62],
  [660, 148, 72],
  [870, 168, 67],
  [1070, 218, 56],
  [1260, 275, 48],
  [1420, 345, 33],
];

const pts = (cx, ty, hw) => `${cx},${ty} ${cx + hw},500 ${cx - hw},500`;

const highlightPts = (cx, ty, hw) => `${cx},${ty} ${cx + hw},500 ${cx + hw * 0.15},500`;

const CrystalScene = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 1440 500"
    preserveAspectRatio="xMidYMax slice"
    className={`pointer-events-none select-none ${className}`}
    style={style}
    aria-hidden="true"
  >
    <defs>
      <filter id="crystalGlow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id="baseGlow" cx="50%" cy="0%" r="100%">
        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="leftWallGlow" cx="0%" cy="50%" r="80%">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="rightWallGlow" cx="100%" cy="50%" r="80%">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Ambient wall glow */}
    <rect x="0" y="0" width="1440" height="500" fill="url(#leftWallGlow)" />
    <rect x="0" y="0" width="1440" height="500" fill="url(#rightWallGlow)" />

    {/* Back row — darker, shorter */}
    {BACK.map(([cx, ty, hw], i) => (
      <polygon
        key={`b${i}`}
        points={pts(cx, ty, hw)}
        fill={`rgba(76,29,149,${0.42 + (i % 3) * 0.04})`}
      />
    ))}

    {/* Front row — brighter, taller */}
    {FRONT.map(([cx, ty, hw], i) => (
      <g key={`f${i}`} filter={i >= 2 && i <= 5 ? 'url(#crystalGlow)' : undefined}>
        {/* Main body */}
        <polygon points={pts(cx, ty, hw)} fill={`rgba(124,58,237,${0.52 + (i % 2) * 0.1})`} />
        {/* Right-face highlight */}
        <polygon
          points={highlightPts(cx, ty, hw)}
          fill={`rgba(192,132,252,${0.18 + (i % 2) * 0.06})`}
        />
        {/* Tip glint */}
        <circle cx={cx} cy={ty + 6} r={2} fill="rgba(221,214,254,0.6)" />
      </g>
    ))}

    {/* Golden base glow */}
    <rect x="0" y="400" width="1440" height="100" fill="url(#baseGlow)" />
  </svg>
);

export default CrystalScene;
