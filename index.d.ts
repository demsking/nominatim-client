export type Options = {
  /**
   * Application name
   */
  useragent: string;

  /**
   * Referer link
   */
  referer: string;
};

export type SearchOptions = {
  q: string;
  addressdetails?: 1;
};

export type SearchResultItem = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  // Defined when SearchOptions.addressdetails is provided
  address?: {
    road: string;
    suburb: string;
    city_district: string;
    city: string;
    county: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
}

export type ReverseOptions = {
  lat: number;
  lon: number;
};

export type ReverseResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    amenity: string;
    road: string;
    suburb: string;
    city_district: string;
    city: string;
    county: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
}

export type NominatimClient = {
  search: (params: SearchOptions) => Promise<SearchResultItem[]>;
  reverse: (params: ReverseOptions) => Promise<ReverseResult>;
};

export function createClient(options: Options): NominatimClient;
