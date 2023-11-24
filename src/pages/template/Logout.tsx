import { Button } from "@mui/material";
import { useAuthServiceContext } from "../../context/AuthContext";


const Logout = () => {
  const { logout } = useAuthServiceContext();

  return (
    <Button sx={{margin:'1px'}} variant="outlined"  onClick={logout}>
      Logout
    </Button>
  );
};

export default Logout;