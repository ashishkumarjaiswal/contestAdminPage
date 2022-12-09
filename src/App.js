import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/js/bootstrap.bundle";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import AddNewContest from "./Components/AddNewContest";
import axios from "axios";
import NotFound from "./Components/NotFound/NotFound";
import Login from "./Components/Login/Login";
import AllContests from "./Components/AllContests/AllContests";
import Update from "./Components/Update/Update";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const contest = JSON.parse(localStorage.getItem("contest"));

  const fetchAdmin = async () => {
    try {
      await axios.post(
        "https://contest-backend-1pnqlunz0-ashishkumarjaiswal.vercel.app/admin/loadadmin",
        {
          contest,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsAuthenticated(true);
    } catch (error) {
      alert.error(error.response.data.msg);
      console.log(error);
    }
  };

  useEffect(
    () => {
      if (contest) {
        fetchAdmin();
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <>
      {isAuthenticated ? <NavBar /> : null}
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={isAuthenticated ? null : <Login />} />
        <Route
          path="/allcontests"
          element={isAuthenticated ? <AllContests /> : <Login />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <AddNewContest /> : <Login />}
        />
        <Route
          path="/update/:id"
          element={isAuthenticated ? <Update /> : <Login />}
        />
      </Routes>
    </>
  );
};

export default App;
