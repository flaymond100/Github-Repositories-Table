import { FC } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import styles from "./Error.module.scss";

const Error: FC = () => {
  const [translation] = useTranslation();

  return (
    <div className={styles.errorWrapper}>
      <Alert severity="error">
        <AlertTitle>{translation("error.title")}</AlertTitle>
        {translation("error.text")}
      </Alert>
    </div>
  );
};

export default Error;
