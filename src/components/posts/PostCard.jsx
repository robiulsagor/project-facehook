import React from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostActions from "./PostActions";
import PostComments from "./PostComments";

export default function PostCard() {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader />
      <PostBody />
      <PostActions />
      <PostComments />
    </article>
  );
}
