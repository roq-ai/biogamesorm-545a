const mapping: Record<string, string> = {
  companies: 'company',
  dashboards: 'dashboard',
  inventories: 'inventory',
  offers: 'offer',
  orders: 'order',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
