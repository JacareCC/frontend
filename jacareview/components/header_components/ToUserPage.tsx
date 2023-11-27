import { useRouter } from "next/navigation";

export default function ToUserPage(){

    const router = useRouter();
    function routeToUser(){
        router.push("/userpage")
    }

    return (
        <>
        <div onClick={routeToUser}>User Page</div>
        </>
    )
}