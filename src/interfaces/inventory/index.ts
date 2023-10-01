import { OfferInterface } from 'interfaces/offer';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  product_name: string;
  quantity: number;
  purchase_price?: number;
  sale_price?: number;
  import_date?: any;
  export_date?: any;
  created_at?: any;
  updated_at?: any;
  offer?: OfferInterface[];

  _count?: {
    offer?: number;
  };
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_name?: string;
}
