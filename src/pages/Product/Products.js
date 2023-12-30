import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CreateProduct from './CreateProduct'
import {
  getAllProducts,
  deleteProduct,
  hideShowProduct,
} from "../../redux/productSlice";
import { Link } from "react-router-dom";
import ProductTable from "./ProductTable";
import styled from "styled-components";

const Products = (props) => {
  const { products } = useSelector((state) => state);

  const dispatch = useDispatch();

console.log(products)
  const handleDelete = ({ id }) => {
    // alert('id', id)
    // return
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

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [isChecked, setIsChecked] = useState();


  const handleHideShowProduct = (id) => {
  
    dispatch(hideShowProduct(id))
    .then((response)=> {
      if (response.type === "product/hideShowProduct/fulfilled") {
        setIsChecked(!isChecked)
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


  return (
    <div>
      <PageHeader   extra={[
          <Button key='CreateProduct' style={{color: '#ff0303', border: '1px solid #ff0303'}}>
            <CreateProduct />
          </Button>,
        ]} title="Products" />

      {products?.data && (
        <ProductTable
          data={products}
          loading={products?.loading}
          handleDelete={handleDelete}
          hideShowProduct={handleHideShowProduct}
        />
      )}
    </div>
  );
};

export default Products;

const StyledDiv = styled.div`
  margin-top: 1rem;
  padding: 0 0.5rem;
`;
