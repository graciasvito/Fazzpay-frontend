import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import Chart from "components/chart";

export default function Home() {
  const [data, setData] = useState([]);
  const [history, setHistory] = useState({});
  const [dashboard, setDashboard] = useState({});

  const userId = Cookies.get("userId");

  useEffect(() => {
    getDataUserById(), historyTransaction(), getDashboard();
  }, []);

  const handleChangeText = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTopup = async () => {
    //  ("topup " + data.amount);
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

  const historyTransaction = async () => {
    try {
      const result = await axiosClient.get(
        "/transaction/history?page=1&limit=4&filter=YEAR"
      );

      setHistory(result.data.data);
    } catch (error) {}
  };

  const getDashboard = async () => {
    try {
      const result = await axiosClient.get(`dashboard/${userId}`);
      setDashboard(result.data.data);
    } catch (error) {
      error;
    }
  };

  return (
    <div className="all-page">
      <Layout title="Home">
        <div className="home-summary-container container">
          <div id="dashboard-summary" className="d-flex w-100 pt-4">
            <div className="container text-white balance-container d-flex flex-column justify-content-around">
              <p>Balance</p>
              <h2 className="fw-bold">
                Rp{new Intl.NumberFormat().format(data.balance)}
              </h2>
              <p>+62 812-3456-1278</p>
            </div>
            <div className="summary-button d-flex align-items-center">
              <div>
                <Link href="/transfer">
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

                      <a className="mt-1 ms-3">Transfer</a>
                    </div>
                  </button>
                </Link>
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
        <div className="d-flex mt-lg-2 ">
          <div className="col-7 container pt-lg-5">
            <div className=" ">
              <div className="d-flex">
                <div className="col-6">
                  <Image
                    src="/arrow-green.svg"
                    width={30}
                    height={30}
                    alt="income arrow"
                  />
                  <p>Income</p>
                  <h5 className="fw-bold">
                    Rp{new Intl.NumberFormat().format(dashboard.totalIncome)}
                  </h5>
                </div>
                <div className="col-6">
                  <Image
                    src="/arrow-red.svg"
                    width={30}
                    height={30}
                    alt="expense arrow"
                  />
                  <p>Expense</p>
                  <h5 className="fw-bold">
                    Rp{new Intl.NumberFormat().format(dashboard.totalExpense)}{" "}
                  </h5>
                </div>
              </div>
              <Chart />
            </div>
          </div>
          <div className="col-5 pt-lg-5">
            <div className="d-flex justify-content-around">
              <h5 className="fw-bold">History Transaction</h5>
              <Link href="/history?page=1">
                <a className="text-primary">See All</a>
              </Link>
            </div>
            <div>
              {history.length > 0 ? (
                history.map((item) => (
                  <div
                    className="d-flex mt-5 justify-content-between"
                    key={item}
                  >
                    <div className="ms-4 d-flex">
                      <div style={{ width: 40, height: 40 }} className="mt-2 ">
                        <Image
                          src={
                            item.image
                              ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${item.image}`
                              : "/person-circle.svg"
                          }
                          width={40}
                          height={40}
                          layout="responsive"
                          alt="dashboard"
                        />
                      </div>
                      <div className="ms-3">
                        <p>{item.fullName}</p>
                        <p className="text-secondary">{item.type}</p>
                      </div>
                    </div>
                    <p className="d-flex align-items-center me-4">
                      {item.type === "topup" || item.type === "accept" ? (
                        <p className="text-success">
                          + Rp{new Intl.NumberFormat().format(item.amount)}
                        </p>
                      ) : (
                        <p className="text-danger">
                          - Rp{new Intl.NumberFormat().format(item.amount)}
                        </p>
                      )}
                    </p>
                  </div>
                ))
              ) : (
                <h2>Data Not Found !</h2>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
