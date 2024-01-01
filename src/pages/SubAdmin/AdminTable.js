import { Avatar, Button, Table } from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "../../utils/tableColSearch";
import ExpirySession from "../../utils/expirySession";


const AdminTable = ({ data, loading, handleDelete }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps({
        dataIndex: "email",
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
      title: "Level",
      dataIndex: "level",
      key: "level",
      ...getColumnSearchProps({
        dataIndex: "level",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),

      render: (level) => {
        if (level === 0) {
          return <div>Super Admin</div>;
        } else if (level === 1) {
          return <div>Manager</div>;
        } else if (level === 2) {
          return <div>Supervisor</div>;
        } else {
          return <div>Customer care</div>;
        }
      },

    },

    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      ...getColumnSearchProps({
        dataIndex: "created_at",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (created_at) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {moment(created_at).format("DD MMM YYYY")}
        </span>
      ),
    },

    {
      title: "Actions",
      key: "id",
      align: "center",
      render: (singleData) => (
        <>
          <div>
            {admin?.level === 0 ? <Button
              danger
              onClick={() => handleDelete(singleData)}
              title="Permantly delete admin"
            >
              delete
            </Button> : "N/a"}
            
          </div>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        loading={loading}
        pagination={data?.length > 10 ? true : false}
        dataSource={data}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default AdminTable;
