import queryString from 'query-string';
import { OfferInterface, OfferGetQueryInterface } from 'interfaces/offer';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getOffers = async (query?: OfferGetQueryInterface): Promise<PaginatedInterface<OfferInterface>> => {
  return fetcher('/api/offers', {}, query);
};

export const createOffer = async (offer: OfferInterface) => {
  return fetcher('/api/offers', { method: 'POST', body: JSON.stringify(offer) });
};

export const updateOfferById = async (id: string, offer: OfferInterface) => {
  return fetcher(`/api/offers/${id}`, { method: 'PUT', body: JSON.stringify(offer) });
};

export const getOfferById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/offers/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteOfferById = async (id: string) => {
  return fetcher(`/api/offers/${id}`, { method: 'DELETE' });
};
