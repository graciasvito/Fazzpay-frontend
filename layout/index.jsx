import React from "react";
import Header from "components/header";
import Head from "next/head";
import Footer from "components/footer";
import Aside from "components/aside";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>FazzPay App || {props.title}</title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section className="container layout-section-container">
        <Aside />
        <main className="right-section-container ms-sm-5">
          {props.children}
        </main>
      </section>

      <Footer />
    </>
  );
}
