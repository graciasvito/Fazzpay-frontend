import React, { useEffect, useState } from "react";

import Layout from "layout";
import axiosClient from "utils/axios";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

export default function History() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [imageForm, setImageForm] = useState({});

  const userId = Cookies.get("userId");

  useEffect(() => {
    dataUserById();
  }, []);

  const dataUserById = async () => {
    try {
      const result = await axiosClient.get(`user/profile/${userId}`);
      setData(result.data.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleChangeImage = (e) => {
    const { name, files } = e.target;
    setImageForm({ ...imageForm, [name]: files[0] });
    setImage(URL.createObjectURL(files[0]));
  };

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    const formImageData = new FormData();
    for (const image in imageForm) {
      formImageData.append(image, imageForm[image]);
    }
    axiosClient
      .patch(`user/image/${userId}`, formImageData)
      .then((response) => {
        alert(response.data.msg);
        router.reload();
      });
  };

  const handleDeleteImage = async () => {
    const result = await axiosClient.delete(`user/image/${userId}`);
    alert(result.data.msg);
    router.reload();
  };

  return (
    <div className="all-page">
      <Layout title="Profile">
        <div className="d-flex justify-content-center mt-lg-5">
          <div>
            <div className="d-grid justify-content-end">
              {" "}
              <div onClick={handleDeleteImage}>
                <Image
                  src="/trash.svg"
                  width={15}
                  height={15}
                  alt="delete Img"
                />
              </div>
            </div>
            <div style={{ width: 80, height: 80 }} className="">
              <Image
                src={
                  image
                    ? image
                    : data.image
                    ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/${data.image}`
                    : "/person-circle.svg"
                }
                width={80}
                height={80}
                alt=""
              />
            </div>
            <div className="d-flex justify-content-center mt-1">
              <div className="me-2">
                <Image src="/pencil.svg" width={15} height={15} alt="" />
              </div>
              <div>
                <input
                  type="file"
                  className="d-none"
                  id="profile-img"
                  name="image"
                  onChange={handleChangeImage}
                />
                <label htmlFor={image ? "" : "profile-img"}>Edit</label>
              </div>
            </div>
            <div
              className={`d-grid justify-content-center ${
                image ? "" : "d-none"
              }`}
            >
              <button
                type="button"
                className="btn btn-primary "
                onClick={handleUpdateImage}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center ">
          <div className="text-center profile-container">
            <h4 className="fw-bold">
              {data.firstName} {data.lastName}
            </h4>
            <h6 className="text-secondary">+62 {data.noTelp}</h6>
            <div className="mt-5 d-grid gap-3 ">
              <Link href="/profile/personal">
                <button className="btn btn-color " type="button">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Personal Information</span>
                    <span className="mt-1">
                      <Image
                        src="/arrow-right.svg"
                        width="18"
                        height="18"
                        alt=""
                      />
                    </span>
                  </div>
                </button>
              </Link>
              <Link href="/profile/password">
                <button className="btn btn-color " type="button">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Change Password</span>
                    <span className="mt-1">
                      <Image
                        src="/arrow-right.svg"
                        width="18"
                        height="18"
                        alt=""
                      />
                    </span>
                  </div>
                </button>
              </Link>
              <Link href="/profile/pin">
                <button className="btn btn-color " type="button">
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Change PIN</span>
                    <span className="mt-1">
                      <Image
                        src="/arrow-right.svg"
                        width="18"
                        height="18"
                        alt=""
                      />
                    </span>
                  </div>
                </button>
              </Link>
              <button className="btn btn-color fw-bold" type="button">
                Logout
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
