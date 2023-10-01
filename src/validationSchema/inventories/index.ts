import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  product_name: yup.string().required(),
  quantity: yup.number().integer().required(),
  purchase_price: yup.number().integer().nullable(),
  sale_price: yup.number().integer().nullable(),
  import_date: yup.date().nullable(),
  export_date: yup.date().nullable(),
});
