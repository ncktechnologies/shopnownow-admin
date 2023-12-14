import React, { useEffect, useState } from 'react'
import { Button, notification, PageHeader } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { editSiteData, getAllSiteData } from '../../redux/siteDataSlice'
import UpdateSiteData from './UpdateSiteData'
import { useNavigate, useParams } from "react-router-dom";
import { BsPhone, BsArrowLeft, BsEnvelope } from "react-icons/bs";
import styled from "styled-components";
import moment from "moment";
import { Avatar, Card, Typography } from "antd";
import Meta from "antd/lib/card/Meta";

const SiteData = () => {

    const { sitedata } = useSelector((state) => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSiteData())
      }, [])

  return (
    <div><PageHeader
    extra={[
      <Button key='editSiteData' style={{color: '#ff0303', border: '1px solid #ff0303'}}>
        <UpdateSiteData sitedata={sitedata}/>
      </Button>,
    ]}
    title='Site Data'
  />
  
  <StyledContainer>
      <div>
        <div className="userInfo">
          <Card
            className="userInfo__card"
          >

            <Meta
              description={
                <div className="metaDescription">
           
                  <div className="flex align-middle items-center gap-4 flex-wrap article-detail">
                    <h2>FAQ</h2>
                    <strong>{sitedata?.data?.faq}</strong>
                  
                  </div>

                

            
                </div>
              }
            />
          </Card>
          <Card
            className="userInfo__card"
          >

            <Meta
              description={
                <div className="metaDescription">
           
            

                  <div className="flex align-middle items-center gap-4 flex-wrap article-detail">
                    <h2>Terms and Conditions</h2>
                    <strong>{sitedata?.data?.terms_and_conditions}</strong>
                  
                  </div>


            
                </div>
              }
            />
          </Card>
          <Card
            className="userInfo__card"
          >

            <Meta
              description={
                <div className="metaDescription">
           
            

                  <div className="flex align-middle items-center gap-4 flex-wrap article-detail">
                    <h2>Privacy Policy</h2>
                    <strong>{sitedata?.data?.privacy_policy}</strong>
                  
                  </div>

                 

            
                </div>
              }
            />
          </Card>
          <Card
            className="userInfo__card"
          >

            <Meta
              description={
                <div className="metaDescription">
        

                  <div className="flex align-middle items-center gap-4 flex-wrap article-detail">
                    <h2>Contact Data</h2>
                    <strong>{sitedata?.data?.contact_data}</strong>
                  
                  </div>

            
                </div>
              }
            />
          </Card>
        </div>
      </div>
    </StyledContainer>
  
  </div>
  )
}

export default SiteData

const StyledContainer = styled.div`
  .ant-card-meta {
    align-items: center !important;
  }

  .userInfo__card {
    margin-bottom: 1rem;
  }

  .metaDescription {
    a {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }

  .userInfo {
    &__back {
      display: flex;
      justify-content: flex-end;
      button {
        display: flex;
        gap: 0.2rem;
        align-items: center;
        transition: all 0.3s;
      }
      button :hover {
        gap: 0.5rem;
      }
    }
  }

  .infoTab {
    margin-top: 1rem;
    padding: 0 0.5rem;
  }
  .article-detail {
    margin-top: 5px;
  }
`;