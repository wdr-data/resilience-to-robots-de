import React, { useCallback, useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import IconSearch from "@mui/icons-material/Search";

import dataOriginal from "../../../data/ai_occupations_deepl.json";
import styles from "./jobchecker.module.css";
import { matchSorter } from "match-sorter";
import Tacho from "./tacho";

// Filter duplicate job names
const data = dataOriginal.filter(
  (job, index, self) => self.findIndex((j) => j.name === job.name) === index,
);

const filterOptions = (items, { inputValue }) => {
  return matchSorter(items, inputValue, { keys: ["name", "Fam_Name"] });
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
        variant="soft"
        placeholder="Beruf suchen..."
        startDecorator={<IconSearch />}
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
          <div className={styles.tacho}>
            <Tacho job={job} />
          </div>
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
