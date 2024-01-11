import { Avatar, Button, Table, Switch } from "antd";
import moment from "moment";
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { getColumnSearchProps } from "../../utils/tableColSearch";
import UpdateTimeSlot from "./UpdateTimeSlot";
import ExpirySession from "../../utils/expirySession";
import { getAllBands } from "../../redux/bandSlice";
import { useDispatch, useSelector } from "react-redux";

const TimeSlotTable = ({
  data,
  loading,
  showTimeSlot,
  hideTimeSlot,
  handleDelete,
}) => {
  const dispatch = useDispatch();
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

  const { band } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllBands());
  }, []);

  const { admin } = ExpirySession.get("user");

  const columns = [
    {
      title: "Start time",
      dataIndex: "start_time",
      key: "start_time",
      ...getColumnSearchProps({
        dataIndex: "delivery_time",
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
      title: "End time",
      dataIndex: "end_time",
      key: "end_time",
      ...getColumnSearchProps({
        dataIndex: "delivery_time",
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
      title: "Band",
      dataIndex: "band_id",
      key: "band_id",
      ...getColumnSearchProps({
        dataIndex: "band_id",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (bandId) => {
        const selectedBand = band?.data?.find((b) => b?.id === bandId);
        return <span>{selectedBand ? selectedBand?.name : "N/A"}</span>;
      },
    },

    {
      title: "Available",
      dataIndex: "is_available",
      key: "is_available",
      ...getColumnSearchProps({
        dataIndex: "is_available",
        handleReset,
        searchInput,
        handleSearch,
        setSearchedColumn,
        searchText,
        setSearchText,
        searchedColumn,
      }),
      render: (is_available) => (
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {is_available === 1 ? "Yes" : "No"}
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
          {admin?.level === 0 && (
            <div>
              <Button style={{ marginRight: "5px" }} title="Edit timeslot">
                <UpdateTimeSlot timeslot={singleData} />
              </Button>

              <Button
                style={{ marginRight: "5px" }}
                danger
                onClick={() => handleDelete(singleData)}
                title="delete time slot"
              >
                delete
              </Button>

              <Switch
                style={{ backgroundColor: "#ff0303", marginLeft: "10px" }}
                checked={singleData?.is_available === 1}
                onChange={
                  singleData?.is_available === 0
                    ? () => showTimeSlot(singleData?.id)
                    : () => hideTimeSlot(singleData?.id)
                }
              />
            </div>
          )}

          {admin?.level === 1 && (
            <div>
              <Button style={{ marginRight: "5px" }} title="Edit timeslot">
                <UpdateTimeSlot timeslot={singleData} />
              </Button>

              <Switch
                style={{ backgroundColor: "#ff0303", marginLeft: "10px" }}
                checked={singleData?.is_available === 1}
                onChange={
                  singleData?.is_available === 0
                    ? () => showTimeSlot(singleData?.id)
                    : () => hideTimeSlot(singleData?.id)
                }
              />
            </div>
          )}

          {admin?.level === 2 && (
            <div>
              <Switch
                style={{ backgroundColor: "#ff0303", marginLeft: "10px" }}
                checked={singleData?.is_available === 1}
                onChange={
                  singleData?.is_available === 0
                    ? () => showTimeSlot(singleData?.id)
                    : () => hideTimeSlot(singleData?.id)
                }
              />
            </div>
          )}

          {admin?.level === 3 && <div>N/a</div>}
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

export default TimeSlotTable;
