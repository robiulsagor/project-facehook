import { Link } from "react-router-dom";
import Header from "../components/common/Header";
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
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data,
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
