import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import githubLogo from "../../assets/github-logo.png";
import { RepositoryData } from "./interface";
import styles from "./RepositoryPage.module.scss";

const Card: FC<RepositoryData> = ({ data }) => {
  const [translation] = useTranslation();

  return (
    <div className={styles.cardSection}>
      <h3>{data.repository.name}</h3>
      <p>
        <a href={data.repository.url} target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="" />
          {data.repository.url.slice(8)}
        </a>
      </p>
      <h3>{translation("repositoryCard.fork")}</h3>
      <p>{data.repository.forkCount}</p>
      <h3>{translation("repositoryCard.commitComments")}</h3>
      <p>{data.repository.commitComments.totalCount}</p>
      <h3>{translation("repositoryCard.languages")}</h3>
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
      <h3>{translation("repositoryCard.repositiories")}</h3>
      <p>{data.repository.owner.repositories.totalCount}</p>
      <h3>{translation("repositoryCard.stars")}</h3>
      <p>{data.repository.stargazerCount}</p>
    </div>
  );
};

export default Card;
