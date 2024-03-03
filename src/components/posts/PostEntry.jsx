import AddPhotoIcon from "../../assets/icons/addPhoto.svg";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { postReducer } from "../../reducers/PostReducer";
import usePost from "../../hooks/usePost";
import { actions } from "../../actions";
import Field from "../common/Field";
import { useEffect, useRef, useState } from "react";

export default function PostEntry({ onAdd, mode, postId }) {
  const { auth } = useAuth();
  const { state: profile } = useProfile();
  const { dispatch } = usePost();
  const fileRef = useRef();
  const { api } = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const user = profile?.user ?? auth?.user;
  const [data, setData] = useState("");

  const handleAddPost = async (formData) => {
    dispatch({ type: actions.post.DATA_FETCHING });

    try {
      const resposne = await api.post("http://localhost:3000/posts", {
        formData,
      });
      if (resposne.status == 200) {
        console.log(resposne.data);
        dispatch({
          type: actions.post.POST_CREATED,
          data: resposne.data,
        });
      }
      onAdd();
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
      });
    }
  };

  // update post
  const handleUpdatePost = async (formData) => {
    // dispatch({ type: actions.post.DATA_FETCHING });

    console.log(formData);
    try {
      const resposne = await api.patch(
        `http://localhost:3000/posts/${postId}`,
        formData
      );
      if (resposne.status == 200) {
        console.log(resposne.data);
        dispatch({
          type: actions.post.POST_EDITED,
          data: resposne.data,
        });
      }
      onAdd();
    } catch (error) {
      console.log(error);
      dispatch({
        type: actions.post.DATA_FETCH_ERROR,
      });
    }
  };

  // this effect loads the data for editing a post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`http://localhost:3000/posts/${postId}`);
        if (response.status == 200) {
          setData(response.data.content);
        }
      } catch (error) {
        console.log(error);
      }
    };

    postId && fetchPost();
  }, [postId]);

  return (
    <div className="card relative">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        {mode == "create" ? "Create " : "Update"}
        Post
      </h6>

      <form onSubmit={handleSubmit(postId ? handleUpdatePost : handleAddPost)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="w-10 h-10 rounded-full lg:h-[58px] lg:w-[58px]"
              src={`http://localhost:3000/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {""} {user?.lastName}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
          >
            <img src={AddPhotoIcon} alt="Add Photo" />
            Add Photo
          </label>
          <input
            ref={fileRef}
            type="file"
            name="image"
            id="photo"
            className="hidden"
          />
        </div>
        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some content is mandatory!",
            })}
            name="content"
            id="content"
            defaultValue={data}
            autoFocus={true}
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>

        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6 space-y-2">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
          <button
            className="auth-input bg-red-400 font-bold text-deepDark transition-all hover:opacity-90"
            type="button"
            onClick={onAdd}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
