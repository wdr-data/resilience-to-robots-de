import React from "react";
import { useCollapse } from "react-collapsed";
import classNames from "class-names";

import styles from "./infobox.module.css";

const IconChevron = ({ direction }) => (
  <svg
    style={{
      display: "block",
      width: "24px",
      height: "24px",
      fill: "currentColor",
    }}
    className={classNames(styles.chevron, {
      [styles.up]: direction === "up",
      [styles.down]: direction === "down",
    })}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="KeyboardArrowUpIcon"
  >
    <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
  </svg>
);

export const Infobox = ({ children }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: false,
  });

  return (
    <div className={styles.container}>
      <button {...getToggleProps({ style: {} })}>
        <span>{isExpanded ? "Erklärungstext" : "Erklärungstext"}</span>
        <span>
          <IconChevron direction={isExpanded ? "up" : "down"} />
        </span>
      </button>
      <div {...getCollapseProps({})}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Infobox;
