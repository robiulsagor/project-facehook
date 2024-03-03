import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import PostEntry from "./PostEntry";
import useProfile from "../../hooks/useProfile";
import useEditPost from "../../hooks/useEditPost";

export default function NewPost() {
  // const [showEntry, setShowEntry] = useState(false);
  const { mode, setMode, postId, setPostId } = useEditPost();
  const { auth } = useAuth();
  const { state } = useProfile();
  const user = state?.user ?? auth?.user;

  return (
    <>
      {mode !== null ? (
        <PostEntry
          onAdd={() => {
            setMode(null);
            setPostId("");
          }}
          mode={mode}
          postId={postId}
        />
      ) : (
        <div className="card">
          <div className="flex-center mb-3 gap-2 lg:gap-4">
            <img
              className="w-10 h-10 rounded-full lg:h-[58px] lg:w-[58px]"
              src={`http://localhost:3000/${user?.avatar}`}
              alt="avatar"
            />

            <div className="flex-1">
              <textarea
                className="h-16 w-full rounded-md bg-lighterDark p-3 focus:outline-none sm:h-20 sm:p-6"
                name="post"
                id="post"
                onClick={() => setMode("create")}
                placeholder="What's on your mind?"
              ></textarea>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
