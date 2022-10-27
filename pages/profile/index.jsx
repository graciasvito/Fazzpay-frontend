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
        <div className="d-flex  justify-content-center">
          <div className="">
            <Image src="/profile.png" width={80} height={80} alt="" />
          </div>
        </div>
      </Layout>
    </div>
  );
}
