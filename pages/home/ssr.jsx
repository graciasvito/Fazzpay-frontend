/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import Layout from "layout";
import { useRouter } from "next/router";
import axiosServer from "utils/axiosServer";

import Cookies from "next-cookies"; // digunakan untuk kebutuhan mengambil data untuk server side

import qs from "query-string";

export default function HomeSSR(props) {
  const router = useRouter();

  const useNavigateSearch = (data) => {
    let query = { ...props.params, ...data };
    query;
    if (query.page === 1) {
      delete query.page;
    }
    if (query.searchName === "") {
      delete query.searchName;
    }
    query = qs.stringify(query);
    router.push(`/home/ssr?${query}`);
  };

  const handlePrevPage = () => {
    useNavigateSearch({ page: props?.params?.page - 1 });
  };

  const handleNextPage = () => {
    useNavigateSearch({ page: props?.params?.page + 1 });
  };

  return (
    <Layout title="Home">
      <div className="text-center container">
        <h1>Home Page SSR</h1>
        <p>{process.env.URL_BACKEND}</p>
        {props.listUser.map((item) => (
          <div className="card my-3" key={item.id}>
            <h1>{item.firstName}</h1>
          </div>
        ))}
        <div className="d-flex gap-2 justify-content-center w-100 my-5">
          <button className="btn btn-primary" onClick={handlePrevPage}>
            &lt;
          </button>
          <button className="btn btn-primary" onClick={handleNextPage}>
            &gt;
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  let params = context.query;
  params.page = params.page ? +params.page : 1;
  params.page;
  const dataCookies = Cookies(context);
  const result = await axiosServer.get(
    "/user?page=1&limit=5&search=&sort=firstName ASC",
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
