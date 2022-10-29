import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";

export default function landingPage() {
  const Router = useRouter();

  if (Cookies.get("token").length < 1) {
    Router.push("/auth/login");
  } else {
    Router.push("/home");
  }

  return (
    <div>
      <h1>Landing Page</h1>
    </div>
  );
}
