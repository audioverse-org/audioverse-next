import Register from "@containers/account/register"
import { GetServerSidePropsResult } from "next";

export default Register

export async function getServerSideProps(): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {}
  }
}
