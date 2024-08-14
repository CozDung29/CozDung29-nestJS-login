import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from '../config/axios';

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/auth/register', values);
      message.success(response.data.message); // Hiển thị thông báo thành công
    } catch (error) {
      message.error('Registration failed, please try again.'); // Hiển thị thông báo lỗi
    }
  };

  const onGenderChange = (value) => {
    switch (value) {
      case 1:
        form.setFieldsValue({ note: 'Hi, man!' });
        break;
      case 2:
        form.setFieldsValue({ note: 'Hi, lady!' });
        break;
      case 3:
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };

  return (
    <Form
      form={form}
      name="register"
      className="register-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ maxWidth: 300, margin: '0 auto', padding: '50px 0' }}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="role"
        rules={[{ required: true, message: 'Please select your gender!' }]}
      >
        <Select
          placeholder={
            <span>
              <UserOutlined style={{ marginRight: 8 }} />
              Please select your gender
            </span>
          }
          onChange={onGenderChange}
          allowClear
        >
          <Option value={1}>male</Option>
          <Option value={2}>female</Option>
          <Option value={3}>other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: 'Please confirm your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="register-form-button">
          Register
        </Button>
        Or <a href="/signin">sign in now!</a>
      </Form.Item>
    </Form>
  );
};

export default Register;
