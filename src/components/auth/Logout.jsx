import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAuth";

export default function Logout() {
  const navigate = useNavigate("");
  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth({});
  };
  return (
    <button className="icon-btn">
      <img src={LogoutIcon} onClick={handleLogout} alt="Logout" />
    </button>
  );
}
