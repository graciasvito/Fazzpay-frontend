import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";

import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

export default function History() {
  const Router = useRouter();
  const [data, setData] = useState([]);
  const [form, setForm] = useState([]);

  const searchName = form.firstName;

  useEffect(() => {
    getDataUser();
  }, []);

  useEffect(() => {
    getDataUser();
  }, [searchName]);

  const getDataUser = async () => {
    try {
      const result = await axiosClient.get(
        `user?page=1&limit=4&search=${
          searchName === undefined ? "" : searchName
        }&sort=firstName ASC`
      );

      setData(result.data.data);
    } catch (error) {}
  };

  const handleChangeText = (e) => {
    e.preventDefault;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
    }
  };

  return (
    <div className="all-page">
      <Layout title="History">
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
            onChange={handleChangeText}
            onKeyPress={handleKeypress}
          />
        </div>
        {data.map((item) => (
          <div
            className="d-flex mt-5 justify-content-between"
            key={item}
            //
          >
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
                <Link href={`/transfer/${item.id}`}>
                  <div>
                    <p>{item.firstName}</p>
                    <p className="text-secondary">
                      {item.noTelp ? item.noTelp : "-"}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}{" "}
        {/* {data.map((item) => (
          <div className="card my-3" key={item}>
            <h1>{item.id}</h1>
          </div>
        ))}{" "} */}
      </Layout>
    </div>
  );
}
