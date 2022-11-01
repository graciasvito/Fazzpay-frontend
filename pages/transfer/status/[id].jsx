import React, { useState, useEffect } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function History() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [receive, setReceive] = useState([]);

  const { id } = router.query;

  const userId = Cookies.get("userId");
  const transferAmount = Cookies.get("amount");
  const transferNotes = Cookies.get("notes");
  const transferReceiver = Cookies.get("receiver");
  const dateTime = Cookies.get("time");
  console.log(transferAmount, transferNotes, transferReceiver);

  useEffect(() => {
    dataUser(), dataReceiverById();
  }, []);

  const dataUser = async () => {
    const result = await axiosClient.get(`user/profile/${userId}`);
    setData(result.data.data);
  };
  const dataReceiverById = async () => {
    try {
      const result = await axiosClient.get(`user/profile/${transferReceiver}`);
      setReceive(result.data.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleHome = () => {
    Cookies.remove("transferAmount");
    Cookies.remove("transferNotes");
    Cookies.remove("transferReceiver");
    Cookies.remove("dateTime");
    router.push("/home");
  };
  const handleTryAgain = () => {
    Cookies.remove("transferAmount");
    Cookies.remove("transferNotes");
    Cookies.remove("transferReceiver");
    Cookies.remove("dateTime");
    router.push("/transfer");
  };

  return (
    <div className="all-page">
      <Layout title="Transaction Status">
        <div className="container mt-4 ps-4">
          <div className="d-grid justify-content-center mt-lg-5">
            <div style={{ width: "70", height: "70" }}>
              <Image
                src={id === "success" ? "/success.png" : "/failed.png"}
                width={70}
                height={70}
                alt="success"
                layout="responsive"
              />
            </div>
            <p className="fw-bold mt-4">
              {id === "success" ? "Transfer Success" : "Transfer Failed"}
            </p>
          </div>
          <div className="mt-4">
            <div className="card-body shadow-sm">
              <p className="card-title text-secondary">Amount</p>
              <h5 className="card-text fw-bold">
                Rp{new Intl.NumberFormat().format(transferAmount)}
              </h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <p className="card-title text-secondary">Balance</p>
              <h5 className="card-text fw-bold">
                Rp{new Intl.NumberFormat().format(data.balance)}
              </h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <p className="card-title text-secondary">Date & Time</p>
              <h5 className="card-text fw-bold">{dateTime}</h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <div>
                <p className="card-title text-secondary">Notes</p>
                <h5 className="card-text fw-bold">{transferNotes}</h5>
              </div>
            </div>
          </div>
          <div className="w-50 mt-5">
            <h5 className="fw-bold">Transfer To</h5>
            <div className="container mt-4">
              <div className="card-body d-flex ">
                <div style={{ width: 60, height: 60 }} className=" ">
                  <Image
                    src={
                      receive.image
                        ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${receive.image}`
                        : "/person-circle.svg"
                    }
                    width={60}
                    height={60}
                    layout="responsive"
                    alt="pp"
                  />
                </div>

                <div className="ms-3">
                  <p className="card-text fw-bold">{`${receive.firstName} ${receive.lastName}`}</p>
                  <p className="card-title text-secondary">
                    +62{receive.noTelp}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end me-3 mt-5 gap-3">
            <button
              className={`btn btn-primary ${id === "failed" ? "d-none" : ""}`}
              type="button"
              disabled
            >
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
            <button
              className="btn btn-primary "
              type="button"
              onClick={id === "success" ? handleHome : handleTryAgain}
            >
              {id === "success" ? "Back to Home" : "Try Again"}
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}
