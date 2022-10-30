import React, { useEffect, useState } from "react";

import { getDataUser } from "stores/action/user";
import { useDispatch } from "react-redux";

export default function Ngetes() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    dispatch(getDataUser()).then((res) => {
      setData(res.value.data.data);
    });
  };
  console.log(data);

  return <div>Ngetes</div>;
}
