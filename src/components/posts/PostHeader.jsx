import ThreeDotIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import { getPostTimeDiff } from "../../utils/getPostTimeDifference";
import { useState } from "react";
import useAvatar from "../../hooks/useAvatar";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import usePost from "../../hooks/usePost";
import { actions } from "../../actions";
import useEditPost from "../../hooks/useEditPost";

export default function PostHeader({ post }) {
  const { mode, setMode, setPostId } = useEditPost();

  const { auth } = useAuth();
  const { avatarUrl } = useAvatar(post);
  const { api } = useAxios();
  const result = getPostTimeDiff(post?.createAt);
  const { dispatch } = usePost();

  const [isActionActive, setIsActionActive] = useState(false);

  const isMe = post?.author?.id === auth?.user?.id;

  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete this post?")) {
      try {
        const response = await api.delete(
          `http://localhost:3000/posts/${post.id}`
        );
        if (response.status == 200) {
          dispatch({
            type: actions.post.POST_DELETED,
            data: post?.id,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsActionActive(false);
    }
  };

  const initiatPostEdit = () => {
    setMode("update");
    setPostId(post?.id);
    setIsActionActive(false);
  };

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          className="w-10 h-10 rounded-full lg:h-[58px] lg:w-[58px]"
          src={avatarUrl}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">{result}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {isMe && (
          <button
            type="button"
            onClick={() => setIsActionActive((prev) => !prev)}
          >
            <img src={ThreeDotIcon} alt="3dots of Action" />
          </button>
        )}

        {isActionActive && (
          <div className="action-modal-container">
            <button
              onClick={initiatPostEdit}
              className="action-menu-item hover:text-lwsGreen"
            >
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="action-menu-item hover:text-red-500"
            >
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
