import LogoutIcon from "../../assets/icons/logout.svg";
import useAuth from "../../hooks/useAuth";

export default function Logout() {
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
