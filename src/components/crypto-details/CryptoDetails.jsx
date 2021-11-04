import { Col, Row, Typography } from 'antd';
import millify from 'millify';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../../redux/feature/CryptoApi';
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import './CryptoDetails.css';
import HTMLReactParser from 'html-react-parser';
import Loader from '../../loader/Loader';

const CryptoDetails = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetCryptoDetailsQuery(id);
  if (isFetching) {
    return <Loader />;
  }
  const cryptoDetails = data?.data?.coin;

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'Rank',
      value: millify(cryptoDetails?.rank),
      icon: <NumberOutlined />,
    },
    {
      title: '24h Volume',
      value: `$ ${millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${millify(cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(cryptoDetails?.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: millify(cryptoDetails?.numberOfMarkets),
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: millify(cryptoDetails?.numberOfExchanges),
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails?.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(cryptoDetails?.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(cryptoDetails?.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className='crypto-details-container'>
      <Typography.Title level={2} className='title main-title'>
        {data?.data?.coin?.name} ({data?.data?.coin?.slug}) Price
      </Typography.Title>
      <Typography.Text className='text' style={{ textAlign: 'center' }}>
        {data?.data?.coin?.name} live price in US Dollar (USD). View value
        statistics, market cap and supply.
      </Typography.Text>
      <Row>
        <Col xs={24} sm={12} className='stats'>
          <Typography.Title level={3} className='title'>
            {data?.data?.coin?.name} Value Statistics
          </Typography.Title>
          <Typography.Text>
            An overview showing the statistics of {data?.data?.coin?.name}, such
            as the base and quote currency, the rank, and trading volume.
          </Typography.Text>

          {stats?.map((statsData, index) => (
            <Col className='stats-data' key={index}>
              <Col>
                <Typography.Text>{statsData.icon}</Typography.Text>
                <Typography.Text>{statsData.title}</Typography.Text>
              </Col>
              <Typography.Title level={3}>{statsData.value}</Typography.Title>
            </Col>
          ))}
        </Col>
        <Col xs={24} sm={12} className='stats'>
          <Typography.Title level={3} className='title'>
            Other Stats Info
          </Typography.Title>
          <Typography.Text>
            An overview showing the statistics of {data?.data?.coin?.name}, such
            as the base and quote currency, the rank, and trading volume.
          </Typography.Text>
          {genericStats?.map((data, index) => (
            <Col className='stats-data' key={index}>
              <Col>
                <Typography.Text>{data.icon}</Typography.Text>
                <Typography.Text>{data.title}</Typography.Text>
              </Col>
              <Typography.Title level={3}>{data.value}</Typography.Title>
            </Col>
          ))}
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} className='description-container'>
          <Typography.Title level={3} className='title'>
            What is {data?.data?.coin?.name}?
          </Typography.Title>
          <Typography.Text>
            {HTMLReactParser(data?.data?.coin?.description || '')}
          </Typography.Text>
        </Col>
        <Col Col xs={24} sm={12} className='links-container'>
          <Typography.Title level={3} className='title'>
            {data?.data?.coin?.name} Links
          </Typography.Title>
          {data?.data?.coin?.links?.map((data, index) => (
            <Col className='links' key={index}>
              <Typography.Title level={4}>Website</Typography.Title>
              <Typography.Title level={4} className='link'>
                <a href={data.url} target='_blank' rel='noreferrer'>
                  {data.name}
                </a>
              </Typography.Title>
            </Col>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default CryptoDetails;
