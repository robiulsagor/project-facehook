import { useState } from "react";
import { EditContext } from "../context";

export default function PostEditProvider({ children }) {
  const [mode, setMode] = useState(null);
  const [postId, setPostId] = useState(null);

  return (
    <EditContext.Provider value={{ mode, setMode, postId, setPostId }}>
      {children}
    </EditContext.Provider>
  );
}
