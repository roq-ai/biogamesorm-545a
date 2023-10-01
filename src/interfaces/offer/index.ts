import { InventoryInterface } from 'interfaces/inventory';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OfferInterface {
  id?: string;
  offer_date: any;
  expiry_date?: any;
  discount_percentage?: number;
  description?: string;
  inventory_id: string;
  sales_manager_id: string;
  created_at?: any;
  updated_at?: any;

  inventory?: InventoryInterface;
  user?: UserInterface;
  _count?: {};
}

export interface OfferGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  inventory_id?: string;
  sales_manager_id?: string;
}
