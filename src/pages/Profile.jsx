import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

export default function Profile() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { auth } = useAuth();
  const { api } = useAxios();

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `http://localhost:3000/profile/${auth?.user?.id}`
        );
        console.log(response);
        setUser(response?.user);
        setPosts(response?.posts);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <h2>Loading your profile. please wait...</h2>;
  }

  if (error) {
    return <h2>Error.. Try refreshing your page</h2>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <h2>
        {auth?.user?.firstName} {auth?.user?.lastName}{" "}
      </h2>

      <Link to="/">Home</Link>
    </div>
  );
}
