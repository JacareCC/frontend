export default function RandomOneRestaurant(array:any){
    const length = array.length;
    const randomIndex = Math.floor(Math.random() * length);

    return array[randomIndex];

}