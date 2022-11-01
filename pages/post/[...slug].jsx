import React from "react";

import { useRouter } from "next/router";

export default function PostPage() {
  const router = useRouter();
  router.query.slug[0];
  return (
    <div>
      <h1>Post Page</h1>
    </div>
  );
}
