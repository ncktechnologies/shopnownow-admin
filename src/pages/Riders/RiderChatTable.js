import { Button, Table, Avatar } from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "../../utils/tableColSearch";

const RiderChatTable = ({ data, loading }) => {
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
      title: "Profile picture",
      key: "sender",
      dataIndex: "sender",
      align: "center",
      render: (sender) => (
        <Link to={`${sender?.profile_picture}`}>
          {sender?.profile_picture ? (
            <img
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={sender?.profile_picture}
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
        </Link>
      ),
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
      ...getColumnSearchProps({
        dataIndex: "sender",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (sender) => (
        <span style={{ whiteSpace: "nowrap" }}>
      {sender?.full_name}
        </span>
      ),

    },

    {
      title: "body",
      dataIndex: "body",
      key: "body",
      render: (body) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {body && body?.substring(0, 80)}{" "}
          {body && body?.length >= 80 && "..."}{" "}
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

export default RiderChatTable;
