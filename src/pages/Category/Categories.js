import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteCategory,
  getAllCategories,
  hideShowCategory,
} from "../../redux/categorySlice";
import CreateCategory from "./CreateCategory";
import CategoryTable from "./CategoryTable";
import ExpirySession from "../../utils/expirySession";


const Categories = () => {
  const { categories } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const [isChecked, setIsChecked] = useState();

  const handleDelete = ({ id }) => {
    if (
      !window.confirm(
        "Do You want to permanently delete the selected category?"
      )
    ) {
      return;
    }

    dispatch(deleteCategory(id))
      .then((response) => {
        if (response.type === "category/delete/fulfilled") {
          dispatch(getAllCategories());
          notification.success({
            message: " category deleted successfully",
          });
        } else if (response.type === "category/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting category, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting category, please try again later",
        });
      });
  };

  const handleHideShowCategory = (id) => {
    dispatch(hideShowCategory(id))
      .then((response) => {
        if (response.type === "category/hideShowCategory/fulfilled") {
          setIsChecked(!isChecked);
          dispatch(getAllCategories());
          notification.success({
            message: " category updated successfully",
          });
        } else if (response.type === "category/hideShowCategory/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error updating category, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting category, please try again later",
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
              key="Createcategory"
              style={{ color: "#ff0303", border: "1px solid #ff0303" }}
            >
              <CreateCategory />
            </Button>,
          ]}
          title="Categories"
        />
      ) : (
        <PageHeader extra={[]} title="Categories" />
      )}

      <CategoryTable
        data={categories.data}
        loading={categories.loading}
        handleDelete={handleDelete}
        hideShowCategory={handleHideShowCategory}
      />
    </div>
  );
};

export default Categories;
