import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '../../features/authSlice.js'; // Import the logout action from your authSlice

const { Header } = Layout;

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser); // Access loggedInUser from authSlice

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '0 16px' }}>
      <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src="https://your-logo-url.com/logo.png" alt="Logo" style={{ marginRight: 8 }} /> {/* Replace with your logo URL */}
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Your App Name</span>
      </div>
      {loggedInUser && (
        <Dropdown overlay={menu} placement="bottomRight">
          <Space>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <span>{loggedInUser.username}</span>
          </Space>
        </Dropdown>
      )}
    </Header>
  );
};

export default HeaderComponent;
