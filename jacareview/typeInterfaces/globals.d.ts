export interface Coordinates { 
    latitude: number; 
    longitude: number 
}

export interface GetHistoryObject {    
date_visited?: Date |undefined;
id?: number |undefined;
name?: string |undefined;
restaurant_id_id?: number |undefined;
saved: boolean; 
user_id_id?:number |undefined;
}

export interface OpeningHoursPeriod {
    close: {
      day: number;
      hour: number;
      minute: number;
      truncated: boolean;
      date: any; 
    };
    open: {
      day: number;
      hour: number;
      minute: number;
      truncated: boolean;
      date: any; 
    };
  }
  
  interface ResultItem {
    currentOpeningHours: {
      openNow: boolean;
      periods: OpeningHoursPeriod[];
      weekdayDescriptions: string[];
    };
    displayName: {
      text: string;
      languageCode: string;
    };
    id: number;
    location: {
      latitude: number;
      longitude: number;
    };
    place_id: string;
    priceLevel: string;
    tiers: any[];
  }
  
  export interface ApiResponseForSlides {
    result: ResultItem[];
  }
  