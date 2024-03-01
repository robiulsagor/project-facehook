import { actions } from "../actions";

export const initalState = {
  user: null,
  posts: [],
  loading: false,
  error: false,
};

export const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.profile.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        user: action?.data?.user,
        posts: action?.data?.posts,
      };
    }

    case actions.profile.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: true,
        error: action.error,
      };
    }

    case actions.profile.USER_DATA_EDITED: {
      return {
        ...state,
        loading: false,
        user: action.data,
      };
    }

    case actions.profile.USER_AVATAR_EDITED: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          avatar: action.data.avatar,
        },
      };
    }
  }
};
