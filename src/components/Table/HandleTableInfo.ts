import { ItemsRow, RepositoriesRender } from "./interface";

const handleTableInfo = (
  repositioriesData: RepositoriesRender
): Array<ItemsRow> => {
  const rowsArr: Array<ItemsRow> = repositioriesData.search.edges.map(
    (element) => {
      return {
        name: element.node.name,
        id: element.node.id,
        owner: element.node.owner.login,
        description: element.node.description ? element.node.description : "",
        lang: element.node.languages.nodes.map((item) => item.name).join(", "),
        topics: element.node.repositoryTopics.nodes
          .map((item) => item.topic.name)
          .join(", "),
        stars: element.node.stargazers.totalCount,
      };
    }
  );

  return rowsArr;
};

export default handleTableInfo;
