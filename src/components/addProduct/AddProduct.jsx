import React from 'react';
import { Form, Input, InputNumber, DatePicker, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createProduct } from '../../features/productsSlice';
import dayjs from 'dayjs'; // Import dayjs instead of moment

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      expiryDate: values.expiryDate ? values.expiryDate.toISOString() : null,
    };
    dispatch(createProduct(formattedValues));
    navigate('/products/1');
  };

  // Function to disable past dates
  const disablePastDates = (current) => {
    return current && current.isBefore(dayjs().startOf('day'));
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
    >
      <Form.Item
        label="Product Name"
        name="name"
        rules={[{ required: true, message: 'Please input the product name!' }]}
      >
        <Input placeholder="Enter product name" />
      </Form.Item>

      <Form.Item
        label="Price (RS)"
        name="price"
        rules={[{ required: true, message: 'Please input the product price!' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          prefix="RS"
          placeholder="Enter product price"
        />
      </Form.Item>

      <Form.Item
        label="Quantity"
        name="quantity"
        rules={[{ required: true, message: 'Please input the product quantity!' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          placeholder="Enter product quantity"
        />
      </Form.Item>

      <Form.Item
        label="Expiry Date"
        name="expiryDate"
      >
        <DatePicker
          style={{ width: '100%' }}
          placeholder="Select expiry date (optional)"
          disabledDate={disablePastDates}
          format="YYYY-MM-DD" // Ensure date format is consistent
        />
      </Form.Item>

      <Form.Item
        label="Product Image URL"
        name="imageUrl"
        rules={[{ required: true, message: 'Please input the product image URL!' }]}
      >
        <Input placeholder="Enter product image URL" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Add Product
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
