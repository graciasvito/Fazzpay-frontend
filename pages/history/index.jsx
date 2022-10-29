import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    historyTransaction();
  }, []);

  const historyTransaction = async () => {
    try {
      const result = await axiosClient.get(
        "/transaction/history?page=1&limit=3&filter=WEEK"
      );
      setData(result.data.data);
    } catch (error) {}
  };

  return (
    <div className="all-page">
      <Layout title="History">
        <div className="container mt-3 d-flex justify-content-between">
          <h5 className="ms-4 fw-bold">Transaction History</h5>
          <button type="button" className="btn btn-outline-secondary me-4">
            --Select Filter--
          </button>
        </div>
        {data.length > 0 ? (
          data.map((item) => (
            <div className="d-flex mt-5 justify-content-between" key={item}>
              <div className="ms-4 d-flex">
                <div style={{ width: 40, height: 40 }} className="mt-2 ">
                  <Image
                    src="/profile.png"
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
              <p className="d-flex align-items-center me-4">{item.amount}</p>
            </div>
          ))
        ) : (
          <h2>Data Not Found !</h2>
        )}

        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">...</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* {}{" "} */}
        {/* {data.map((item) => (
          <div className="card my-3" key={item}>
            <h1>{item.id}</h1>
          </div>
        ))}{" "} */}
      </Layout>
    </div>
  );
}
