import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React, { FC } from "react";
import styles from "./Header.module.scss";

interface LanguageProps {
  lang: string;
  changeLanguage: (e: React.ChangeEvent<{ value: unknown }>) => void;
}

const LanguageChange: FC<LanguageProps> = ({ lang, changeLanguage }) => {
  return (
    <FormControl variant="outlined" className={styles.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={lang}
        onChange={changeLanguage}
        label="Language"
      >
        <MenuItem value="en">EN</MenuItem>
        <MenuItem value="ru">RU</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageChange;
