import axiosClient from "utils/axios";

export const getDataUser = () => {
  return {
    type: "GET_USER_BY",
    payload: axiosClient.get(`user?page=1&limit=4&search=&sort=firstName ASC`),
  };
};
