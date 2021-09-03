import { Button } from "@material-ui/core";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.scss";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Header: FC = () => {
  const classes = useStyles();
  const [translation, i18n] = useTranslation();
  const [lang, setCurrentLang] = useState<string>("en");

  const changeLanguage = (currentLang: string) => {
    const newLang = currentLang === "en" ? "ru" : "en";

    setCurrentLang(newLang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.header}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={styles.MuiToolbar}>
            <Link to="/">
              <Button size="large" color="inherit">
                <p>{translation("homeButton")}</p>
              </Button>
            </Link>
            <div className={styles.headerBtnName}>
              <Button
                onClick={() => changeLanguage(lang)}
                size="small"
                color="secondary"
                variant="contained"
              >
                <span>{translation("languageButton")}</span>
              </Button>
              <Typography variant="h6" className={classes.title}>
                <span>{translation("title")}</span>
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Header;
