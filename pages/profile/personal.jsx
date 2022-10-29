import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";

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
        <div className="container mt-4 ps-4">
          <div className="w-50">
            <h5 className="fw-bold">Personal Information</h5>
            <p className="text-secondary mt-4">
              We got your personal information from the sign up proccess. If you
              want to make changes on your information, contact our support.
            </p>
          </div>
          <div className="mt-5">
            <div className="card-body shadow-sm">
              <p className="card-title text-secondary">First Name</p>
              <h5 className="card-text fw-bold">Robert</h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <p className="card-title text-secondary">Last Name</p>
              <h5 className="card-text fw-bold">Chandler</h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <p className="card-title text-secondary">Verified E-mail</p>
              <h5 className="card-text fw-bold">pewdiepie1@gmail.com</h5>
            </div>
            <div className="card-body mt-3 shadow-sm d-flex justify-content-between">
              <div>
                <p className="card-title text-secondary">Phone Number</p>
                <h5 className="card-text fw-bold">+62 813-9387-7946</h5>
              </div>
              <Link className="d-flex align-items-center" href="/profile/phone">
                Manage
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
