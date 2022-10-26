import React from "react";
import Layout from "layout";
import Image from "next/image";

export default function HandleImage() {
  return (
    <Layout>
      <div className="text-center">
        <h1>Handle Image with next/image</h1>
        <div style={{ width: 300, height: 300, border: "1px solid black" }}>
          <Image
            src="/Background.jpg"
            width={400}
            height={100}
            layout="responsive"
            alt="background"
          />
        </div>
      </div>
    </Layout>
  );
}
