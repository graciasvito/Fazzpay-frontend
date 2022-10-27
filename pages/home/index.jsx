import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Home() {
  const [data, setData] = useState([]);

  const userId = Cookies.get("userId");

  useEffect(() => {
    getDataUserById();
  }, []);

  // const getDataUser = async () => {
  //   try {
  //     const result = await axiosClient.get(
  //       "/user?page=1&limit=50&search=&sort=firstName ASC"
  //     );
  //     setData(result.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getDataUserById = async () => {
    try {
      const result = await axiosClient.get(`user/profile/${userId}`);
      setData(result.data.data);
      // setData(result)
    } catch (error) {}
  };

  return (
    <div className="all-page">
      <Layout title="Home">
        <div className="home-summary-container container d-flex">
          <div className="container text-white balance-container d-flex flex-column justify-content-around">
            <p>Balance</p>
            <h2 className="fw-bold">Rp{data.balance}</h2>
            <p>+62 812-3456-1278</p>
          </div>
          <div className="summary-button d-flex align-items-center">
            <div>
              <button type="button" class="btn summary-button text-white mb-2">
                <div className="d-flex">
                  <div style={{ width: 30, height: 30 }}>
                    <Image
                      src="/arrow-up.svg"
                      width={30}
                      height={30}
                      layout="responsive"
                      alt="dashboard"
                    />
                  </div>
                  <p className="mt-1 ms-3">Transfer</p>
                </div>
              </button>
              <button type="button" class="btn  summary-button text-white mt-2">
                <div className="d-flex">
                  <div style={{ width: 30, height: 30 }}>
                    <Image
                      src="/add.svg"
                      width={30}
                      height={30}
                      layout="responsive"
                      alt="dashboard"
                    />
                  </div>
                  <p className="mt-1 ms-3">Top Up</p>
                </div>
              </button>
            </div>
          </div>

          {/* <p>{process.env.URL_BACKEND}</p>
          {data.map((item) => (
            <div className="card my-3" key={item.id}>
              <h1>{item.firstName}</h1>
            </div>
          ))} */}
        </div>
      </Layout>
    </div>
  );
}
