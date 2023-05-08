import React, { useCallback, useMemo, useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";

import data from "../../../data/ai_occupations_deepl.json";
import styles from "./jobchecker.module.css";
import { matchSorter } from "match-sorter";

const filterOptions = (items, { inputValue }) => {
  console.log(inputValue);
  return matchSorter(items, inputValue, { keys: ["name", "Fam_Name"] }).slice(
    0,
    100,
  );
};

const riskNumberFormatter = new Intl.NumberFormat("de-DE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const JobChecker = () => {
  const [job, setJob] = useState(null);
  const handleSelect = useCallback((ev, job) => {
    if (!job) return;
    setJob(job);
  }, []);
  return (
    <div className={styles.container}>
      <Autocomplete
        autoSelect
        className={styles.autocomplete}
        options={data}
        getOptionLabel={(option) => option.name}
        onChange={handleSelect}
        filterOptions={filterOptions}
      />
      {job && (
        <div className={styles.job}>
          <h3 className={styles.jobName}>{job.name}</h3>
          <h4>Automationsrisikoindex</h4>
          <div className={styles.tempomat}></div>
          <p>Ihr Beruf hat einen Automationsrisikoindex von</p>
          <p className={styles.riskNumber}>
            {riskNumberFormatter.format(job.share_total)}
          </p>
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
