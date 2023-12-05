export default async function FetchBusinesses(uid:string |undefined, stateFunction:any){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}business/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `${uid}`, 
        }
      }) .then(response => response.json() )
      .then(data => stateFunction(data.success));   
      
      }
