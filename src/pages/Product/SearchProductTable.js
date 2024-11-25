import { Avatar, Button, Table, Switch } from "antd";
import moment from "moment";
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "../../utils/tableColSearch";
import EditProduct from "./EditProduct";
import { FilterOutlined } from "@ant-design/icons";
import { NumericFormat } from "react-number-format";
import ExpirySession from "../../utils/expirySession";

const SearchProductTable = ({ data, loading, hideShowProduct }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredData, setFilteredData] = useState(null); // New state for filtered data
  const [shouldRenderTable, setShouldRenderTable] = useState(false); // Flag to trigger re-render

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handlePriceFilter = () => {
    // Filter the data based on minPrice and maxPrice
    const filteredResults = data.data.filter((item) => {
      const price = parseFloat(item.price);
      return (
        isNaN(price) ||
        (price >= parseFloat(minPrice) && price <= parseFloat(maxPrice))
      );
    });

    setFilteredData(filteredResults);
    setShouldRenderTable(true);
  };

  useEffect(() => {
    if (shouldRenderTable) {
      setShouldRenderTable(false);
    }
  }, [minPrice, maxPrice]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const { admin } = ExpirySession.get("user");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps({
        dataIndex: "name",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
    },

    {
      title: "Available",
      dataIndex: "availability",
      key: "availability",
      ...getColumnSearchProps({
        dataIndex: "availability",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),

      render: (availability) => (availability === 1 ? "Yes" : "No"),
    },
    {
      title: "Measurement Unit",
      dataIndex: "unit_of_measurement",
      key: "unit_of_measurement",
      ...getColumnSearchProps({
        dataIndex: "unit_of_measurement",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      filterIcon: <FilterOutlined />, // Replace with your custom filter icon
      filterDropdown: ({ confirm }) => (
        <div style={{ padding: 8 }}>
          {/* Your custom filter components for minimum and maximum price */}
          <input
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <input
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            style={{
              color: "#fff",
              backgroundColor: "#ff0303",
              border: "none",
            }}
            onClick={() => {
              handlePriceFilter();
              confirm();
            }}
          >
            Filter
          </Button>
        </div>
      ),

      render: (price) => (
        <span style={{ whiteSpace: "nowrap" }}>
          <NumericFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₦"}
          />
        </span>
      ),
    },

    {
      title: "Image",
      key: "id",
      align: "center",
      render: (singleData) => (
        <div>
          {singleData?.thumbnail_url ? (
            <img
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={singleData?.thumbnail_url}
              height={60}
              width={60}
              alt="avatar"
            />
          ) : (
            <Avatar
              style={{ backgroundColor: "#3f8bcaa1" }}
              icon={<UserOutlined />}
              size={50}
            />
          )}
        </div>
      ),
    },

    {
      title: "Date Created",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {moment(created_at).format("DD MMM YYYY")}
        </span>
      ),
    },

    {
      title: "Date Updated",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {moment(updated_at).format("DD MMM YYYY")}
        </span>
      ),
    },

    {
      title: "Actions",
      key: "id",
      align: "center",
      render: (singleData) => (
        <>
          {(admin?.level === 0 || admin?.level === 1) && (
            <div>
              {" "}
              <Button style={{ marginRight: "5px" }} title="Edit product">
                <EditProduct data={singleData} />
              </Button>
              <Switch
                style={{ backgroundColor: "#ff0303", marginLeft: "10px" }}
                checked={singleData?.availability === 1}
                onChange={() => hideShowProduct(singleData?.id)}
              />
            </div>
          )}

          {(admin?.level === 2 || admin?.level === 3) && (
            <div>
            N/a
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        loading={loading}
        pagination={data.length > 10 ? true : false}
        dataSource={shouldRenderTable ? filteredData : data}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default SearchProductTable;
