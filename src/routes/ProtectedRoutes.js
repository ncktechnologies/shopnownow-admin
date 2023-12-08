import { Spin } from "antd";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

const ProtectedRoutes = ({ ...rest }) => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const Loading = () => {
    return (
      <div className="section-spin">
        <Spin />
      </div>
    );
  };

  return isLoggedIn ? (
    <DashboardLayout>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </DashboardLayout>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
