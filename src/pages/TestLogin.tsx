import axios from "axios";
import { useState } from "react";
import { useAuthServiceContext } from "../context/AuthContext";
import useAxiosWithInterceptor from "../helpers/jwtinterceptor";
import Logout from "./template/Logout";

const TestLogin = () => {
  const { isLoggedIn, logout } = useAuthServiceContext();
  const [username, setUsername] = useState("");
  const jwtAxios = useAxiosWithInterceptor();

  const getUserDetails = async () => {
    try {
      const response = await jwtAxios.get(
        `http://127.0.0.1:8000/api/account/?user_id=1`,
        { withCredentials: true }
      );
      const userDetails = response.data;
      setUsername(userDetails.username);
    } catch (err: any) {
      return err;
    }
  };

  return (
    <>
      <div>{isLoggedIn.toString()}</div>
      <div>
        <Logout/>
        <button onClick={logout}>Logout</button>
        <button onClick={getUserDetails}>Get User Details</button>
      </div>
      <div>Username: {username}</div>
    </>
  );
};

export default TestLogin;
