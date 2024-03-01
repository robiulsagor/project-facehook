import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import Home from "../../assets/icons/home.svg";
import Notification from "../../assets/icons/notification.svg";
import Avatar from "../../assets/images/avatars/avatar_1.png";
import Logout from "../auth/Logout";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

export default function Header() {
  const { auth } = useAuth();
  const { state } = useProfile();

  const user = state?.user ?? auth?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-[#3F3F3F] bg-[#1E1F24] py-4">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Link to="/">
          <img
            className="max-w-[100px] rounded-full lg:max-w-[130px]"
            src={Logo}
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="btn-primary">
            <img src={Home} alt="Home" />
            Home
          </Link>
          <button className="icon-btn">
            <img src={Notification} alt="Notification" />
          </button>

          <Logout />

          <button className="flex-center !ml-8 gap-3">
            <Link to="/me" className="text-lg font-medium lg:text-xl">
              {user?.firstName}
            </Link>
            <img
              className="h-[32px] w-[32px] lg:h-[44px] lg:w-[44px] rounded-full"
              src={`http://localhost:3000/${user.avatar}`}
              alt="user avatar"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
