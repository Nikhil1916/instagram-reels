import { useRouter } from "next/router";
const Redirect = () => {
  const router = useRouter();
  router.push("/login");
  console.log("Redirect for not login");
}
export default Redirect;