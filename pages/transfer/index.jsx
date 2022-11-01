import React, { useState } from "react";

import Layout from "layout";

import axiosServer from "utils/axiosServer";
import Image from "next/image";
import Cookies from "next-cookies";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Transfer(props) {
  const router = useRouter();
  const [form, setForm] = useState([]);

  const query = props.params;

  const handleChangeText = (e) => {
    if (e.key === "Enter") {
      e.preventDefault;
      setForm({ ...form, [e.target.name]: e.target.value });
      router.push(`/transfer?search=${form.firstName}`);
    }
  };
  form;
  return (
    <div className="all-page">
      <Layout title="Transfer">
        <div className="container mt-5 ">
          <h5 className="ms-4 fw-bold">Search Receiver</h5>
        </div>
        <div className="transfer-input-container d-flex container mt-4">
          <span className="mt-3">
            <div style={{ width: 20, height: 20 }}>
              <Image src="/search.svg" width={20} height={20} alt="" />
            </div>
          </span>
          <input
            type="text"
            placeholder="Search receiver here"
            name="firstName"
            onKeyPress={handleChangeText}
          />
        </div>
        {props.listUser.map((item) => (
          <div
            className="d-flex mt-5 justify-content-between"
            key={item}
            //
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
                <Link href={`/transfer/${item.id}`}>
                  <div>
                    <p>{`${item.firstName} ${item.lastName}`}</p>
                    <p className="text-secondary">
                      {item.noTelp ? item.noTelp : "-"}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}{" "}
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  let params = query;
  params.search = params.search ? params.search : "";
  const search = params.search;

  const dataCookies = Cookies(context);
  const result = await axiosServer.get(
    `user?page=1&limit=4&search=${search}&sort=firstName ASC`,
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
