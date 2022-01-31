import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        getData();
        console.log(token);
      }
    }
  }, []);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:3000/raw", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      setData(response.json());
    } catch (err) {
      console.log(err);
    }
  };

  const Row = (item) => {
    return (
      <tr key={item.student_id}>
        <td>{item.name}</td>
        <td>{item.univeristy}</td>
        <td>{item.mark}</td>
      </tr>
    );
  };

  return (
    <table>
      <caption>Student Data</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Student Id</th>
          <th>University</th>
          <th>Marks</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return <Row item={item} />;
        })}
      </tbody>
    </table>
  );
};

export default Dashboard;
