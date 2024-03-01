import React, { useState } from "react";
import useProfile from "../../hooks/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";

export default function Bio() {
  const { state, dispatch } = useProfile();
  const [bio, setBio] = useState(state?.user?.bio);
  const [editMode, setEditMode] = useState(false);

  const { api } = useAxios();

  const handleEditBio = async () => {
    dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `http://localhost:3000/profile/${state?.user?.id}`,
        { bio }
      );
      if (response.status === 200) {
        dispatch({
          type: actions.profile.USER_DATA_EDITED,
          data: response.data,
        });

        setEditMode(false);
      }
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="mt-4 flex items-start gap-2 lg:mt-6">
      <div className="flex-1">
        {!editMode ? (
          <p className="leading-[188%] text-gray-400 lg:text-lg">
            {state?.user?.bio}
          </p>
        ) : (
          <textarea
            className="p-2 border bg-transparent rounded resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            cols={55}
            rows={5}
            placeholder="Enter your bio..."
          ></textarea>
        )}
      </div>

      {!editMode ? (
        <button className="flex-center h-7 w-7 rounded-full">
          <img src={EditIcon} alt="Edit" onClick={() => setEditMode(true)} />
        </button>
      ) : (
        <button className="flex-center h-7 w-7 rounded-full">
          <img src={CheckIcon} alt="check" onClick={handleEditBio} />
        </button>
      )}
    </div>
  );
}
