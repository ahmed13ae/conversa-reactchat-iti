import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import bg1 from "../../src/assets/bg1.png";

const Register = () => {
  const { register } = useAuthServiceContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "", // Add email field
      image: null, // Add image field
    },
    validate: (values) => {
      const errors = {} as any;
      if (!values.username) {
        errors.username = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      const { username, password, email, image } = values;
      const status = await register(username, password, email, image);
      if (status === 409) {
        formik.setErrors({
          username: "Invalid username",
        });
      } else if (status === 400) {
        console.log("Unauthorised");
        formik.setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      } else {
        navigate("/login");
      }
    },
  });

  return (
    <div className="register position-relative d-flex">
      <style>
        {`
              body {
                overflow: hidden;
              }
            `}
      </style>
      <img
        style={{ objectFit: "cover", height: "150vh", width: "100%" }}
        src={bg1}
        alt=""
      />
      <div
        className="register_form position-absolute top-0 container-fluid my-1"
        style={{
          height: "100%",
          left: "33%",
          width: "33%",
          backgroundColor: "#313338",
        }}
      >
        <div className="input-data my-3">
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h1 className="d-flex justify-content-center text-white">
                Create an account
              </h1>

              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1, marginY: "50px" }}
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
                    style: {
                      backgroundColor: "#1E1F22",
                      borderRadius: "10px",
                      color: "white",
                    },
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
                    style: {
                      backgroundColor: "#1E1F22",
                      borderRadius: "10px",
                      color: "white",
                    },
                  }}
                ></TextField>
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={!!formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                  InputProps={{
                    style: {
                      backgroundColor: "#1E1F22",
                      borderRadius: "10px",
                      color: "white",
                    },
                  }}

                />
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="image"
                  name="image"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "image",
                      event.currentTarget.files?.[0]
                    );
                  }}
                />
                <label htmlFor="image">
                  <Button className="btn btn-outline-primary" variant="outlined" component="span" sx={{ mt: 2 }}>
                    Upload Profile Picture
                  </Button>
                </label>

                <Button
                  variant="contained"
                  disableElevation
                  type="submit"
                  sx={{ mt: 1, mb: 2, width: "100%" }}
                >
                  Next
                </Button>
                <div className="my-2">
                  <span>
                    <Link to="/login">Already have an account? </Link>
                  </span>
                </div>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
};
export default Register;
