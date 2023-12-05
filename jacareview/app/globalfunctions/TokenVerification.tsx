export default async function VerifyUser(uid:string |undefined, stateFunction:any){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login/`, {
        method: 'GET',
        headers: {
          'Authorization': `${uid}`, 
        }
      }) .then(response => response.status )
      .then(status => stateFunction(status));   
      
      }

