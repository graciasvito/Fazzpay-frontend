import React from "react";
import { useRouter } from "next/router";
// import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const handleHome = () => {
    router.push("/home");
  };

  return (
    <div className="d-md-inline d-none">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" onClick={handleHome}>
            FazzPay
          </a>

          <div className="d-flex align-items-center">
            <div style={{ width: 50, height: 50 }}>
              <Image
                src="/profile.png"
                width={50}
                height={50}
                layout="responsive"
                alt="profile picture"
              />
            </div>
            <div className="ms-3 mt-3">
              <p className="fw-bold">Robert Chandler</p>
              <p>+62812345678</p>
            </div>
            <div style={{ width: 20, height: 20 }} className="ms-4">
              <Image
                src="/notifications-outline.svg"
                width={20}
                height={20}
                layout="responsive"
                alt="notification"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
