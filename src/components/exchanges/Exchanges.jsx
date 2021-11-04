import { Avatar, Col, Collapse, Row, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React from 'react';
import Loader from '../../loader/Loader';
import { useGetExchangesQuery } from '../../redux/feature/CryptoApi';

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  if (isFetching) {
    return <Loader />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem' }}>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {data?.data?.exchanges?.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Collapse.Panel
                key={exchange.id}
                header={
                  <Row>
                    <Col span={6}>
                      <Typography.Text>{exchange?.rank}</Typography.Text>
                      <Avatar
                        style={{
                          width: '2.5rem',
                          padding: '0.5rem',
                          height: '2.5rem',
                        }}
                        src={exchange?.iconUrl}
                      />
                      <Typography.Text>{exchange.name}</Typography.Text>
                    </Col>
                    <Col span={6}>{millify(exchange?.volume)}</Col>
                    <Col span={6}>{millify(exchange?.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange?.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange?.description || '')}
              </Collapse.Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Exchanges;
