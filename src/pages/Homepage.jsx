import Header from "../components/common/Header";
import useAuth from "../hooks/useAuth";

export default function Homepage() {
  const { auth } = useAuth();

  console.log(auth);
  return (
    <>
      <Header />

      <h2>Helllo....</h2>
    </>
  );
}
