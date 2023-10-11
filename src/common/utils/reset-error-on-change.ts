import { FormInstance } from 'antd';

export const resetErrorOnChange = (
  form: FormInstance,
  values: Record<string, unknown>
) => {
  const fields = Object.keys(values);

  for (const field of fields) {
    const error = form.getFieldError(field);

    if (!error.length) {
      return;
    }
    form.setFields([
      {
        name: field,
        errors: [],
      },
    ]);
  }
};
