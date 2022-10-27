import React from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
import Image from "next/image";

export default function Header() {
  // const router = useRouter();
  // const handleLogout = () => {
  //   router.push("/");
  // };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <a class="navbar-brand fw-bold text-primary" href="#">
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
