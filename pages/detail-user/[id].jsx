import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router);

  return <p>detail-user: {id}</p>;
};

export default Post;
