import { useRouter } from "next/navigation";

export default function ToSearchPage(){

    const router = useRouter();
    function routeToUser(){
        router.push("/searchpage")
    }

    return (
        <>
        <div onClick={routeToUser}>Search</div>
        </>
    )
}