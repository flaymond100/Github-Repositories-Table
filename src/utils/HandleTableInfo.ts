import { ItemsRow, RepositoriesRender } from "../components/Table/interface";

const handleTableInfo = ({
  search: { edges },
}: RepositoriesRender): Array<ItemsRow> => {
  const rowsArr: Array<ItemsRow> = edges.map(
    ({
      node: {
        name,
        id,
        owner,
        description,
        languages,
        repositoryTopics,
        stargazers,
      },
    }) => {
      return {
        name,
        id,
        owner: owner.login,
        description: description || "",
        lang: languages.nodes.reduce(
          (prevLang, curLang) => `${curLang.name}, ${prevLang}`,
          ""
        ),
        topic: repositoryTopics.nodes.reduce(
          (prevTopic, curTopic) => `${curTopic.topic.name}, ${prevTopic}`,
          ""
        ),
        stars: stargazers.totalCount,
      };
    }
  );

  return rowsArr;
};

export default handleTableInfo;
