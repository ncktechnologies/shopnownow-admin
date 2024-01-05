import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CreateProduct from "./CreateProduct";
import {
  getAllProducts,
  deleteProduct,
  hideShowProduct,
  searchProduct,
} from "../../redux/productSlice";
import { Link } from "react-router-dom";
import ProductTable from "./ProductTable";
import styled from "styled-components";
import ExpirySession from "../../utils/expirySession";
import Form from "react-bootstrap/Form";
import SearchProductTable from "./SearchProductTable";

const Products = (props) => {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(products?.loading);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);

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

  const handleSearchProduct = (e) => {
    e.preventDefault();

    setSearchLoading(true);
    dispatch(searchProduct(searchQuery)).then((response) => {
      if (response.type === "product/search/fulfilled") {
        setSearchResults(response?.payload?.products);
        setSearchLoading(false);
      } else if (response.type === "product/search/rejected") {
        notification.error({
          message:
            response?.payload?.message ||
            "Error searching product, please try again",
        });
      }
    });
  };

  const reset = () => {
    setSearchQuery("");
    setSearchResults(null);
    setSearchLoading(false); // Set searchLoading to false
    dispatch(getAllProducts(1));
  };


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

      <Form style={{ display: "flex", gap: "20px", width: "100%" }}>
        <Form.Group
          controlId="formBasicText"
          style={{ flex: 1, marginBottom: "10px" }}
        >
          <Form.Control
            type="text"
            name="name"
            placeholder="Search product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>

        <div>
          {" "}
          <Button
            style={{
              borderRadius: "5px",
              marginRight: "5px",
              color: "#fff",
              backgroundColor: "#ff0303",
              border: "none",
            }}
            onClick={handleSearchProduct}
            variant="primary"
            type="submit"
            disabled={searchLoading ? true : false}
          >
            {searchLoading ? "Please wait..." : "Search"}
          </Button>
          <Button
            style={{
              borderRadius: "5px",
              color: "#ff0303",
              backgroundColor: "#fff",
              border: "none",
            }}
            onClick={reset}
            variant="primary"
            type="submit"
            disabled={searchLoading ? true : false}
          >
            {loading ? "Please wait..." : "Reset"}
          </Button>
        </div>
      </Form>

      {searchResults ? (
        <SearchProductTable
          data={searchResults}
          loading={searchLoading}
          handleDelete={handleDelete}
          hideShowProduct={handleHideShowProduct}
        />
      ) : (
        <ProductTable
          data={products?.data}
          loading={loading}
          handleDelete={handleDelete}
          hideShowProduct={handleHideShowProduct}
        />
      )}

      {searchResults === null && linkArray && (
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
