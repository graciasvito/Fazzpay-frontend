/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import moment from "moment/moment";

export default function Confirmation() {
  const Router = useRouter();
  const { query } = Router;

  const form = query;
  Cookies.set("amount", form.amount);
  Cookies.set("notes", form.notes);
  Cookies.set("receiver", form.receiverId);
  Cookies.set("time", moment().format("LLL"));

  const [data, setData] = useState([]);
  const [receive, setReceive] = useState([]);

  const userId = Cookies.get("userId");

  const receiverId = form.receiverId;

  useEffect(() => {
    dataUser(), dataReceiverById();
  }, []);

  const dataUser = async () => {
    const result = await axiosClient.get(`user/profile/${userId}`);
    setData(result.data.data);
  };

  const dataReceiverById = async () => {
    try {
      const result = await axiosClient.get(`user/profile/${receiverId}`);
      setReceive(result.data.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  const handleChange = (e) => {
    setPin({ ...pin, [e.target.id]: e.target.value });
  };

  const inputFocus = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.form.elements[next].focus();
      }
    } else {
      const next = e.target.tabIndex;
      if (next < 6) {
        e.target.form.elements[next].focus();
      }
    }
  };

  const handleTransfer = async () => {
    try {
      await axiosClient.post("transaction/transfer", form);
      Router.push("/transfer/status/success");
    } catch (error) {
      Router.push("/transfer/status/failed");
    }
  };

  const handlePINSubmit = async (e) => {
    e.preventDefault();
    let allPin = "";
    for (const item in pin) {
      allPin += pin[item];
    }

    try {
      const result = await axiosClient.get(`user/pin/${allPin}`);
      alert(result.data.msg);
      handleTransfer();
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="all-page">
      <Layout title="Transfer Confirmation">
        <div className="container mt-4 ps-4">
          <div className="w-50">
            <h5 className="fw-bold">Transfer To</h5>
            <div className="container mt-4">
              <div className="card-body d-flex ">
                <div style={{ width: 60, height: 60 }}>
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
                  <p className="card-text fw-bold">{receive.firstName}</p>
                  <p className="card-title text-secondary">
                    +62{receive.noTelp}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="fw-bold mt-5">Details</p>
          <div className="mt-2">
            <div className="card-body shadow-sm">
              <p className="card-title text-secondary">Amount</p>
              <h5 className="card-text fw-bold">
                Rp{new Intl.NumberFormat().format(form.amount)}
              </h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <p className="card-title text-secondary">Balance Left</p>
              <h5 className="card-text fw-bold">
                Rp{new Intl.NumberFormat().format(data.balance - form.amount)}
              </h5>
            </div>
            <div className="card-body mt-3 shadow-sm">
              <p className="card-title text-secondary">Date&Time</p>
              <h5 className="card-text fw-bold">{moment().format("LLL")}</h5>
            </div>
            <div className="card-body mt-3 shadow-sm d-flex justify-content-between">
              <div>
                <p className="card-title text-secondary">Notes</p>
                <h5 className="card-text fw-bold">
                  {form.notes ? form.notes : ""}
                </h5>
              </div>
            </div>
          </div>
          <div className="d-grid justify-content-end me-3 mt-5">
            <button
              className="btn btn-primary "
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#transfer"
              aria-label="Close"
            >
              Continue
            </button>
            <div
              className="modal fade"
              id="transfer"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <div>
                      <h5 className="modal-title" id="exampleModalLabel">
                        Enter PIN to Transfer
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
                      Enter your 6 digits PIN for confirmation to continue
                      transferring money.
                    </p>
                    <div className="modal-body">
                      <form className="mt-3 mb-5">
                        <div className="d-flex gap-2 justify-content-center">
                          {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item}>
                              <input
                                type="text"
                                maxLength="1"
                                autoComplete="off"
                                className="form-control text-center"
                                style={{ width: "40px" }}
                                tabIndex={item}
                                id={`pin${item}`}
                                value={pin[`pin${item}`]}
                                onChange={handleChange}
                                onKeyUp={inputFocus}
                              />
                            </div>
                          ))}
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handlePINSubmit}
                    >
                      Continue
                    </button>
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
