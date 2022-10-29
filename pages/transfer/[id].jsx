import React, { useState } from "react";

import Layout from "layout";
// import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";
// import { useRouter } from "next/router";
import Link from "next/link";

export default function TransferAmount() {
  // const Router = useRouter();
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
              <div className="container mt-4">
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
          <form className="d-grid justify-content-center gap-5 mt-5 ">
            <div className=" mt-4">
              <input
                type="text"
                placeholder="0.00"
                name="amount"
                className="transfer-amount-input"
                onChange={handleChangeText}
              />
            </div>
            <span className="text-center fw-bold">Rp120.000 Available</span>
          </form>
          <div className="d-grid justify-content-center">
            <div className="transfer-note-input-container d-flex mt-4">
              <span>
                <div style={{ width: 20, height: 20 }}>
                  <Image src="/pencil.svg" width={20} height={20} alt="" />
                </div>
              </span>
              <input
                type="text"
                placeholder="Add some notes"
                name="notes"
                onChange={handleChangeText}
              />
            </div>
          </div>

          <div className="d-grid justify-content-end me-3 mt-5">
            <Link href={{ pathname: "/transfer/confirmation", query: form }}>
              <button className="btn btn-primary " type="button">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}
