import React, { useEffect } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdmin, getAllAdmin } from "../../redux/adminSlice";
import AdminTable from "./AdminTable";
import CreateAdmin from "./CreateAdmin";
import ExpirySession from "../../utils/expirySession";


const ListPickupCharges = () => {
  const { admins } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAdmin());
  }, []);


  const handleDelete = ({ id }) => {
    if (
      !window.confirm("Do You want to permanently delete the selected admin?")
    ) {
      return;
    }

    dispatch(deleteAdmin(id))
      .then((response) => {
        console.log(id);
        if (response.type === "notification/delete/fulfilled") {
          console.log(response);
          dispatch(getAllAdmin());
          notification.success({
            message: " admin deleted successfully",
          });
        } else if (response.type === "notification/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting admin, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting admin, please try again later",
        });
      });
  };

  const { admin } = ExpirySession.get("user");



  return (
    <div>
      {admin?.level === 0 || admin?.level === 1 || admin?.level === 2 ? (
        <PageHeader
          extra={[
            <Button
              key="CreateAdmin"
              style={{ color: "#ff0303", border: "1px solid #ff0303" }}
            >
              <CreateAdmin />
            </Button>,
          ]}
          title="Products"
        />
      ) : (
        <PageHeader extra={[]} title="Admins" />
      )}

      <AdminTable
        data={admins?.data?.admins}
        loading={admins.loading}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ListPickupCharges;
