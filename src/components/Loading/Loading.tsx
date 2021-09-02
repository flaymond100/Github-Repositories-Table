import React from "react";
import { CircularProgress } from "@material-ui/core";
import { Trans, useTranslation } from "react-i18next";

const LoadingPage: React.FC = () => {
  useTranslation();

  return (
    <div className="CircularWrapper">
      <CircularProgress />
      <h3 style={{ border: 0 }}>
        <Trans i18nKey="loading" />
      </h3>
    </div>
  );
};

export default LoadingPage;
