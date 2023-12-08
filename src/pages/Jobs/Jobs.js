import React, { useEffect, useState } from "react";
import { Button, notification, PageHeader } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompany, getAllJobs } from "../../redux/jobSlice";
import { getAllFeatured } from "../../redux/featuredJobSlice";

import CreateCompany from "./CreateJob";
import JobTable from "./JobTable";

import styled from "styled-components";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Jobs = (props) => {
  const { jobs, featuredJobs } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);


  useEffect(() => {
    dispatch(getAllFeatured());
  }, []);


  const handleDelete = ({ id }) => {
    // if (!window.confirm('Do You want to permanently delete the selected company?')) {
    //   return
    // }
    // dispatch(deleteCompany(id))
    //   .then((response) => {
    //     if (response.type === 'company/delete/fulfilled') {
    //       dispatch(getAllCompanies())
    //       notification.success({
    //         message: ' company deleted successfully',
    //       })
    //     } else if (response.type === 'company/delete/rejected') {
    //       notification.error({
    //         message: response?.payload?.message || 'Error deleting company, please try again',
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     notification.error({
    //       message: 'Error deleting company, please try again later',
    //     })
    //   })
  };

  return (
    <div>
      <PageHeader
        // extra={[
        //   <Button key="CreateCompany">
        //     <CreateCompany />,
        //   </Button>,
        // ]}
        title="Jobs"
      />
      <StyledDiv {...props}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="All Jobs" key="1">
            <JobTable
              data={jobs.data}
              loading={jobs.loading}
              handleDelete={handleDelete}
            />
          </TabPane>
          <TabPane tab="Featured Jobs" key="2">
            <JobTable
              data={featuredJobs.data}
              loading={featuredJobs.loading}
              handleDelete={handleDelete}
            />
          </TabPane>
        </Tabs>
      </StyledDiv>
    </div>
  );
};

export default Jobs;

const StyledDiv = styled.div`
  margin-top: 1rem;
  padding: 0 0.5rem;
`;
