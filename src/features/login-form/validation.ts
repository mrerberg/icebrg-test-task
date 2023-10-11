import { EMAIL_PATTERN } from '../../common/constants/patterns';

export const emailValidation = [
  { required: true, message: 'Укажите почту' },
  {
    pattern: EMAIL_PATTERN,
    message: 'Не подходящий формат для электронной почты',
  },
];

export const passwordValidation = [
  { required: true, message: 'Укажите пароль' },
];
