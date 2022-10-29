import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";

export default function LandingPage() {
  const Router = useRouter();

  const token = Cookies.get("token");

  if (token.length < 1) {
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
