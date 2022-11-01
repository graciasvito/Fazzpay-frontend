import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axiosClient from "utils/axios";

export default function Aside(props) {
  const [data, setData] = useState();
  const Router = useRouter();

  const handleDashboard = () => {
    Router.push("/home");
  };

  const handleTransfer = () => {
    Router.push("/transfer");
  };

  const handleChangeText = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleTopup = async () => {
    //  ("topup " + data.amount);
    // try {
    const result = await axiosClient.post("transaction/top-up", data);
    window.open(result.data.data.redirectUrl);
    Router.reload();
  };

  const handleProfile = () => {
    Router.push("/profile");
  };

  const handleLogout = async () => {
    const result = await axiosClient.post("auth/logout");
    alert(result.data.msg);
    Cookies.remove("token");
    Cookies.remove("userId");
    localStorage.removeItem("refreshtoken");
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    Router.push("/auth/login");
  };

  return (
    <aside className="aside-container d-md-flex flex-column justify-content-around d-none">
      <div className=" ms-lg-4">
        <a className="d-flex" onClick={handleDashboard}>
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/dashboard.png"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>
          <p
            className={`mt-1 ms-3 ${
              props.title === "Home" ? "text-primary" : ""
            }`}
          >
            Dashboard
          </p>
        </a>
        <a className="d-flex mt-lg-4" onClick={handleTransfer}>
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/arrow-up.svg"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>
          <p
            className={`mt-1 ms-3 ${
              props.title === "Transfer" ? "text-primary" : ""
            }`}
          >
            Transfer
          </p>
        </a>
        <a className="d-flex mt-lg-4">
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/add.svg"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>

          <p
            type="button"
            className="mt-1 ms-3"
            data-bs-toggle="modal"
            data-bs-target="#topUp"
          >
            Top Up
          </p>
        </a>

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
        <a onClick={handleProfile}>
          <div className="d-flex mt-lg-4">
            <div style={{ width: 30, height: 30 }}>
              <Image
                src="/person.svg"
                width={30}
                height={30}
                layout="responsive"
                alt="dashboard"
              />
            </div>
            <p className="mt-1 ms-3">Profile</p>
          </div>
        </a>
      </div>
      <div className="ms-lg-4" onClick={handleLogout}>
        <div className="d-flex ">
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/logout.svg"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>

          <p className="mt-1 ms-3">Logout</p>
        </div>
      </div>
    </aside>
  );
}
