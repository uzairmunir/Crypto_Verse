import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../../redux/feature/CryptoApi';
import './CryptoCurrencies.css';
import Loader from '../../loader/Loader';

const CryptoCurrencies = ({ simplified }) => {
  const [cryptos, setCryptos] = useState();
  const [searchText, setSearchText] = useState('');
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);

  useEffect(() => {
    setCryptos(data?.data);
    const filteredData = data?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
    setCryptos(filteredData);
  }, [data, searchText]);
  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <div className='crypto-container'>
        {!simplified && (
          <div className='input-container'>
            <Input
              placeholder='Search Cryptos'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value.toLowerCase())}
            />
          </div>
        )}

        <Row gutter={[32, 32]}>
          {cryptos?.map((data) => (
            <Col xs={24} sm={12} lg={6} key={data.id}>
              <Link to={`/${data?.id}`}>
                <Card
                  size='small'
                  title={`${data?.id}:${data?.name}`}
                  extra={<img className='crypto-img' src={data?.iconUrl} />}
                >
                  <p>Price: {millify(data?.price)}</p>
                  <p>Number of Markets: {data?.numberOfMarkets}</p>
                  <p>Market Cap: {millify(data?.marketCap)}</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default CryptoCurrencies;
