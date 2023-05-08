import React from "react";

import tachoGradient from "./tacho-gradient.png";
import styles from "./tacho.module.css";

const minValue = 0.43;
const maxValue = 0.78;

const tachoNumberFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Generate numbers interpolated between min and max
const numberCount = 6;
const numberValues = Array.from({ length: numberCount }).map((_, i) => {
  const normalizedValue = i / (numberCount - 1);
  const value = normalizedValue * (maxValue - minValue) + minValue;
  return value;
});

const numbers = numberValues.map((value) => {
  const normalizedValue = (value - minValue) / (maxValue - minValue);
  const angle = normalizedValue * 180 - 90;
  return { formattedValue: tachoNumberFormatter.format(value), angle };
});

// Preload image
const imgTachoBackground = new Image();
imgTachoBackground.src = tachoGradient;

const Tacho = ({ job }) => {
  const normalizedValue = (job.share_total - minValue) / (maxValue - minValue);
  const angle = normalizedValue * 180 - 90;

  return (
    <svg className={styles.tacho} viewBox="0 0 100 55">
      <defs>
        <mask id="ring">
          <rect x="0" y="0" width="100" height="50" fill="black" />
          <circle cx="50" cy="50" r="45" fill="white" />
          <circle cx="50" cy="50" r="35" fill="black" />
          <rect x="0" y="50" width="100" height="50" fill="black" />
        </mask>
      </defs>
      {/* Ring */}
      <image
        xlinkHref={tachoGradient}
        x="0"
        y="0"
        width="100"
        height="100"
        mask="url(#ring)"
      />

      {/* Needle */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="5"
        transform={`rotate(${angle} 50 50)`}
        stroke="#00345f"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Numbers */}
      {numbers.map(({ formattedValue, angle }) => (
        <g key={formattedValue}>
          <text
            x="50"
            y="2.5"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${angle} 50 50)`}
            fill="#00345f"
            fontSize="4"
            fontWeight={"bold"}
          >
            {formattedValue}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default Tacho;
