import React from 'react';
import { Form, Input, Button, Select, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from '../config/axios';

const { Option } = Select;
const { Title } = Typography;

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

  const onRoleChange = (value) => {
    switch (value) {
      case 1:
        form.setFieldsValue({ note: 'Admin privileges granted!' });
        break;
      case 2:
        form.setFieldsValue({ note: 'Staff privileges granted!' });
        break;
      case 3:
        form.setFieldsValue({ note: 'User privileges granted!' });
        break;
      default:
    }
  };

  return (
    <div style={styles.container}>
      <Title level={2} style={styles.title}>Register</Title>
      <Form
        form={form}
        name="register"
        className="register-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={styles.form}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input 
            prefix={<MailOutlined style={styles.icon} />} 
            placeholder="Email" 
            size="large" 
            style={styles.input}
          />
        </Form.Item>
        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Please select your role!' }]}
        >
          <Select
            placeholder="Please select your role"
            onChange={onRoleChange}
            allowClear
            size="large"
            style={styles.select}
          >
            <Option value={1}>Admin</Option>
            <Option value={2}>Staff</Option>
            <Option value={3}>User</Option>
          </Select>
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
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your Password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined style={styles.icon} />}
            type="password"
            placeholder="Confirm Password"
            size="large"
            style={styles.input}
          />
        </Form.Item>
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="register-form-button"
            style={styles.button}
            size="large"
            block
          >
            Register
          </Button>
          <div style={styles.loginLink}>
            Or <a href="/login">sign in now!</a>
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
  select: {
    width: '100%',
    borderRadius: '8px',
  },
  button: {
    borderRadius: '8px',
    backgroundColor: '#52c41a',
    borderColor: '#52c41a',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: '20px',
  },
};

export default Register;
