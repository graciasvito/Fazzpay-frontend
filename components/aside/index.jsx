import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Aside() {
  const Router = useRouter();

  const handleDashboard = () => {
    Router.push("/home");
  };

  const handleTransfer = () => {
    Router.push("/transfer/search");
  };

  return (
    <aside className="aside-container d-flex flex-column justify-content-around ">
      <div className=" ms-lg-4">
        <a className="d-flex" onClick={handleDashboard}>
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/dashboard.png"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>
          <p className="mt-1 ms-3">Dashboard</p>
        </a>
        <a className="d-flex mt-lg-4" onClick={handleTransfer}>
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/arrow-up.svg"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>
          <p className="mt-1 ms-3">Transfer</p>
        </a>
        <div className="d-flex mt-lg-4">
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/add.svg"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>
          <p className="mt-1 ms-3">Top Up</p>
        </div>
        <div className="d-flex mt-lg-4">
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/person.svg"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>
          <p className="mt-1 ms-3">Profile</p>
        </div>
      </div>
      <div className="ms-lg-4 ">
        <div className="d-flex ">
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/logout.svg"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>
          <p className="mt-1 ms-3">Logout</p>
        </div>
      </div>
    </aside>
  );
}
