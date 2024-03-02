import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";

export default function Homepage() {
  const { auth } = useAuth();

  return (
    <>
      <h2>Helllo....</h2>

      <Link to="/me"> Go to profile page </Link>
    </>
  );
}
