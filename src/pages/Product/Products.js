import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CreateProduct from "./CreateProduct";
import {
  getAllProducts,
  deleteProduct,
  hideShowProduct,
} from "../../redux/productSlice";
import { Link } from "react-router-dom";
import ProductTable from "./ProductTable";
import styled from "styled-components";
import ExpirySession from "../../utils/expirySession";

const Products = (props) => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(products?.loading);


  useEffect(() => {
    const fetchData = () => {
      try {
        dispatch(getAllProducts(currentPage));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [currentPage, dispatch]);

  const handleDelete = ({ id }) => {
    if (
      !window.confirm("Do You want to permanently delete the selected product?")
    ) {
      return;
    }

    dispatch(deleteProduct(id))
      .then((response) => {
        if (response.type === "product/delete/fulfilled") {
          dispatch(getAllProducts());
          notification.success({
            message: " Product deleted successfully",
          });
        } else if (response.type === "product/delete/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error deleting product, please try again",
          });
        }
      })
      .catch((error) => {
        notification.error({
          message: "Error deleting service category, please try again later",
        });
      });
  };

  const handleGetProducts = (i) => {
    setLoading(true);

    dispatch(getAllProducts(i))
      .then((response) => {
        if (response.type === "product/getAll/fulfilled") {
          setLoading(false);
          setCurrentPage(i);
          console.log(products);
        } else if (response.type === "product/getAll/rejected") {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        notification.error({
          message: "Error getting products, please try again later",
        });
      });
  };

  const [isChecked, setIsChecked] = useState();

  const handleHideShowProduct = (id) => {
    dispatch(hideShowProduct(id))
      .then((response) => {
        if (response.type === "product/hideShowProduct/fulfilled") {
          setIsChecked(!isChecked);
          dispatch(getAllProducts());
          notification.success({
            message: " product updated successfully",
          });
        } else if (response.type === "product/hideShowProduct/rejected") {
          notification.error({
            message:
              response?.payload?.message ||
              "Error updating product, please try again",
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

  const linkArray = products?.data?.links?.slice(1, -1);


  return (
    <div>
      {admin?.level === 0 || admin?.level === 1 || admin?.level === 2 ? (
        <PageHeader
          extra={[
            <Button
              key="CreateProduct"
              style={{ color: "#ff0303", border: "1px solid #ff0303" }}
            >
              <CreateProduct />
            </Button>,
          ]}
          title="Products"
        />
      ) : (
        <PageHeader extra={[]} title="Products" />
      )}

      {products?.data && (
        <ProductTable
          data={products?.data}
          loading={loading}
          handleDelete={handleDelete}
          hideShowProduct={handleHideShowProduct}
        />
      )}
      {linkArray && (
        <StyledDiv>
          {linkArray?.map((link, i) => (
            <Button
              onClick={() => handleGetProducts(link.label)}
              key={i}
              style={{
                color: currentPage == link?.label ? "white" : "black",
                background: currentPage == link?.label ? "#ff0303" : "white",
                border: "#ff0303",
              }}
            >
              {link.label}
            </Button>
          ))}
        </StyledDiv>
      )}
    </div>
  );
};

export default Products;

const StyledDiv = styled.div`
  margin-top: 1rem;
  padding: 0 0.5rem;
`;
