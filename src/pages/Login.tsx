import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import bg1 from "../../src/assets/bg1.png";

const Login = () => {
  const { login } = useAuthServiceContext();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      0;
      const errors: Partial<typeof values> = {};
      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { username, password } = values;
      const status = await login(username, password);
      if (status === 401) {
        console.log("Unauthorised");
        formik.setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      } else {
        navigate("/home");
      }
    },
  });
  return (
    <>
      <div className="img position-relative d-flex justify-content-center align-items-center">
        <img
          style={{ objectFit: "cover", height: "100vh", width: "100%" }}
          src={bg1}
          alt=""
        />
        <div
          className="login_form position-absolute d-flex flex-column justify-content-center bg-dark p-3"
          style={{ width: "43%", borderRadius: "30px" }}
        >
          <h1
            className="d-flex justify-content-center"
            style={{
              color: "#F2F3F5",
              fontSize: "24px",
              fontWeight: "600",
              lineHeight: "30px",
            }}
          >
            Welcome back!
          </h1>
          <span
            className="d-flex justify-content-center"
            style={{ color: "#B5BAC1", lineHeight: "20px", fontWeight: "400" }}
          >
            we're so excited to see you again!
          </span>

          <Container component="main" maxWidth="xs">
            <Box>
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  autoFocus
                  fullWidth
                  id="username"
                  name="username"
                  label="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={!!formik.touched.username && !!formik.errors.username}
                  helperText={formik.touched.username && formik.errors.username}
                  InputProps={{
                    style: { backgroundColor: "#1E1F22", borderRadius:'10px',color:'white' },
                  }}
                ></TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  label="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={!!formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    style: { backgroundColor: "#1E1F22", borderRadius:'10px',color:'white' },
                  }}
                ></TextField>
                <Button
                  variant="contained"
                  disableElevation
                  type="submit"
                  sx={{ mt: 1, mb: 2, width: "100%" }}
                >
                  Next
                </Button>
              </Box>
              <span style={{ color: "#fff" }}>
                Need an account?{" "}
                <Link style={{ textDecoration: "none" }} to="/register">
                  Register
                </Link>
              </span>
            </Box>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Login;
