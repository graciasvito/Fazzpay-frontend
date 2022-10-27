import React from "react";
import Image from "next/image";

export default function LeftContainer() {
  return (
    <>
      <div className="col-7 auth-container">
        <div className="auth-text">
          <h5 className="text-white fw-bold">FazzPay</h5>
        </div>
        <div className="auth-left-container ">
          <div className="col-md-auto image-container ">
            <div style={{ width: 500, height: 550 }}>
              <Image
                src="/Phone Auth.png"
                width={500}
                height={550}
                layout="responsive"
                alt="auth left image"
                priority
              />
            </div>
          </div>
        </div>
        <div className="auth-text">
          <h5 className="text-white fw-bold">
            App that Covering Banking Needs.
          </h5>
        </div>
        <div className="">
          <p className="text-white auth-description">
            FazzPay is an application that focussing in banking needs for all
            users in the world. Always updated and always following world
            trends. 5000+ users registered in FazzPay everyday with worldwide
            users coverage.
          </p>
        </div>
      </div>
    </>
  );
}
