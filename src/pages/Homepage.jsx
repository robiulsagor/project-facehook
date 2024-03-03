import { useEffect } from "react";
import { actions } from "../actions";
import useAxios from "../hooks/useAxios";
import PostList from "../components/posts/PostList";
import usePost from "../hooks/usePost";
import NewPost from "../components/posts/NewPost";

export default function Homepage() {
  const { state, dispatch } = usePost();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });

    const fetchPosts = async () => {
      try {
        const response = await api.get("http://localhost:3000/posts");

        if (response.status === 200) {
          const sortedPosts = [...response.data].sort((a, b) => {
            const dateA = new Date(a.createAt);
            const dateB = new Date(b.createAt);
            return dateB - dateA; // Newer post comes first
          });

          dispatch({
            type: actions.post.DATA_FETCHED,
            data: sortedPosts,
          });
        }
      } catch (error) {
        dispatch({ type: actions.post.DATA_FETCH_ERROR });
      }
    };

    fetchPosts();
  }, []);

  if (state.loading) {
    return <h2>Please wait, we are working.... </h2>;
  }

  if (state.error) {
    return <h2>Hmm... There was an error: {state?.error?.message} </h2>;
  }

  return (
    <>
      <NewPost />
      <PostList posts={state?.posts} />
    </>
  );
}
