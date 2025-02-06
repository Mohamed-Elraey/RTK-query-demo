import { jsonPlaceHolderApi } from "../services/jsonPlaceHolderApi";
import CardComp from "./CardComp";

function CardContainer() {
  const { data: posts } = jsonPlaceHolderApi.useGetPostsQuery();

  return (
    <div className="container-fluid">
      <div className="row">
        {posts?.map((post) => (
          <div key={post.id} className="col-4 mb-4 ">
            <CardComp title={post.title} id={post.id} body={post.body} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
