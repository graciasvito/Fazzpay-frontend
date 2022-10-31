import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import axiosClient from "utils/axios";
import { useEffect } from "react";

export default function Header() {
  const userId = Cookies.get("userId");
  const [data, setData] = useState({});

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    const result = await axiosClient.get(`user/profile/${userId}`);
    setData(result.data.data);
  };

  return (
    <div className="d-md-inline d-none">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link href="/home">
            <p className="navbar-brand fw-bold text-primary">FazzPay</p>
          </Link>
          <Link href="/profile">
            <div className="d-flex align-items-center">
              <div style={{ width: 50, height: 50 }}>
                <Image
                  src={
                    data.image
                      ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${data.image}`
                      : "/person-circle.svg"
                  }
                  width={50}
                  height={50}
                  layout="responsive"
                  alt="profile picture"
                />
              </div>
              <div className="ms-3 mt-3">
                <p className="fw-bold">{`${data.firstName} ${data.lastName}`}</p>
                <p>{data.noTelp}</p>
              </div>
              <div style={{ width: 20, height: 20 }} className="ms-4">
                <Image
                  src="/notifications-outline.svg"
                  width={20}
                  height={20}
                  layout="responsive"
                  alt="notification"
                />
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
}
