import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface DashboardInterface {
  id?: string;
  total_sales?: number;
  total_orders?: number;
  total_offers?: number;
  total_inventory?: number;
  total_customers?: number;
  business_owner_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface DashboardGetQueryInterface extends GetQueryInterface {
  id?: string;
  business_owner_id?: string;
}
