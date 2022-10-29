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

  const handleChangeText = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTopup = async () => {
    // console.log("topup " + data.amount);
    // try {
    const result = await axiosClient.post("transaction/top-up", data);
    Router.push(result.data.data.redirectUrl);
  };

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
        <div className="home-summary-container container">
          <div id="dashboard-summary" className="d-flex w-100 pt-4">
            <div className="container text-white balance-container d-flex flex-column justify-content-around">
              <p>Balance</p>
              <h2 className="fw-bold">Rp{data.balance}</h2>
              <p>+62 812-3456-1278</p>
            </div>
            <div className="summary-button d-flex align-items-center">
              <div>
                <button
                  type="button"
                  className="btn summary-button text-white mb-2"
                >
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
                <button
                  type="button"
                  className="btn  summary-button text-white mt-2"
                  data-bs-toggle="modal"
                  data-bs-target="#topUp"
                >
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
                <div
                  className="modal fade"
                  id="topUp"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div>
                          <h5 className="modal-title" id="exampleModalLabel">
                            Topup
                          </h5>
                        </div>

                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="container">
                        <p className="text-muted container">
                          Enter the amount of money, and click submit
                        </p>
                        <div className="modal-body">
                          <form>
                            {" "}
                            <input
                              type="text"
                              className="aside-input"
                              name="amount"
                              onChange={handleChangeText}
                            />
                          </form>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleTopup}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
