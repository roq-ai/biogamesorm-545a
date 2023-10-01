import * as yup from 'yup';

export const offerValidationSchema = yup.object().shape({
  offer_date: yup.date().required(),
  expiry_date: yup.date().nullable(),
  discount_percentage: yup.number().integer().nullable(),
  description: yup.string().nullable(),
  inventory_id: yup.string().nullable().required(),
  sales_manager_id: yup.string().nullable().required(),
});
