import { Spin } from 'antd';
import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        margin: '0 auto',
      }}
    >
      <Spin />
    </div>
  );
};

export default Loader;
