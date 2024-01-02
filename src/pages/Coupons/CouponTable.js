import { Avatar, Button, Table, Switch } from "antd";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "../../utils/tableColSearch";
import UpdateCoupon from "./UpdateCoupon";
import { NumericFormat } from "react-number-format";
import ExpirySession from "../../utils/expirySession";

const CouponTable = ({ data, loading, handleDelete }) => {
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
      title: "Code",
      dataIndex: "code",
      key: "code",
      ...getColumnSearchProps({
        dataIndex: "code",
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
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {/* <NumericFormat
            value={value}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'₦'}
          /> */}

          {value}
        </span>
      ),
    },

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
      title: "Start date",
      dataIndex: "start_date",
      key: "start_date",
      ...getColumnSearchProps({
        dataIndex: "start_date",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (start_date) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {moment(start_date).format("DD MMM YYYY")}
        </span>
      ),
    },
    {
      title: "End date",
      dataIndex: "end_date",
      key: "end_date",
      ...getColumnSearchProps({
        dataIndex: "end_date",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (end_date) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {moment(end_date).format("DD MMM YYYY")}
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

{admin?.level === 0 && ( <div>

<Button
  style={{ marginRight: "5px" }}
  title="View category details"
>
  <Link to={`/coupons/details/${singleData?.id}`}>{"View"}</Link>
</Button>

<Button style={{ marginRight: "5px" }} title="Edit timeslot">
  <UpdateCoupon coupon={singleData} />
</Button>

<Button
  style={{ marginRight: "5px" }}
  danger
  onClick={() => handleDelete(singleData)}
  title="delete coupon"
>
  delete
</Button>
</div>)}

{admin?.level === 1 && ( <div>

<Button
  style={{ marginRight: "5px" }}
  title="View category details"
>
  <Link to={`/coupons/details/${singleData?.id}`}>{"View"}</Link>
</Button>

<Button style={{ marginRight: "5px" }} title="Edit timeslot">
  <UpdateCoupon coupon={singleData} />
</Button>

</div>)}

{(admin?.level === 2 || admin?.level === 3) && ( <div>

<Button
  style={{ marginRight: "5px" }}
  title="View category details"
>
  <Link to={`/coupons/details/${singleData?.id}`}>{"View"}</Link>
</Button>


</div>)}

         
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
        dataSource={data}
        rowKey="id"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default CouponTable;
