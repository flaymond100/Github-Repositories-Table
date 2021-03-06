import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import LanguageChange from "./LanguageChange";
import styles from "./Header.module.scss";

const Header: FC = () => {
  const [translation, i18n] = useTranslation();
  const [lang, setLang] = useState<string>("ru");

  const changeLanguage = (e: React.ChangeEvent<{ value: string }>) => {
    const currentLanguage = e.target.value;

    setLang(currentLanguage);
    i18n.changeLanguage(currentLanguage);
  };

  return (
    <div className={styles.header}>
      <div>
        <AppBar position="static">
          <Toolbar className={styles.MuiToolbar}>
            <Link to="/">
              <Button size="large" color="inherit">
                <p>{translation("homeButton")}</p>
              </Button>
            </Link>
            <div className={styles.headerBtnName}>
              <LanguageChange lang={lang} changeLanguage={changeLanguage} />
              <Typography variant="h6">
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
