import { FC } from "react";
import { useQuery } from "@apollo/client";
import GET_SINGLE_REPO from "../../GraphQL/Query/GetSingleRepository";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import styles from "./RepositoryPage.module.scss";
import { RepoProps, Repository, Variables } from "./interface";
import Card from "./Card";
import mockData from "./mockData.json";

const Repo: FC<RepoProps> = ({ match: { params } }) => {
  const { loading, error, data } = useQuery<Repository, Variables>(
    GET_SINGLE_REPO,
    {
      variables: { name: params.id, owner: params.owner },
    }
  );

  if (loading) return <Loading />;

  if (error) return <Error />;

  return data ? (
    <>
      <div className={styles.bodyHeader}>
        <h2 className={styles.repositoryName}>{data.repository.name}</h2>
        <div className={styles.bodyDetails}>
          <p className={styles.repositoryDetails}>
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
            <p className={styles.descriptionText}>
              {data.repository.description}
            </p>
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
