import { Col, Row, Space, Statistic, Typography } from 'antd';
import millify from 'millify';
import React from 'react';
import { useGetCryptosQuery } from '../../redux/feature/CryptoApi';
import { Link } from 'react-router-dom';
import './Home.css';
import CryptoCurrencies from '../crypto-currencies/CryptoCurrencies';
import CryptoNews from '../crypto-news/CryptoNews';
import Loader from '../../loader/Loader';

const Home = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  if (isFetching) {
    return <Loader />;
  }
  const globalStats = data?.data?.stats;

  return (
    <div className='home-container'>
      <div className='global-stats'>
        <Typography.Title level={2} className='heading'>
          Global Crypto Stats
        </Typography.Title>
        <Row gutter={[32, 32]}>
          <Col span={12}>
            <Statistic
              title='Total Cryptos'
              value={millify(globalStats?.total)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Exchanges'
              value={millify(globalStats?.totalExchanges)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Market Cap'
              value={`$${millify(globalStats?.totalMarketCap)}`}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total 24h Volume'
              value={`$${millify(globalStats?.total24hVolume)}`}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Crypto Currencies'
              value={millify(globalStats?.total)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title='Total Markets'
              value={millify(globalStats?.totalMarkets)}
            />
          </Col>
        </Row>
        <div className='top-cryptos'>
          <Typography.Title level={2} className='heading'>
            Top 10 Cryptos In The World
          </Typography.Title>
          <Typography.Title level={3} className='heading'>
            <Link to='/currencies'>Show More</Link>
          </Typography.Title>
        </div>
        <CryptoCurrencies simplified={true} />
        <div className='crypto-news'>
          <Typography.Title level={2} className='heading'>
            Latest Crypto News
          </Typography.Title>
          <Typography.Title level={3} className='heading'>
            <Link to='/news'>Show More</Link>
          </Typography.Title>
        </div>
        <CryptoNews simplified={true} />
      </div>
      <div className='footer'>
        <Typography.Title
          level={5}
          style={{ color: 'white', textAlign: 'center' }}
        >
          Copyright © 2021
          <Link to='/'>Cryptoverse Inc.</Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to='/'>Home</Link>
          <Link to='/exchanges'>Exchanges</Link>
          <Link to='/news'>News</Link>
        </Space>
      </div>
    </div>
  );
};

export default Home;
