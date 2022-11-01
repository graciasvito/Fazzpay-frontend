// import React, { useEffect } from "react";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import axiosClient from "utils/axios";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   responsive: true,
//   plugins: {
//     //   legend: {
//     //     position: 'top' as const,
//     //   },
//     title: {
//       display: true,
//       text: "",
//     },
//   },
// };

// export const dataDashboard = async () => {
//   const result = await axiosClient.get(
//     "/dashboard/fce5d0fa-4ba0-468c-98fa-d757bef2e89b"
//   );
//   const income = result.data.data.listIncome.map((item) => {
//     return item.total;
//   });
//   const expense = result.data.data.listExpense.map((item) => {
//     return item.total;
//   });
//   const day = result.data.data.listExpense.map((item) => {
//     return item.day;
//   });

//   income, expense;
//   data.datasets[0].data = income;
//   data.datasets[1].data = expense;
//   data.labels = day;

//   data.datasets[0].data;
// };

// export const data = {
//   labels: [],
//   datasets: [
//     {
//       label: "Income",
//       data: [],
//       backgroundColor: "rgba(8, 255, 58, 0.5)",
//     },
//     {
//       label: "Expense",
//       data: [],
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//   ],
// };

// export default function Chart() {
//   useEffect(() => {
//     dataDashboard();
//   }, []);
//   return (
//     <div className="container text-center">
//       <Bar options={options} data={data} />;
//     </div>
//   );
// }
