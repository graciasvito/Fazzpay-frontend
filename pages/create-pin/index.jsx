import React, { useState } from "react";
import axiosClient from "utils/axios";
import LayoutAuth from "layout/auth";

import { useRouter } from "next/router";
import PinInput from "react-pin-input";

export default function CreatePIN() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async () => {
    try {
      const result = await axiosClient.post("/auth/register", form);
      alert(result.data.msg);

      //   proses kondisi pengecekan pin jika ada akan diarahkan ke home jika tidak ada akan diarahkan ke create pin
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeText = (e) => {
    console.log(e);
    // setForm({ ...form, [e.target.name]: e.target.value });
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

        <PinInput
          length={6}
          secret
          onChange={handleChangeText}
          name="pin"
          type="text"
        />

        <div class="d-grid mt-lg-5">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
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
