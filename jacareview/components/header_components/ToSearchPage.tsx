import { useRouter } from "next/navigation";

export default function ToUserPage(){

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