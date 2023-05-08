import React, { useRef, useState } from "react";

import tachoGradient from "./tacho-gradient.png";
import styles from "./tacho.module.css";

const minValue = 0.43;
const maxValue = 0.78;

const tachoNumberFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const normalizeValue = (value) => (value - minValue) / (maxValue - minValue);

// Generate numbers interpolated between min and max
const numberCount = 6;
const numberValues = Array.from({ length: numberCount }).map((_, i) => {
  const normalizedValue = i / (numberCount - 1);
  const value = normalizedValue * (maxValue - minValue) + minValue;
  return value;
});

const numbers = numberValues.map((value) => {
  const angle = normalizeValue(value) * 180 - 90;
  return { formattedValue: tachoNumberFormatter.format(value), angle };
});

// Preload image
if (typeof window !== "undefined") {
  const imgTachoBackground = new Image();
  imgTachoBackground.src = tachoGradient;
}

const Tacho = ({ job }) => {
  const [angle, setAngle] = useState(-90);
  const [previusAngle, setPreviusAngle] = useState(-90);

  const animationRef = useRef(null);
  const jobRef = useRef(null);

  React.useEffect(() => {
    if (jobRef.current !== job) {
      // Calculate the angle for the new job and animate the needle
      const newAngle = normalizeValue(job.share_total) * 180 - 90;
      setPreviusAngle(angle);
      setAngle(newAngle);

      jobRef.current = job;
    }
  }, [job]);

  React.useEffect(() => {
    if (animationRef.current) {
      animationRef.current.beginElement();
    }
  }, [angle]);

  return (
    <svg className={styles.tacho} viewBox="0 0 100 55">
      {/* Mask for the ring */}
      <defs>
        <mask id="mask-ring">
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
        mask="url(#mask-ring)"
      />

      {/* Needle */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="5"
        stroke="#00345f"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animateTransform
          ref={animationRef}
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          from={`${previusAngle} 50 50`}
          to={`${angle} 50 50`}
          dur="500ms"
          calcMode="spline"
          keySplines="0.5 0 0.5 1"
          keyTimes={"0; 1"}
          fill="freeze"
          restart="always"
        />
      </line>

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
