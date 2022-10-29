import React, { useState } from "react";

import Layout from "layout";
// import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";

export default function History() {
  //   const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const userId = Cookies.get("userId");

  const handleChangeText = (e) => {
    // console.log(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="all-page">
      <Layout title="Transfer">
        <div className="container mt-4 ps-4">
          <div className="w-50">
            <div>
              <h5 className="fw-bold">Transfer Money</h5>
              <div className="container mt-5">
                <div className="card-body d-flex ">
                  <div style={{ width: 60, height: 60 }} className=" tes">
                    <Image
                      src="/profile.png"
                      width={60}
                      height={60}
                      layout="responsive"
                      alt="pp"
                    />
                  </div>

                  <div className="ms-3">
                    <p className="card-text fw-bold">Robert</p>
                    <p className="card-title text-secondary">
                      +62 813-8492-9994
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-secondary mt-4">
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
            </div>
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
                name="oldPassword"
              />
            </div>
            <button className="btn btn-primary" type="button">
              Change Password
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
}
