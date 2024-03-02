import { useState } from "react";
import useAvatar from "../../hooks/useAvatar";
import PostCommentLists from "./PostCommentLists";
import useAuth from "../../hooks/useAuth";

export default function PostComments({ post }) {
  const { auth } = useAuth();
  const [showComments, setShowComments] = useState(false);

  return (
    <div>
      <div className="flex-center mb-3 gap-2 lg:gap-4">
        <img
          className="w-7 h-7 rounded-full lg:h-[34px] lg:w-[34px]"
          src={`http://localhost:3000/${auth?.user?.avatar}`}
          alt="avatar"
        />

        <div className="flex-1">
          <input
            type="text"
            className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
            name="post"
            id="post"
            placeholder="What's on your mind?"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="text-gray-300 max-md:text-sm"
        >
          All Comment {showComments ? "▼" : "▲"}
        </button>
      </div>

      {showComments && <PostCommentLists comments={post?.comments} />}
    </div>
  );
}
