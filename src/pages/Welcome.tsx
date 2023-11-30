import React from "react";
import { Link } from "react-router-dom";
import { Button, styled } from "@mui/material";

import logo1 from "../../src/assets/Logo.png";
import chat from "../../src/assets/ys1l0kxg.png";
import welcome from "../../src/assets/bg_welcome.png";

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = () => {
  const LightButton = styled(Button)({
    color: "inherit", // or "default"
    backgroundColor: "white", // Set the desired background color
    // Add any other styles you need
  });

  const DarkLargeButton = styled(Button)({
    backgroundColor: "#343a40", // Set the desired dark background color
    color: "white", // Set the desired text color
    fontSize: "1.25rem", // Set the desired font size for large button
    // Add any other styles you need
  });

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          style={{ height: "90vh", objectFit: "fill", position: "relative" }}
          src={welcome}
          alt=""
          className="w-100"
        />

        <nav
          style={{
            position: "absolute",
            display: "flex",
            top: "0",
            justifyContent: "start",
            padding: "15px",
            width: "100%",
          }}
        >
<Link style={{ color: "#fff" }} to="home" className="navbar-brand">
            {" "}
            <img
              style={{ width: "300px", height: "100px" }}
              src={logo1}
              alt=""
            />{" "}
          </Link>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginLeft: "auto",
              marginRight: "5px",
            }}
          >
            <Link to="/login">
              <div>
                <LightButton className="btn btn-outline-primary">Login</LightButton>
              </div>
            </Link>
          </div>
        </nav>

        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
          }}
          className="position-absolute d-flex flex-column"
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "56px",
              lineHeight: "53.2px",
              fontWeight: "800",
              fontFamily: "ABC Ginto Nord,Noto Sans",
              color:'white'
            }}
            className="h1-3dtzWh"
          >
            IMAGIN A PLACE...
          </h1>
          <p
            style={{
              fontSize: "20px",
              lineHeight: "32.5px",
              fontWeight: "400",
              fontFamily: "gg.sans",
              color:'white'
            }}
          >
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. <br /> Where just you and a handful of
            friends can spend time together. A place that makes it easy <br />{" "}
            to talk every day and hang out more often.
          </p>
          <div style={{ textAlign: "center" }} className="text-center">
            <Link to="/register">
              <div>
                <DarkLargeButton>Open Conversa in Your Browser</DarkLargeButton>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div style={{ margin: "0 0 0 0" }} className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <div
              style={{ display: "grid", textAlign: "center", margin: "5rem 0" }}
              className="grid text-center my-5"
            >
              <img src={chat} alt="" />
            </div>
          </div>

          <div className="col-md-6">
            <div
              style={{ display: "grid", textAlign: "center", margin: "5rem 0" }}
              className="grid text-center my-5"
            >
              <h2
                style={{
                  color: "#23272A",
                  fontSize: "48px",
                  lineHeight: "57.6px",
                  fontWeight: "800",
                }}
              >
                Create an invite-only place where you belong
              </h2>
              <p
                style={{
                  color: "#23272A",
                  fontSize: "20px",
                  lineHeight: "32.5px",
                  margin: "24px 0px 0px",
                  fontWeight: "400",
                  width: "50%",
                  marginLeft: "350px",
                }}
              >
                Conversa servers are organized into topic-based channels where
                you can collaborate, share, and just talk about your day without
                clogging up a group chat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
