// export default async function VerifyUser(uid:string |undefined, stateFunction:any){
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login/`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `${uid}`, 
//         }
//       }) .then(response => response.status )
//       .then(status => stateFunction(status));   
      
//       }

// ../../../app/globalfunctions/TokenVerification.tsx

// ../../../app/globalfunctions/TokenVerification.tsx

import { Dispatch, SetStateAction } from 'react';

export default async function VerifyUser(
  uid: string,
  setStateFunction: Dispatch<SetStateAction<number | null>>
) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login/`, {
      method: 'GET',
      headers: {
        'Authorization': `${uid}`,
      },
    });

    const status = response.status;

    // Use the second element of the useState array (the update function)
    setStateFunction(status);

    // Return the status or other relevant data
    return status;
  } catch (error) {
    // Handle errors appropriately
    console.error('Error in VerifyUser:', error);
    return undefined; // Or handle errors differently based on your use case
  }
}
