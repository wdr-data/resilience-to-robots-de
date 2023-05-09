import React, { useRef, useState } from "react";

import usePrefersReducedMotion from "../../hooks/use-prefers-reduced-motion";

import tachoGradient from "./tacho-gradient.png";
import styles from "./tacho.module.css";

const minValue = 0.43;
const maxValue = 0.78;

const normalizeValue = (value) => (value - minValue) / (maxValue - minValue);

const Tacho = ({ job }) => {
  const [angle, setAngle] = useState(-90);
  const [previusAngle, setPreviusAngle] = useState(-90);

  const prefersReducedMotion = usePrefersReducedMotion();
  const animationRef = useRef(null);
  const jobRef = useRef(null);

  React.useEffect(() => {
    if (job && jobRef.current !== job) {
      // Calculate the angle for the new job and animate the needle
      const newAngle = normalizeValue(job.share_total) * 180 - 90;
      setPreviusAngle(angle);
      setAngle(newAngle);

      jobRef.current = job;
    }
  }, [job, angle]);

  React.useEffect(() => {
    if (animationRef.current) {
      animationRef.current.beginElement();
    }
  }, [angle]);

  return (
    <svg className={styles.tacho} viewBox="3 0 94 56">
      {/* Mask for the ring */}
      <defs>
        <mask id="mask-ring">
          <rect x="0" y="0" width="100" height="50" fill="black" />
          <circle cx="50" cy="50" r="44" fill="white" />
          <circle cx="50" cy="50" r="34" fill="black" />
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
        strokeWidth="1"
        strokeLinecap="round"
        transform={
          prefersReducedMotion ? `rotate(${angle} 50 50)` : "rotate(-90 50 50)"
        }
      >
        {!prefersReducedMotion &&
          (job ? (
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
              keyTimes="0; 1"
              fill="freeze"
              restart="always"
            />
          ) : (
            <animateTransform
              ref={animationRef}
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              values="-90.5 50 50; -89.5 50 50; -90.5 50 50"
              dur="150ms"
              // calcMode="spline"
              // keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"
              // keyTimes="0; 0.5; 1"
              repeatCount="indefinite"
            />
          ))}
      </line>
      <circle cx="50" cy="50" r="2" fill="#00345f" />
      <circle cx="50" cy="50" r="1" fill="rgb(196 208 218)" />

      {/* Text */}
      <text
        x="11"
        y="51"
        textAnchor="middle"
        dominantBaseline="hanging"
        fill="#00345f"
        fontSize="4"
        fontWeight="bold"
      >
        niedrig
      </text>
      <text
        x="89"
        y="51"
        textAnchor="middle"
        dominantBaseline="hanging"
        fill="#00345f"
        fontSize="4"
        fontWeight="bold"
      >
        hoch
      </text>
      <text
        x="50"
        y="0.5"
        textAnchor="middle"
        dominantBaseline="hanging"
        fill="#00345f"
        fontSize="4"
        fontWeight="bold"
      >
        erhöht
      </text>
    </svg>
  );
};

export default Tacho;
