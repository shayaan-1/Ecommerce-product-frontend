import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Avatar, Modal } from 'antd';
import { deleteProduct } from '../../features/productsSlice.js'; 
import { useNavigate } from 'react-router';
import CustomButton from '../Button/index.jsx';

const { confirm } = Modal;

const ViewProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        // Optionally handle cancellation
      },
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct({ id }));
  };

  const handleEdit = (id) => {
    navigate(`/manage-products/${id}`);
  };

  const handleAddProduct = () => {
    navigate('/manage-products/new'); 
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Avatar src={text} />,
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <CustomButton
            type="default"
            iconType="edit"
            onClick={() => handleEdit(record.id)}
            style={{ backgroundColor: '#1890ff' }} // Custom color for Edit
          >
            Edit Product
          </CustomButton>

          <CustomButton
            type="danger"
            iconType="delete"
            onClick={() => showDeleteConfirm(record.id)} // Use the confirmation popup
            style={{ backgroundColor: '#ff4d4f' }} // Custom color for Delete
          >
            Delete Product
          </CustomButton>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={products} rowKey="id" />
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <CustomButton
          type="primary"
          iconType="add"
          onClick={handleAddProduct}
          style={{ backgroundColor: '#52c41a' }} // Custom color for Add
        >
          Add Product
        </CustomButton>
      </div>
    </>
  );
};

export default ViewProducts;
