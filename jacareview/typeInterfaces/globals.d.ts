export default interface Coordinates { 
    latitude: number; 
    longitude: number 
}

export default interface GetHistoryObject {    
date_visited: Date;
id: number;
name: string;
restaurant_id_id: number;
saved: boolean; 
user_id_id:number
}

// export default interface ResultSlides {
    
// currentOpeningHours
// : 
// {openNow: true, periods: Array(1), weekdayDescriptions: Array(7)}
// displayName
// : 
// {text: 'Sukiya Ikeda shop', languageCode: 'en'}
// id
// : 
// 12
// location
// : 
// {latitude: 35.2440567, longitude: 139.68901209999999}
// place_id
// : 
// "ChIJo1NKpCk-GGARhnRgxE8Vi3c"
// priceLevel
// : 
// "PRICE_LEVEL_INEXPENSIVE"
// tiers
// : 
// []
// }