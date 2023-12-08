import { Button, Table } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const WalletTable = ({
  data,
  loading,
  parent,
  handleDecline,
  handleApprove,
  actionLoading,
}) => {
  const columns = [
    {
      title: "Cashout account ID",
      dataIndex: "cashout_account_id",
      key: "cashout_account",
      render: (cashout_account_id) => <div>{cashout_account_id}</div>,
    },

    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `₦${Number(amount).toLocaleString()}`,
    },
    {
      title: "Transaction Status",
      dataIndex: "status",
      key: "status",
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
      title: "Actions",
      key: "id",
      width: 200,
      render: (category) => (
        <div style={{ display: "flex", gap: ".5rem" }}>
          <Button
            style={{ marginRight: "5px" }}
            title="View transaction details"
          >
            <Link to={`/wallet/details/${category?.id}`}>{"View"}</Link>
          </Button>

          {category.transaction_type == "Money Added" && (
            <Button
              loading={actionLoading}
              onClick={() => {
                handleApprove(category);
              }}
            >
              Approve
            </Button>
          )}

          {category.transaction_type == "Money Added" && (
            <Button
              danger
              loading={actionLoading}
              onClick={() => {
                handleDecline(category);
              }}
            >
              Decline
            </Button>
          )}
        </div>
      ),
    },
  ].filter((item) => !item.hidden);

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

export default WalletTable;

// "id": 1,
// "provider_id": 4,
// "transaction_type": "Deposit",
// "transaction_status": "Pending",
// "amount": 3000,
// "description": "Money Added",
// "deleted_at": null,
// "created_at": "2022-09-18T14:57:32.000000Z",
// "updated_at": "2022-09-18T14:57:32.000000Z",
// "provider": {
//     "id": 4,
//     "first_name": "Justin",
//     "last_name": "Bieber",
//     "email": "folarin.tunji98@gmail.com",
//     "phone_number": null,
//     "username": "Justin9991",
//     "email_verified_at": "2022-09-16T11:30:04.000000Z",
//     "account_verified_at": "2022-09-16 11:30:04",
//     "user_type": "service_provider",
//     "profile_photo_name": "francis_747688331.png",
//     "profile_photo_url": "https://xpro.getshopeasy.com/storage/uploads/francis_747688331.png",
//     "is_social": "0",
//     "social_provider": null,
//     "social_provider_id": null,
//     "location": null,
//     "about": null,
//     "star_rating_count": null,
//     "earnings": null,
//     "created_at": "2022-09-16T11:30:04.000000Z",
//     "updated_at": "2022-09-18T15:12:05.000000Z"
// }
