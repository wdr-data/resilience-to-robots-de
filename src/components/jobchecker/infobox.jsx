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

export const Infobox = () => {
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
        <div className={styles.content}>
          <p>
            Fugiat proident amet et voluptate sunt in laborum nisi. Quis sit
            sunt pariatur elit. Eu qui Lorem incididunt est ex enim sint.
            Consectetur eu cupidatat in veniam laborum velit irure. Anim mollit
            incididunt consequat minim id enim exercitation adipisicing nisi.
            Consequat duis minim amet fugiat nisi ullamco adipisicing velit
            occaecat aliqua. Aliqua incididunt laboris pariatur aute ad non
            excepteur voluptate aliquip quis officia ea.
          </p>
          <p>
            Pariatur aliqua qui et excepteur aliqua velit sunt ea voluptate
            cillum qui sit pariatur. Laboris laboris magna sint incididunt
            proident cupidatat enim. Tempor id minim cupidatat consectetur
            officia sint dolore nulla deserunt ex culpa et nostrud nostrud.
            Excepteur est proident id reprehenderit cupidatat officia est ad
            nisi occaecat ad enim proident. Eu pariatur tempor amet ipsum
            nostrud culpa duis qui veniam consectetur. Aliquip et labore ea
            officia sint adipisicing qui minim sint ullamco. Ex culpa irure do
            occaecat et incididunt.
          </p>
          <p>
            Lesen Sie mehr zu der Methodik hinter dem Automationsrisikoindex{" "}
            <a
              href="https://lis2.epfl.ch/resiliencetorobots/#/doc/index"
              target="_blank"
              rel="noreferrer noopener"
            >
              hier
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Infobox;
