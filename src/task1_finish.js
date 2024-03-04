// AddData.js 

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";

export default function AddData() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const unique_id = uuidv4();
  const u_id = unique_id.slice(0, 8);

 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
  

  useEffect(() => {
    if (id) {
      console.log("updated");

      // const localStorageData = localStorage.getItem("userData");
      const storedData = JSON.parse(localStorage.getItem("userData") || []);
      if (storedData) {
        const foundData = storedData.find((item) => item.u_id === id);
        console.log("foundData", foundData);
        if (foundData) {
          setName(foundData.name);
          setEmail(foundData.email);
          setDate(foundData.date);
        }
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // name
    let nameValue = e.target[0].value;
    if (nameValue.length < 6) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    // email
    let emailValue = e.target[1].value;
    if (!emailValue.match(emailRegex)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    // date
    let dateValue = e.target[2].value;
    if (dateRegex.test(dateValue)) {
      setDateError(true);
      isValid = false;
    } else {
      setDateError(false);
    }

    if (isValid) {
      if (id) {
        console.log({ id });
        const localData = JSON.parse(localStorage.getItem("userData")) || [];
        console.log({ localData });
        const findDataIndex = localData.findIndex((item) => item.u_id === id);
        const updatedDataItem = { u_id, name, email, date };
        localData[findDataIndex] = updatedDataItem;
        localStorage.setItem("userData", JSON.stringify(localData));
        navigate("/");
      } else {
        const newData = { u_id, name, email, date };
        const localData = JSON.parse(localStorage.getItem("userData")) || [];
        const updatedData = [...localData, newData];
        console.log(updatedData);

        localStorage.setItem("userData", JSON.stringify(updatedData));
        navigate("/");
      }
    }
  };

  const handleName = (e) => {
    let name = e.target.value;
    if (name.length < 6) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    setName(name);
  };

  const handleEmail = (e) => {
    let email = e.target.value;
    if (!email.match(emailRegex)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    setEmail(email);
  };

  const handleDate = (e) => {
    let date = e.target.value;
    if (dateRegex.test(date)) {
      setDateError(true);
    } else {
      setDateError(false);
    }
    setDate(date);
  };

  return (
    <>
      <div className="form">
        <h1 className="mt-5"> Add User</h1>
        <form onSubmit={handleSubmit} className="user-form mt-5">
          <div>
            <input
              type="text"
              name="text"
              placeholder="enter your name"
              value={name}
              onChange={handleName}
              
            ></input>
            {nameError ? (
              <p style={{ color: "red" }}>name length must be 6 character</p>
            ) : (
              ""
            )}
          </div>

          <div>
            <input
              type="text"
              name="email"
              placeholder="enter your email"
              value={email}
              onChange={handleEmail}
              //   onChange={(e) => setEmail(e.target.value)}
            ></input>
            {emailError ? <p style={{ color: "red" }}>invalid email</p> : ""}
          </div>

          <div>
            <input
              type="date"
              name="dd"
              placeholder="MM/DD/YYYY"
              value={date}
              onChange={handleDate}
              
            ></input>
            {dateError ? <p style={{ color: "red" }}>invalid date</p> : ""}
          </div>
         

          <div className="text-center">
            <button
              type="submit"
              className="border-0 px-5 py-2 rounded-3 text-light fs-4 bg-primary"
            >
              {id ? "update" : "add"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
