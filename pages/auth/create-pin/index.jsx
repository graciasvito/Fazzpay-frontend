import React, { useState } from "react";
import axiosClient from "utils/axios";
import LayoutAuth from "layout/auth";
import Cookies from "js-cookie";

import { useRouter } from "next/router";

export default function CreatePIN() {
  const router = useRouter();

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
    <div className="d-flex">
      <LayoutAuth title="Sign Up" />
      <div className="right-container">
        <div className="login-headline">
          <h6 className="fw-bold">
            Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
            That You Created Yourself.
          </h6>
        </div>
        <div className="mt-lg-5">
          <p>
            Create 6 digits pin to secure all your money and your data in
            FazzPay app. Keep it secret and don’t tell anyone about your FazzPay
            account password and the PIN.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
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
    </div>
    // <div className="container text-center">
    //   <div className="mt-2">
    //     <form className="card p-5">
    //       <h1>Login</h1>
    //       <hr />
    //       <input
    //         type="email"
    //         className="form-control my-2"
    //         name="email"
    //         placeholder="Input email ..."
    //         onChange={handleChangeText}
    //       />
    //       <input
    //         type="password"
    //         className="form-control my-2"
    //         name="password"
    //         placeholder="Input password ..."
    //         onChange={handleChangeText}
    //       />
    //       <button
    //         type="button"
    //         className="btn btn-primary mt-3"
    //         onClick={handleSubmit}
    //       >
    //         Submit
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
}
