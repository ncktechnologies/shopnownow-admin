import { Avatar, Button, Table } from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "../../utils/tableColSearch";

const NotificationTable = ({ data, loading, handleDelete }) => {
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

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps({
        dataIndex: "type",
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
      title: "Message title",
      dataIndex: "message_title",
      key: "message_title",
      ...getColumnSearchProps({
        dataIndex: "message_title",
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
      title: "Message",
      dataIndex: "message_content",
      key: "message_content",
      render: (message_content) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {message_content && message_content?.substring(0, 80)}{" "}
          {message_content && message_content?.length >= 80 && "..."}
        </span>
      ),
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
            {/* <Button style={{ marginRight: "5px" }} title="View details">
            <Link to={`/notification/details/${singleData?.id}`}>{'View'}</Link>
            </Button> */}
            <Button
              danger
              onClick={() => handleDelete(singleData)}
              title="Permantly delete notification"
            >
              Delete
            </Button>
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

export default NotificationTable;
