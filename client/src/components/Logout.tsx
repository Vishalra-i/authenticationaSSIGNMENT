'use client' ;
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import axios from "axios"


const LogoutButton = () => {
    const router = useRouter();
    const signOut = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/logout`)
            router.push("/signin")
        } catch (error:any) {
            console.log("Error in logout::" , error)
            router.push("/signin")
        }
    }

  return (
    <Button
      onClick={signOut}
      size="sm"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;