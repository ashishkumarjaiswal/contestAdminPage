import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AllContests.css";

const AllContests = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  

  const allContest = async () => {
    const response = await axios.get(
      "https://contest-backend-1pnqlunz0-ashishkumarjaiswal.vercel.app/getcontestdata"
    );

    setData(response.data.data);
  };

  const handleOnDelete = async (id) => {
    let confirmAction = window.confirm("Are you sure to execute this action?");

    if (confirmAction) {
      await axios.delete(
        `https://contest-backend-1pnqlunz0-ashishkumarjaiswal.vercel.app/admin/deletecontest/${id}`
      );

      window.location.reload();
    }
  };
  const handleOnUpdate = async (id) => {
    navigate(`/update/${id}`);
  };

  const handleOnExpired = async () => {
    await axios.delete(
      "https://contest-backend-1pnqlunz0-ashishkumarjaiswal.vercel.app/admin/deleteexpired"
    );

    window.location.reload();
  };

  useEffect(() => {
    allContest();
  }, []);
  return (
    <>
      <div className="allContests">
        <table className="allContestTable">
          <thead>
            <tr className="allContestTableRow">
              <th>S. No.</th>
              <th>Platform</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.length > 0 &&
              data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.platform}</td>
                  <td>{item.name}</td>
                  <td>
                    <button
                      className="mx-2"
                      onClick={() => handleOnUpdate(item._id)}
                    >
                      Update
                    </button>
                    <button onClick={() => handleOnDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="my-5 text-center">
          <button onClick={handleOnExpired} className="btn btn-success">
            Delete Expired Contests
          </button>
        </div>
      </div>
    </>
  );
};

export default AllContests;
