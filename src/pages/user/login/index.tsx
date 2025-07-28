import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  LoginFormPage,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history } from '@umijs/max';
import { message } from 'antd';
import { login } from '@/services/ant-design-pro/api';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const handleSubmit = async (values: API.LoginParams) => {
    console.log(values);
    try {
      // 登录
      const msg = await login({ ...values });
      if (msg.status === 'ok') {
        message.success('Login successful!');
        history.push('/');
        return;
      }
    } catch (error) {
      message.error('Login failed, please try again!');
    }
  };

  return (
    <>
      <Helmet>
        <title>{`Login - ${Settings.title}`}</title>
      </Helmet>
      <div className="h-[100vh] flex flex-col justify-center">
        <LoginFormPage
          // backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
          // logo="https://thegbpc.com/images/logo.png"
          backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          title="GBPC"
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
          submitter={{
            searchConfig: {
              submitText: 'Login',
            },
          }}
        >
          <>
            <div className="mt-8"></div>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={'please enter username'}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入用户名!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={'Please enter the password'}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        </LoginFormPage>
      </div>
    </>
  );
};

export default Login;
