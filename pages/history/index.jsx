import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";

export default function History() {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    historyTransaction();
  }, []);

  const historyTransaction = async () => {
    try {
      const result = await axiosClient.get(
        "/transaction/history?page=1&limit=5&filter=YEAR"
      );
      console.log(result);
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
                    src={`https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${item.image}`}
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
                {item.type === "topup" || "accept" ? (
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
