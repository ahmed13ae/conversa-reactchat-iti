import Home from "./pages/Home";
import Server from "./pages/Server";
import Explore from "./pages/Explore";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ToggleColorMode from "./components/ToggleColorMode";
import Login from "./pages/Login";
import { AuthServiceProvider } from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";
import Register from "./pages/Register";
import { MembershipProvider } from "./context/MemberContext";
import MembershipCheck from "./components/Membership/MembershipCheck";
// import AddServers from "./pages/addServers";
import Welcome from "./pages/Welcome";

const App = () => {
  return (
    <BrowserRouter>
      <AuthServiceProvider>
        <ToggleColorMode>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/server/:serverId/:channelId?"
              element={
                <ProtectedRoute>
                  <MembershipProvider>
                    <MembershipCheck>
                      <Server />
                    </MembershipCheck>
                  </MembershipProvider>
                </ProtectedRoute>
              }
            />
            <Route path="/explore/:categoryId" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Welcome />} />

            {/* <Route path="/add-servers" Component={AddServers} /> */}

            <Route
              path="/testlogin"
              element={
                <ProtectedRoute>
                  <TestLogin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ToggleColorMode>
      </AuthServiceProvider>
    </BrowserRouter>
  );
};

export default App;
