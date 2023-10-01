import * as yup from 'yup';

export const dashboardValidationSchema = yup.object().shape({
  total_sales: yup.number().integer().nullable(),
  total_orders: yup.number().integer().nullable(),
  total_offers: yup.number().integer().nullable(),
  total_inventory: yup.number().integer().nullable(),
  total_customers: yup.number().integer().nullable(),
  business_owner_id: yup.string().nullable().required(),
});
