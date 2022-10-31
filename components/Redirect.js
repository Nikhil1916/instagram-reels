import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
const Redirect = () => {
  const router = useRouter();
  router.push("/login");
  console.log("Redirect for not login");
}
export default Redirect;