"use client"
import { useState } from "react"

export default function SaveRestaurantButton(){
const [saved, setSaved] = useState <boolean>(false);

//helper
async function saveTheRestaurant(){
    //implement post request to set save state
    setSaved((prev:boolean) => !prev);
}
 async function undoTheSave() {
    //implement post to unsave it
    setSaved((prev:boolean) => !prev);
 }

 return (
    <>
    {!saved ? <button onClick={saveTheRestaurant}>Save</button>:
    <button onClick={undoTheSave}>Remove Save</button>}
    </>
 )
}