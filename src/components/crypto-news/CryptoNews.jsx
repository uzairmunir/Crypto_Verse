import { Avatar, Card, Col, Row, Typography, Select } from 'antd';
import React, { useState } from 'react';
import { useGetCryptoNewsQuery } from '../../redux/feature/CryptoNewApi';
import { useGetCryptosQuery } from '../../redux/feature/CryptoApi';
import moment from 'moment';
import Loader from '../../loader/Loader';

const CryptoNews = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [cryptoNews, setCryptoNews] = useState('Cryptocurrency');
  const { data, isFetching } = useGetCryptoNewsQuery(cryptoNews, 100);
  const { data: cryptos } = useGetCryptosQuery(10);
  if (isFetching) {
    return <Loader />;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <Row gutter={[32, 32]}>
        {!simplified && (
          <Col span={24}>
            <Select
              style={{ width: '100%' }}
              showSearch
              className='select-news'
              placeholder='Select a Crypto'
              optionFilterProp='children'
              onChange={(value) => setCryptoNews(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option value='Cryptocurency'>
                Cryptocurrency
              </Select.Option>
              {cryptos?.data?.coins?.map((currency, index) => (
                <Select.Option value={currency.name} key={index}>
                  {currency.name}
                </Select.Option>
              ))}
            </Select>
          </Col>
        )}
        {data?.value?.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div>
                  <Typography.Title level={4}>{news.name}</Typography.Title>
                  <img src={news?.image?.thumbnail?.contentUrl} alt='' />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div>
                  <div>
                    <Avatar
                      style={{
                        width: '3rem',
                        height: '3rem',
                        padding: '0.5rem',
                      }}
                      src={news.provider[0]?.image?.thumbnail?.contentUrl}
                      alt=''
                    />
                    <Typography.Text>{news.provider[0]?.name}</Typography.Text>
                  </div>
                  <Typography.Text>
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </Typography.Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CryptoNews;
