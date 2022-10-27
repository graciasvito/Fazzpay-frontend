import React, { useState } from "react";
import axiosClient from "utils/axios";
import LayoutAuth from "layout/auth";

import { useRouter } from "next/router";
import Image from "next/image";

export default function CreatePIN() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const handleSubmit = async () => {
    try {
      const result = await axiosClient.post("/auth/forgot-password", form);

      alert(result.data.msg);

      //   proses kondisi pengecekan pin jika ada akan diarahkan ke home jika tidak ada akan diarahkan ke create pin
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeText = (e) => {
    // console.log(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex">
      <LayoutAuth title="Forgot Password" />
      <div className="right-container">
        <div className="login-headline">
          <h6 className="fw-bold">
            Did You Forgot Your Password? Don’t Worry, You Can Reset Your
            Password In a Minutes.
          </h6>
        </div>
        <div className="mt-lg-5">
          <p>
            To reset your password, you must type your e-mail and we will send a
            link to your email and you will be directed to the reset password
            screens.
          </p>
        </div>

        <div className="signup-input-container d-flex mt-4">
          <span className="">
            <div style={{ width: 20, height: 20 }}>
              <Image src="/mail.svg" width={20} height={20} alt="" />
            </div>
          </span>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChangeText}
          />
        </div>

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
  );
}
