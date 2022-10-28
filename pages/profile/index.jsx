import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";

export default function History() {
  const [data, setData] = useState([]);

  const userId = Cookies.get("userId");

  useEffect(() => {
    dataUser();
  }, []);

  const dataUser = async () => {
    try {
      const result = await axiosClient.get(`user/profile/${userId}`);
      setData(result.data.data);
    } catch (error) {}
  };

  return (
    <div className="all-page">
      <Layout title="Profile">
        <div className="d-flex justify-content-center mt-lg-5">
          <div>
            <div style={{ width: 80, height: 80 }} className="">
              <Image src="/profile.png" width={80} height={80} alt="" />
            </div>
            <div className="d-flex justify-content-center mt-1">
              <div className="me-2">
                <Image src="/pencil.svg" width={15} height={15} alt="" />
              </div>
              <div>
                <p className="">Edit</p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center ">
          <div className="text-center profile-container">
            <h4 className="fw-bold">Robert Chandler</h4>
            <h6 className="text-secondary">+62 813-9387-7946</h6>
            <div className="mt-5 d-grid gap-3 ">
              <button className="btn btn-color " type="button">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Personal Information</span>
                  <span className="mt-1">
                    <Image
                      src="/arrow-right.svg"
                      width="18"
                      height="18"
                      alt=""
                    />
                  </span>
                </div>
              </button>
              <button className="btn btn-color " type="button">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Change Password</span>
                  <span className="mt-1">
                    <Image
                      src="/arrow-right.svg"
                      width="18"
                      height="18"
                      alt=""
                    />
                  </span>
                </div>
              </button>
              <button className="btn btn-color " type="button">
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">Change PIN</span>
                  <span className="mt-1">
                    <Image
                      src="/arrow-right.svg"
                      width="18"
                      height="18"
                      alt=""
                    />
                  </span>
                </div>
              </button>
              <button className="btn btn-color fw-bold" type="button">
                Logout
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
