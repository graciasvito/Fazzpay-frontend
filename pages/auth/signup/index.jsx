import React, { useState } from "react";
import axiosClient from "utils/axios";
import LayoutAuth from "layout/auth";

import { useRouter } from "next/router";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      const result = await axiosClient.post("/auth/register", form);

      alert(result.data.msg);

      //   proses kondisi pengecekan pin jika ada akan diarahkan ke home jika tidak ada akan diarahkan ke create pin
      router.push("/login");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleChangeText = (e) => {
    console.log(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword); // mengeset nilai kebalikan dari boolean
  };

  return (
    <div className="d-flex">
      <LayoutAuth title="Sign Up" />
      <div className="right-container">
        <div className="login-headline">
          <h6 className="fw-bold">
            Start Accessing Banking Needs With All Devices and All Platforms
            With 30.000+ Users
          </h6>
        </div>
        <div className="mt-lg-5">
          <p>
            Transfering money is eassier than ever, you can access FazzPay
            wherever you are. Desktop, laptop, mobile phone? we cover all of
            that for you!
          </p>
        </div>
        <form className="mt-5">
          <div className="signup-input-container d-flex">
            <span className="">
              <div style={{ width: 20, height: 20 }}>
                <Image src="/person.svg" width={20} height={20} alt="" />
              </div>
            </span>
            <input
              type="text"
              placeholder="Enter your first name"
              name="firstName"
              onChange={handleChangeText}
            />
          </div>
          <div className="signup-input-container d-flex mt-4">
            <span className="">
              <div style={{ width: 20, height: 20 }}>
                <Image src="/person.svg" width={20} height={20} alt="" />
              </div>
            </span>
            <input
              type="text"
              placeholder="Enter your last name"
              name="lastName"
              onChange={handleChangeText}
            />
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
          <div className="signup-input-container d-flex mt-4">
            <span className="">
              <div style={{ width: 20, height: 20 }}>
                <Image src="/lock.svg" width={20} height={20} alt="" />
              </div>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              onChange={handleChangeText}
            />
            <span onClick={handleShowPassword}>
              {showPassword ? (
                <div style={{ width: 25, height: 25 }}>
                  <Image
                    src="/eye-off.svg"
                    width={25}
                    height={25}
                    layout="responsive"
                    alt="profile picture"
                  />
                </div>
              ) : (
                <div style={{ width: 25, height: 25 }}>
                  <Image
                    src="/eye.svg"
                    width={25}
                    height={25}
                    layout="responsive"
                    alt="profile picture"
                  />
                </div>
              )}
            </span>
          </div>
        </form>

        <div class="d-grid mt-lg-5">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div className="form-check d-flex justify-content-center">
          <label className="form-check-label d-flex ">
            <p>
              Don&apos;t have an account? Let&apos;s{" "}
              <a href="../auth/login" className="text-primary">
                Login
              </a>
            </p>
          </label>
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
