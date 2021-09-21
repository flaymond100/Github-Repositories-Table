import { FC } from "react";
import { useTranslation } from "react-i18next";
import githubLogo from "../../assets/github-logo.png";
import { RepositoryData } from "./interface";
import styles from "./RepositoryPage.module.scss";

const Card: FC<RepositoryData> = ({
  data: {
    repository: {
      url,
      name,
      forkCount,
      commitComments,
      languages,
      owner,
      stargazerCount,
    },
  },
}) => {
  const [translation] = useTranslation();

  return (
    <div className={styles.cardSection}>
      <h3 className={styles.cardName}>{name}</h3>
      <p className={styles.cardUrlLang}>
        <a
          className={styles.cardLink}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.cardGitLogo} src={githubLogo} alt="" />
          {url}
        </a>
      </p>
      <h3>{translation("repositoryCard.fork")}</h3>
      <p>{forkCount}</p>
      <h3>{translation("repositoryCard.commitComments")}</h3>
      <p>{commitComments.totalCount}</p>
      <h3>{translation("repositoryCard.languages")}</h3>
      <ul className={styles.cardUrlLang}>
        {languages.nodes.length > 0
          ? languages.nodes.map((lang) => {
              return (
                <li key={name + lang} style={{ listStyle: "circle" }}>
                  {lang.name}
                </li>
              );
            })
          : "Not mentioned"}
      </ul>
      <h3>{translation("repositoryCard.repositiories")}</h3>
      <p>{owner.repositories.totalCount}</p>
      <h3>{translation("repositoryCard.stars")}</h3>
      <p>{stargazerCount}</p>
    </div>
  );
};

export default Card;
