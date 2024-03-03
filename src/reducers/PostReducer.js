import { actions } from "../actions";

export const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }

    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        posts: action.data,
      };
    }

    case actions.post.POST_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [action.data, ...state.posts],
      };
    }

    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.post.POST_DELETED: {
      return {
        ...state,
        loading: false,
        error: false,
        posts: state.posts.filter((post) => post.id !== action.data),
      };
    }

    case actions.post.POST_EDITED: {
      const updatedPost = state.posts.map((post) => {
        if (post.id === action.data.id) {
          return { ...post, ...action.data };
        }
        return post;
      });

      return {
        ...state,
        loading: false,
        error: false,
        posts: updatedPost,
      };
    }
  }
};
