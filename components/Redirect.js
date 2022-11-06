import { useRouter } from "next/router";
const Redirect = () => {
  const router = useRouter();
  router.push("/login");
}
export default Redirect;