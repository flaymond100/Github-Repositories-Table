import React, { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import githubLogo from "../../assets/github-logo.png";
import { RepositoryData } from "./interface";
import styles from "./RepositoryPage.module.scss";

const Card: FC<RepositoryData> = ({ data }) => {
  useTranslation();

  return (
    <div className={styles.cardSection}>
      <h3>{data.repository.name}</h3>
      <p>
        <a href={data.repository.url} target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="" />
          {data.repository.url.slice(8)}
        </a>
      </p>
      <h3>
        <Trans i18nKey="repo-card.fork" />
      </h3>
      <p>{data.repository.forkCount}</p>
      <h3>
        <Trans i18nKey="repo-card.commit-comments" />
      </h3>
      <p>{data.repository.commitComments.totalCount}</p>
      <h3>
        <Trans i18nKey="repo-card.languages" />
      </h3>
      <ul>
        {data.repository.languages.nodes.length > 0
          ? data.repository.languages.nodes.map((lang) => {
              return (
                <li
                  key={data.repository.name + lang}
                  style={{ listStyle: "circle" }}
                >
                  {lang.name}
                </li>
              );
            })
          : "Not mentioned"}
      </ul>
      <h3>
        <Trans i18nKey="repo-card.repositiories" />
      </h3>
      <p>{data.repository.owner.repositories.totalCount}</p>
      <h3>
        <Trans i18nKey="repo-card.stars" />
      </h3>
      <p>{data.repository.stargazerCount}</p>
    </div>
  );
};

export default Card;
