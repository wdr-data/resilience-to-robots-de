import React, { useCallback, useEffect, useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import classNames from "classnames";

import dataOriginal from "../../../data/ai_occupations_deepl.json";
import styles from "./jobchecker.module.css";
import { matchSorter } from "match-sorter";
import Tacho from "./tacho";

// Filter duplicate job names and sort alphabetically
const data = dataOriginal
  .filter(
    (job, index, self) => self.findIndex((j) => j.name === job.name) === index,
  )
  .sort((a, b) => a.name.localeCompare(b.name));

const filterOptions = (items, { inputValue }) => {
  return matchSorter(items, inputValue, { keys: ["name", "Fam_Name"] });
};

const riskNumberFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const IconSearch = () => (
  <svg
    style={{
      display: "block",
      width: "24px",
      height: "24px",
      fill: "currentColor",
    }}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="SearchIcon"
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
  </svg>
);

const IconArrowRight = () => (
  <svg
    style={{
      display: "block",
      width: "24px",
      height: "24px",
      fill: "currentColor",
    }}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="ArrowForwardIcon"
  >
    <path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
  </svg>
);

const JobChecker = () => {
  const [job, setJob] = useState(null);
  const [previousJob, setPreviousJob] = useState(null);
  const [nextJob, setNextJob] = useState(null);

  const handleSelect = useCallback((ev, job) => {
    if (!job) return;
    setJob(job);
  }, []);

  useEffect(() => {
    if (!job) return;
    const index = data.findIndex((j) => j.name === job.name);

    setPreviousJob(index > 0 ? data[index - 1] : null);
    setNextJob(index < data.length - 1 ? data[index + 1] : null);
  }, [job]);

  return (
    <div className={styles.container}>
      <Autocomplete
        variant="soft"
        placeholder="Beruf suchen..."
        startDecorator={<IconSearch />}
        autoSelect
        blurOnSelect
        className={styles.autocomplete}
        options={data}
        getOptionLabel={(option) => option.name}
        onChange={handleSelect}
        filterOptions={filterOptions}
      />
      {job ? (
        <div className={styles.job}>
          <h3 className={styles.jobName}>{job.name}</h3>
          <p className={styles.riskNumber}>
            Automationsrisikoindex:{" "}
            {riskNumberFormatter.format(job.share_total)}
          </p>
          <div className={styles.tacho}>
            <Tacho job={job} />
          </div>
          <div className={styles.navigation}>
            <button disabled={!previousJob} onClick={() => setJob(previousJob)}>
              <IconArrowRight /> Vorheriger
            </button>
            <button disabled={!nextJob} onClick={() => setJob(nextJob)}>
              Nächster <IconArrowRight />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.job}>
          <p className={classNames(styles.riskNumber, styles.noJob)}>
            Jetzt einen Beruf suchen!
          </p>
          <div className={styles.tacho}>
            <Tacho />
          </div>
        </div>
      )}
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
  );
};

export default JobChecker;
