import React from "react";

import Layout from "layout";

import axiosServer from "utils/axiosServer";
import Image from "next/image";
import Cookies from "next-cookies";
import { useRouter } from "next/router";
import Link from "next/link";
import qs from "query-string";

export default function History(props) {
  const router = useRouter();

  const query = props.params;
  const page = query.page;

  const handlePrevPage = () => {
    const nextPage = Number(page) - 1;
    router.push(`/history?page=${nextPage}`);
  };

  const handleNextPage = () => {
    const nextPage = Number(page) + 1;
    router.push(`/history?page=${nextPage}`);
  };

  return (
    <div className="all-page">
      <Layout title="History">
        <div className="container mt-3 d-flex justify-content-between">
          <h5 className="ms-4 fw-bold">Transaction History</h5>
          <button
            type="button"
            className="btn btn-outline-secondary me-4 dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            --Select Filter--
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link
                className="dropdown-item"
                href={{
                  pathname: "/history",
                  query: {
                    page: page,
                    filter: "WEEK",
                  },
                }}
              >
                Week
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                href={{
                  pathname: "/history",
                  query: {
                    page: page,
                    filter: "MONTH",
                  },
                }}
              >
                Month
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                href={{
                  pathname: "/history",
                  query: {
                    page: page,
                    filter: "YEAR",
                  },
                }}
              >
                Year
              </Link>
            </li>
          </ul>
        </div>
        {props.listUser.length > 0 ? (
          props.listUser.map((item) => (
            <div className="d-flex mt-5 justify-content-between" key={item}>
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
        <div className="d-flex gap-2 justify-content-center w-100 my-5">
          <button
            className="btn btn-primary"
            onClick={handlePrevPage}
            disabled={props.pagination.page === 1 ? true : false}
          >
            &lt;
          </button>
          <button
            className="btn btn-primary"
            onClick={handleNextPage}
            disabled={
              props.pagination.page === props.pagination.totalPage
                ? true
                : false
            }
          >
            &gt;
          </button>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  let params = query;
  params.page = params.page ? +params.page : 1;
  const page = params.page;

  const filter = query.filter || "YEAR";

  console.log(query);

  const dataCookies = Cookies(context);
  const result = await axiosServer.get(
    `/transaction/history?page=${page}&limit=5&filter=${filter}`,
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
      params: params,
    }, // will be passed to the page component as props
  };
}
