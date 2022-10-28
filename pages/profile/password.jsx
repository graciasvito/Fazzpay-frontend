import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";

export default function History() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const userId = Cookies.get("userId");

  // useEffect(() => {
  //   dataUser();
  // }, []);

  // const dataUser = async () => {
  //   try {
  //     const result = await axiosClient.get(`user/profile/${userId}`);
  //     setData(result.data.data);
  //     console.log(result);
  //   } catch (error) {}
  // };

  const handleChangeText = (e) => {
    // console.log(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword); // mengeset nilai kebalikan dari boolean
  };
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword); // mengeset nilai kebalikan dari boolean
  };
  const handleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword); // mengeset nilai kebalikan dari boolean
  };

  return (
    <div className="all-page">
      <Layout title="Profile">
        <div className="container mt-4 ps-4">
          <div className="w-50">
            <h5 className="fw-bold">Change Password</h5>
            <p className="text-secondary mt-4">
              You must enter your current password and then type your new
              password twice.
            </p>
          </div>
          <form className="d-grid justify-content-center gap-5 ">
            <div className="signup-input-container d-flex mt-4">
              <span className="">
                <div style={{ width: 20, height: 20 }}>
                  <Image src="/lock.svg" width={20} height={20} alt="" />
                </div>
              </span>
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Current Password"
                name="oldPassword"
                onChange={handleChangeText}
              />
              <span onClick={handleShowCurrentPassword}>
                {showCurrentPassword ? (
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
            <div className="signup-input-container d-flex mt-4">
              <span className="">
                <div style={{ width: 20, height: 20 }}>
                  <Image src="/lock.svg" width={20} height={20} alt="" />
                </div>
              </span>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New password"
                name="newPassword"
                onChange={handleChangeText}
              />
              <span onClick={handleShowNewPassword}>
                {showNewPassword ? (
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
            <div className="signup-input-container d-flex mt-4">
              <span className="">
                <div style={{ width: 20, height: 20 }}>
                  <Image src="/lock.svg" width={20} height={20} alt="" />
                </div>
              </span>
              <input
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Repeat new password"
                name="confirmPassword"
                onChange={handleChangeText}
              />
              <span onClick={handleShowRepeatPassword}>
                {showRepeatPassword ? (
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
            <button class="btn btn-primary" type="button">
              Change Password
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
}
