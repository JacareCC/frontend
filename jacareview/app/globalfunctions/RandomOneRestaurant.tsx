export default function RandomOneRestaurant(array:any){
    if(!Array.isArray(array) || array.length === 0) {
        return;
    }
    const length = array.length;
    const randomIndex = Math.floor(Math.random() * length);

    return array[randomIndex];

}