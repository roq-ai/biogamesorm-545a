import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  order_date: any;
  delivery_date?: any;
  total_amount?: number;
  order_status?: string;
  customer_id: string;
  sales_manager_id: string;
  created_at?: any;
  updated_at?: any;

  user_order_customer_idTouser?: UserInterface;
  user_order_sales_manager_idTouser?: UserInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  order_status?: string;
  customer_id?: string;
  sales_manager_id?: string;
}
