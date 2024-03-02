import ThreeDotIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";
import TimeIcon from "../../assets/icons/time.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import useProfile from "../../hooks/useProfile";
import { getPostTimeDiff } from "../../utils/getPostTimeDifference";
import { useState } from "react";
import useAvatar from "../../hooks/useAvatar";

export default function PostHeader({ post }) {
  const { state } = useProfile();
  const { avatarUrl } = useAvatar(post);
  const result = getPostTimeDiff(post?.createAt);

  const [isActionActive, setIsActionActive] = useState(false);

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
        <button
          type="button"
          onClick={() => setIsActionActive((prev) => !prev)}
        >
          <img src={ThreeDotIcon} alt="3dots of Action" />
        </button>

        {isActionActive && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button className="action-menu-item hover:text-red-500">
              <img src={DeleteIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
    </header>
  );
}