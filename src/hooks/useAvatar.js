import useProfile from "./useProfile";

export default function useAvatar(post) {
  const { state } = useProfile();

  const isMe = state?.user?.id === post?.author?.id;

  const avatar = isMe ? `${state?.user?.avatar}` : `${post?.author?.avatar}`;

  const avatarUrl = `http://localhost:3000/${avatar}`;

  return { avatarUrl };
}
