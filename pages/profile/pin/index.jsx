import React, { useState } from "react";

import Layout from "layout";
// import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";

export default function History() {
  //   const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const userId = Cookies.get("userId");

  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  const handleChange = (e) => {
    setPin({ ...pin, [e.target.id]: e.target.value });
  };

  const inputFocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }
    try {
      const result = await axiosClient.patch(`/user/pin/${userId}`, {
        pin: allPin,
      });
      alert(result.data.msg);
      router.push("/home");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="all-page">
      <Layout title="Edit Phone Number">
        <div className="container mt-4 ps-4">
          <div className="w-50">
            <h5 className="fw-bold">Change PIN</h5>
            <p className="text-secondary mt-4">
              Enter your current 6 digits Fazzpay PIN below to continue to the
              next steps.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className=" d-grid justify-content-center phone-form-container"
          >
            <div className="d-flex gap-2 justify-content-center">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item}>
                  <input
                    type="text"
                    maxLength="1"
                    autoComplete="off"
                    className="form-control text-center"
                    style={{ width: "40px" }}
                    tabIndex={item}
                    id={`pin${item}`}
                    value={pin[`pin${item}`]}
                    onChange={handleChange}
                    onKeyUp={inputFocus}
                  />
                </div>
              ))}
            </div>
            <div className="d-grid my-4 mt-5">
              <button type="submit" className="btn btn-primary">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  );
}
