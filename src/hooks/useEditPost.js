import { useContext } from "react";
import { EditContext } from "../context";

export default function useEditPost() {
  return useContext(EditContext);
}
