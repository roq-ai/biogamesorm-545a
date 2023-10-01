interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Inventory Manager', 'Sales Manager', 'Customer'],
  tenantName: 'Company',
  applicationName: 'biogamesorm',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: ['Manage own user information', 'Place orders', 'View available inventory', 'View offers'],
  ownerAbilities: ['Manage company information', 'Manage inventory', 'Manage orders', 'Manage dashboard'],
  getQuoteUrl: 'https://app.roq.ai/proposal/524c928b-813d-4645-895e-21615c8024c5',
};
