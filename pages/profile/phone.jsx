import React, { useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Phone() {
  const router = useRouter();
  //   const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const userId = Cookies.get("userId");

  const handleChangePhone = async () => {
    try {
      const result = await axiosClient.patch(`user/profile/${userId}`, form);
      alert(result.data.msg);
      router.reload();
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleChangeText = (e) => {
    //  (e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="all-page">
      <Layout title="Edit Phone Number">
        <div className="container mt-4 ps-4">
          <div className="w-50">
            <h5 className="fw-bold">Edit Phone Number</h5>
            <p className="text-secondary mt-4">
              You must enter your current password and then type your new
              password twice.
            </p>
          </div>
          <form className="d-grid justify-content-center gap-5 phone-form-container">
            <div className="signup-input-container d-flex mt-4">
              <span className="">
                <div style={{ width: 20, height: 20 }}>
                  <Image src="/call.svg" width={20} height={20} alt="" />
                </div>
              </span>
              <span>+62</span>
              <input
                type="text"
                placeholder="Current Password"
                name="noTelp"
                onChange={handleChangeText}
              />
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleChangePhone}
            >
              Change Phone Number
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
}
