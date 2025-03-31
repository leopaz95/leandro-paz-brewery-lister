import { useQuery } from '@tanstack/react-query';
import { Brewery, BreweryMetadata } from '../types/brewery';
import { PaginatedSearchType } from '../types/pagination';
import axiosInstance from './axiosInstance';

const getMicroBreweriesMetadata = async (): Promise<BreweryMetadata> => {
  const { data } = await axiosInstance.get('/breweries/meta');
  return data;
};

const getMicroBreweries = async ({
  page = 1,
  rowsPerPage = 5,
  searchByName,
  searchByState,
  sort,
}: PaginatedSearchType): Promise<Brewery[]> => {
  const { data } = await axiosInstance.get('/breweries', {
    params: {
      by_type: 'micro',
      sort,
      page,
      per_page: rowsPerPage,
      ...(searchByName && { by_name: searchByName }),
      ...(searchByState && { by_state: searchByState }),
    },
  });
  return data;
};

export const useBreweriesMetadata = () => {
  return useQuery<BreweryMetadata>({
    queryKey: ['breweries-metadata'],
    queryFn: () => getMicroBreweriesMetadata(),
  });
};
export const useBreweries = (filter: PaginatedSearchType) => {
  return useQuery<Brewery[]>({
    queryKey: ['breweries', filter],
    queryFn: () => getMicroBreweries(filter),
  });
};
