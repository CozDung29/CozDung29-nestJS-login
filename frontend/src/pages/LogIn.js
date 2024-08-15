import React from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LogIn = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      const response = await axios.post('/auth/login', values);
      message.success(response.data.message);
      navigate('/logout'); // Redirect to the logout page after successful login
    } catch (error) {
      message.error('Login failed, please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <Title level={2} style={styles.title}>Log In</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={styles.form}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input 
            prefix={<UserOutlined style={styles.icon} />} 
            placeholder="Email" 
            size="large" 
            style={styles.input}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined style={styles.icon} />}
            type="password"
            placeholder="Password"
            size="large"
            style={styles.input}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="login-form-button" 
            style={styles.button}
            size="large"
            block
          >
            Log in
          </Button>
          <div style={styles.registerLink}>
            Or <a href="/register">register now!</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 400,
    margin: '0 auto',
    padding: '60px 20px',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '40px',
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  icon: {
    color: 'rgba(0,0,0,.25)',
  },
  input: {
    borderRadius: '8px',
  },
  button: {
    borderRadius: '8px',
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    fontWeight: 'bold',
  },
  registerLink: {
    marginTop: '20px',
  },
};

export default LogIn;
