import React from "react";

import Layout from "layout";

import axiosServer from "utils/axiosServer";
import Image from "next/image";
import Cookies from "next-cookies";

export default function History(props) {
  return (
    <div className="all-page">
      <Layout title="History">
        <div className="container mt-3 d-flex justify-content-between">
          <h5 className="ms-4 fw-bold">Transaction History</h5>
          <button type="button" className="btn btn-outline-secondary me-4">
            --Select Filter--
          </button>
        </div>
        {props.listUser.length > 0 ? (
          props.listUser.map((item) => (
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
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const dataCookies = Cookies(context);
  const result = await axiosServer.get(
    "/transaction/history?page=1&limit=5&filter=YEAR",
    {
      headers: {
        Authorization: `Bearer ${dataCookies.token}`,
      },
    }
  );

  return {
    props: {
      listUser: result.data.status === 200 ? result.data.data : [],
      pagination: result.data.status === 200 ? result.data.pagination : {},
    }, // will be passed to the page component as props
  };
}
