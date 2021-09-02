import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import GET_SINGLE_REPO from "../../GraphQL/Query/GetSingleRepository";
import LoadingPage from "../Loading/Loading";
import styles from "./RepositoryPage.module.scss";
import { RepoProps, Repository, Variables } from "./interface";
import Card from "./Card";
import mockData from "./mockData.json";

const Repo: React.FC<RepoProps> = ({ match }) => {
  const [getRepo, { loading, error, data }] = useLazyQuery<
    Repository,
    Variables
  >(GET_SINGLE_REPO);

  useEffect(() => {
    getRepo({
      variables: { name: match.params.id, owner: match.params.owner },
    });
  }, []);

  if (loading) return <LoadingPage />;

  if (error)
    return (
      <>
        <span>Error occurs, please reload the page</span>
      </>
    );

  return data ? (
    <>
      <div className={styles.bodyHeader}>
        <h2>{data.repository.name}</h2>
        <div className={styles.bodyDetails}>
          <p>
            {data.repository.createdAt.slice(0, 10)}&nbsp;•&nbsp;
            {data.repository.isPrivate ? "Not Public" : "Public"}&nbsp;•&nbsp;
            {data.repository.owner.login}
          </p>
        </div>
      </div>

      <div className={styles.bodyContent}>
        <div className={styles.bodyDescription}>
          <div className={styles.bodyUnderline}>
            <h1>{data.repository.name}</h1>
            <p>{data.repository.description}</p>
          </div>
          <div className={styles.bodyUnderline}>
            <h2>{mockData.header}</h2>
            <p>{mockData.text}</p>
          </div>
          <div className={styles.bodyUnderline}>
            <h2>{mockData.subHeader}</h2>
            <p>{mockData.subText}</p>
          </div>
        </div>
        <Card data={data} />
      </div>
    </>
  ) : (
    <></>
  );
};

export default Repo;
