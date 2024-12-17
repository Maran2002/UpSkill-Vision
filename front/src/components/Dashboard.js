import React, { useState, useEffect } from "react";
import logo from "../assests/256 icon.png";
import { useNavigate } from "react-router-dom";
import HradminDashboard from "./dashboardComponents/HradminDashboard";
import ManagerDashboard from "./dashboardComponents/ManagerDashboard";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const handleLogout = () => {
    navigate("/");
    sessionStorage.removeItem("token");
  };
  const [dashboardData, setDashboardData] = useState({});
  const [authority, setAuthority] = useState("");

  useEffect(() => {
    const verifyAuthentication = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:5000/api/protected", {
          method: "GET",
          credentials: "include", // Include cookies in the request
          headers: {
            "Content-Type": "application/json",
            Authorization: token, // Send token in the Authorization header
          },
        });

        const data = await response.json();
        // console.dir(data.content);
        setDashboardData(data.content);
        setName(data.name);
        if (response.ok) {
          if (data.authority === "hradmin") {
            setAuthority("hradmin");
          } else if (data.authority === "manager") {
            setAuthority("manager");
          } else if (data.authority === "participant") {
            setAuthority("participant");
          }
        } else if (data.underReview) {
          setAuthority("");
          navigate("/");
          Swal.fire({
            icon: "info",
            title: "Account Under Review",
            text: "Authorized Person have to activate your account",
          });
        } else {
          setAuthority("");
          navigate("/");
        }
      } catch (error) {
        setAuthority("");
        navigate("/");
      }
    };

    verifyAuthentication();
    // eslint-disable-next-line
  }, []);

  if (authority === "hradmin") {
    return (
      <HradminDashboard
        handleLogout={handleLogout}
        logo={logo}
        name={name}
        dashboardData={dashboardData}
      />
    );
  } else if (authority === "manager") {
    return (
      <ManagerDashboard
        handleLogout={handleLogout}
        logo={logo}
        name={name}
        dashboardData={dashboardData}
      />
    );
  } else if (authority === "participant") {
    return <>Participant Dashboard</>;
  }
};

export default Dashboard;
