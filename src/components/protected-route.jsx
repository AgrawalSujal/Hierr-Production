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
/* eslint-disable react/prop-types */
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Remove ?sign-in=true after successful login
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (isLoaded && isSignedIn && params.has("sign-in")) {
      // Clean the query param
      navigate(location.pathname, { replace: true });
    }
  }, [isLoaded, isSignedIn, location, navigate]);

  // If not signed in, redirect to login route
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" replace />;
  }

  // If user has no role but is signed in, redirect to onboarding
  if (
    isSignedIn &&
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    location.pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
