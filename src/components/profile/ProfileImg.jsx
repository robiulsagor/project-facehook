import { useRef } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import useProfile from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import { actions } from "../../actions";

export default function ProfileImg() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const fileRef = useRef();

  const handleImgUpload = (e) => {
    e.preventDefault();
    fileRef.current.click();
    fileRef.current.addEventListener("change", uploadFile);
  };

  const uploadFile = async () => {
    try {
      const formData = new FormData();

      for (const file of fileRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `http://localhost:3000/profile/${state?.user?.id}/avatar`,
        formData
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_AVATAR_EDITED,
          data: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full rounded-full w-48 h-48 object-cover"
        src={`http://localhost:3000/${state?.user?.avatar}`}
        alt="sumit saha"
      />

      <form>
        <button
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          type="submit"
        >
          <img src={EditIcon} alt="Edit" onClick={handleImgUpload} />
        </button>
        <input type="file" id="file" ref={fileRef} hidden />
      </form>
    </div>
  );
}
