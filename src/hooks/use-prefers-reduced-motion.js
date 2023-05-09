// Source: https://www.joshwcomeau.com/react/prefers-reduced-motion/
import React from "react";

const QUERY = "(prefers-reduced-motion: no-preference)";

const getInitialState = () =>
  typeof window !== "undefined" ? !window.matchMedia(QUERY).matches : true;

export function usePrefersReducedMotion () {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    React.useState(getInitialState);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
