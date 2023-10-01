import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  order_date: yup.date().required(),
  delivery_date: yup.date().nullable(),
  total_amount: yup.number().integer().nullable(),
  order_status: yup.string().nullable(),
  customer_id: yup.string().nullable().required(),
  sales_manager_id: yup.string().nullable().required(),
});
