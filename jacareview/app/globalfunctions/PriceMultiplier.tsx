

export default function priceMultiplier(priceLevel:string){
    let multiplier = null
    const priceLevels = [
        'PRICE_LEVEL_INEXPENSIVE',
        'PRICE_LEVEL_MODERATE',
        'PRICE_LEVEL_EXPENSIVE',
        'PRICE_LEVEL_VERY_EXPENSIVE',
      ];

    for(let i =0; i< priceLevels.length; i++){
        if(priceLevels[i]=== priceLevel){
            multiplier = i+ 1
        }
    }
    
    return multiplier;
}