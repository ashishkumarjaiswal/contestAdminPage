import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import DateTimePicker from "react-datetime-picker";

const AddNewContest = () => {
  const alert = useAlert();

  const [data, setData] = useState({
    name: "",
    platform: "",
    link: "",
    startingDate: new Date(),
    endingDate: new Date(),
  });

  const [loading, setLoading] = useState(false);

  const contest = JSON.parse(localStorage.getItem("contest"));

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const fetchApi = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://contest-backend-1pnqlunz0-ashishkumarjaiswal.vercel.app/admin/addcontest",
        {
          data,
          contest,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      alert.success(response.data.msg);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert.error(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="m-5">
        <form onSubmit={fetchApi}>
          <div className="d-flex">
            <div className="input-group mb-3">
              <select
                onChange={(e) =>
                  setData({
                    ...data,
                    platform: e.target.value,
                  })
                }
                className="form-select"
              >
                <option value={""}>Choose...</option>
                <option value="LeetCode">LeetCode</option>
                <option value="CodeChef">CodeChef</option>
                <option value="CodeForces">CodeForces</option>
                <option value="GeeksForGeeks">GeeksForGeeks</option>
                <option value="Coding Ninja">Coding Ninja</option>
              </select>
            </div>
            <div className="mb-3 mx-3">
              <input
                type="text"
                className="form-control"
                placeholder="Custom Platform"
                required
                name="platform"
                value={data.platform}
                onChange={handleOnChange}
              />
            </div>
          </div>
          {/* <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Plateform Name"
              value={data.platform}
              onChange={handleOnChange}
              name="platform"
              required
            />
          </div> */}
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Contest Name"
              required
              name="name"
              value={data.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Contest Link"
              name="link"
              value={data.link}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="d-flex justify-content-center">
            <div className="text-center m-5">
              <h3>Starting Date</h3>
              <DateTimePicker
                value={data.startingDate}
                onChange={(e) =>
                  setData({ ...data, startingDate: new Date(e) })
                }
                format={"yyyy-MM-dd HH:mm:ss"}
              />
            </div>
            <div className="text-center m-5">
              <h3>Ending Date</h3>
              <DateTimePicker
                value={data.startingDate}
                onChange={(e) => setData({ ...data, endingDate: new Date(e) })}
                format={"yyyy-MM-dd HH:mm:ss"}
              />
            </div>
          </div>

          <div className="text-center">
            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewContest;
