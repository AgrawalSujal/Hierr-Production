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

// /* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  // ✅ Wait until Clerk is fully loaded
  if (!isLoaded) {
    return null; // or a loader
  }

  // 🔒 If not signed in, redirect to sign-in page
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  // 🧭 If signed in but role not set, redirect to onboarding
  if (
    isSignedIn &&
    user &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  // ✅ All checks passed
  return children;
};

export default ProtectedRoute;
