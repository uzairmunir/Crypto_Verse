import { Menu } from 'antd';
import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
  MoneyCollectFilled,
} from '@ant-design/icons';
import React, { useState } from 'react';
import cryptocurrency from '../../images/cryptocurrency.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const onToggle = () => {
    setToggle(!toggle);
  };
  const closeMobileMenu = () => setToggle(false);
  return (
    <nav>
      <div className='navbar-logo'>
        <img src={cryptocurrency} alt='nav-logo' />
        <h1>CryptoVerse</h1>
      </div>
      <MenuOutlined className='toggle-btn' onClick={onToggle} />

      <Menu theme='dark' className={`${toggle ? 'toggle-menu' : 'hide-menu'}`}>
        <Menu.Item icon={<HomeOutlined />}>
          <Link to='/' onClick={closeMobileMenu}>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item icon={<FundOutlined />}>
          <Link to='/currencies' onClick={closeMobileMenu}>
            Cryptocurrencies
          </Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to='/news' onClick={closeMobileMenu}>
            News
          </Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectFilled />}>
          <Link to='/exchanges' onClick={closeMobileMenu}>
            Exchanges
          </Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default Navbar;
