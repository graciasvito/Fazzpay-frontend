import Image from "next/image";
import React from "react";

export default function Aside() {
  return (
    <aside className="aside-container d-flex flex-column justify-content-around ">
      <div className=" ms-lg-4">
        <div className="d-flex">
          <div style={{ width: 30, height: 30 }}>
            <Image
              src="/dashboard.svg"
              width={30}
              height={30}
              layout="responsive"
              alt="dashboard"
            />
          </div>
          <p className="mt-1 ms-3">Dashboard</p>
        </div>
        <div className="d-flex mt-lg-4">
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
        </div>
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
