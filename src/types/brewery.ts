export interface BreweryMetadata {
  total: number;
  by_type: {
    micro: number;
  };
}

export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  city: string;
  state: string;
  website_url?: string;
}
