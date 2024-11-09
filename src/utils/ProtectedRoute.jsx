import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.products);
  console.log("🚀 ~ ProtectedRoute ~ user:", user.isAuthenticated);
  let location = useLocation();

  if (!user.isAuthenticated) {
    return <Navigate to="/signIn" state={{ from: location }} replace />;
  }
  return children;
};

// Define prop types for the component
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
