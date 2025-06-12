// /* eslint-disable react/prop-types */
// import { Navigate, useLocation } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";

// const ProtectedRoute = ({ children }) => {
//   const { isSignedIn, isLoaded, user } = useUser();
//   const { pathname } = useLocation();

//   if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
//     return <Navigate to="/?sign-in=true" />;
//   }

//   if (
//     user !== undefined &&
//     !user?.unsafeMetadata?.role &&
//     pathname !== "/onboarding"
//   )
//     return <Navigate to="/onboarding" />;

//   return children;
// };

// export default ProtectedRoute;
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (isLoaded && isSignedIn && params.has("sign-in")) {
      params.delete("sign-in");
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [isLoaded, isSignedIn, location, navigate]);

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  if (
    isLoaded &&
    isSignedIn &&
    user &&
    !user.unsafeMetadata?.role &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
