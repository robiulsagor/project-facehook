import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/common/Header";
import ProfileProvider from "../providers/ProfileProvider";
import PostProvider from "../providers/PostProvider";
import PostEditProvider from "../providers/PostEditProvider";

export default function PrivateRoutes() {
  const { auth } = useAuth();
  return auth.user ? (
    <>
      <PostProvider>
        <ProfileProvider>
          <PostEditProvider>
            <Header />
            <main className="mx-auto max-w-[1020px] py-8">
              <div className="container">
                <Outlet />
              </div>
            </main>
          </PostEditProvider>
        </ProfileProvider>
      </PostProvider>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
