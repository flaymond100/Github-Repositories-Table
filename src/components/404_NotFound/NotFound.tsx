import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./NotFound.module.scss";

const NotFound: FC = () => {
  const [translation] = useTranslation();

  return (
    <div className={styles.errorContainer}>
      <h1>{translation("notFound")}</h1>
    </div>
  );
};

export default NotFound;
