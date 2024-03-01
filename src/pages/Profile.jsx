import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useProfile from "../hooks/useProfile";
import { actions } from "../actions";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyPosts from "../components/profile/MyPosts";

export default function Profile() {
  const { state, dispatch } = useProfile();

  const { auth } = useAuth();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({
      type: actions.profile.DATA_FETCHING,
    });

    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `http://localhost:3000/profile/${auth?.user?.id}`
        );
        if (response.status == 200) {
          dispatch({
            type: actions.profile.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, []);

  if (state.loading) {
    return <h2>Loading your profile. please wait...</h2>;
  }

  if (state.error) {
    return <h2>Error.. Try refreshing your page</h2>;
  }

  return (
    <>
      <ProfileInfo />
      <MyPosts />
    </>
  );
}
