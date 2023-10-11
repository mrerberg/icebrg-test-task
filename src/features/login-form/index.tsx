import { useState } from "react";

import { Alert, Button, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { resetErrorOnChange } from "../../common/utils/reset-error-on-change";

import { errorsMap } from "./errors";
import { emailValidation, passwordValidation } from "./validation";

import styles from "./index.module.css";
import { LoginParams } from "../../api/login";
import { useLogin } from "./hooks/use-login";
import { useAuth } from "../../context/auth/use-auth";

// NOTE: Добавил значения из env просто для удобства
const INITIAL_VALUES = {
  email: import.meta.env.VITE_LOGIN,
  password: import.meta.env.VITE_PASSWORD,
};

export const LoginForm: React.FC = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [form] = Form.useForm();
  const auth = useAuth();

  const loginMutation = useLogin({
    onError(error) {
      // NOTE: не очень понимаю, как воспроизвести кейс с 401
      // Пробовал ввести правильный email, но не верный пароль, все равно получил 404
      // Я бы на беке возвращал уникальный код ошибки, на который можно положиться
      // и тогда бы маппил ошибки
      if (error.response.status === 404) {
        const formError = errorsMap[error.code];

        form.setFields([formError]);
      } else {
        setAlertOpen(true);
      }
    },
    onSuccess(data) {
      auth.setUser(data);
    },
  });

  const handleSubmit = (values: LoginParams) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Form
      className={styles.form}
      form={form}
      name="sign-in"
      autoComplete="off"
      initialValues={INITIAL_VALUES}
      layout="vertical"
      validateTrigger="onSubmit"
      onValuesChange={(values) => resetErrorOnChange(form, values)}
      onFinish={handleSubmit}
    >
      <Typography.Title>Вход</Typography.Title>

      <Form.Item
        className={styles.formItem}
        label="Email"
        name="email"
        rules={emailValidation}
      >
        <Input
          type="email"
          size="large"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item
        className={styles.formItem}
        label="Пароль"
        name="password"
        rules={passwordValidation}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>

      <Form.Item>
        {alertOpen && (
          <Alert
            className={styles.formError}
            message="Ошибка"
            description="Пожалуйста, попробуйте ещё раз позже."
            type="error"
            showIcon={true}
            closable={true}
            onClose={() => setAlertOpen(false)}
          />
        )}
        <Button
          className={styles.submitButton}
          loading={loginMutation.isLoading}
          type="primary"
          size="large"
          htmlType="submit"
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
