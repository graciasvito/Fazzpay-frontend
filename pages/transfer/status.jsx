import React, { useState } from "react";

import Layout from "layout";
// import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function History() {
  const router = useRouter();
  //   const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  const userId = Cookies.get("userId");

  const handleChangeText = (e) => {
    // console.log(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="all-page">
      <Layout title="Edit Phone Number">
        <div className="container mt-4 ps-4">
          <div className="d-grid justify-content-center mt-lg-5">
            <div style={{ width: "70", height: "70" }}>
              <Image
                src="/success.png"
                width={70}
                height={70}
                alt="success"
                layout="responsive"
              />
            </div>
            <p className="fw-bold mt-4">Transfer Success</p>
          </div>
          <div className="mt-4">
            <div className="card-body shadow-sm">
              <p className="card-title text-secondary">Amount</p>
              <h5 className="card-text fw-bold">Rp100.000</h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <p className="card-title text-secondary">Balance</p>
              <h5 className="card-text fw-bold">Rp20.000</h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <p className="card-title text-secondary">Date & Time</p>
              <h5 className="card-text fw-bold">May 11, 2020 - 12.20</h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <div>
                <p className="card-title text-secondary">Notes</p>
                <h5 className="card-text fw-bold">For Buying some snack</h5>
              </div>
            </div>
          </div>
          <div className="w-50 mt-5">
            <h5 className="fw-bold">Transfer To</h5>
            <div className="container mt-4">
              <div className="card-body d-flex ">
                <div style={{ width: 60, height: 60 }} className=" ">
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
                  <p className="card-title text-secondary">+62 813-8492-9994</p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end me-3 mt-5 gap-3">
            <button className="btn btn-primary " type="button" disabled>
              <span>
                <Image
                  src="/download.svg"
                  width={20}
                  height={20}
                  alt="download"
                />
              </span>
              Download PDF
            </button>
            <button className="btn btn-primary " type="button">
              Back to Home
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
