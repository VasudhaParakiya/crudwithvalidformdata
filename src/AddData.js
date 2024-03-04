import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate, Link } from "react-router-dom";

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

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [hobby, setHobby] = useState([]);
  const [hobbyError, setHobbyError] = useState(false);
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState(false);

  const [contact_no, setContact_no] = useState("");
  const [contactError, setContactError] = useState(false);

  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,12}$/;
  const contactRegex = /^[0-9]{10}$/;

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
          setPassword(foundData.password);
          setCity(foundData.city);
          setContact_no(foundData.contact_no);

          // Set hobbies
          const storedHobbies = foundData.hobby || [];
          setHobby(storedHobbies);

          // Set gender
          const storedGender = foundData.gender;
          setGender(storedGender);
          const gender = document.querySelectorAll('input[type="radio"]');
          gender.forEach((radio) => {
            if (storedGender.includes(radio.value)) {
              radio.checked = true;
            }
          });

          // Check and set the checkbox for each hobby
          const hobbyCheckboxes = document.querySelectorAll(
            'input[type="checkbox"]'
          );
          hobbyCheckboxes.forEach((checkbox) => {
            if (storedHobbies.includes(checkbox.value)) {
              checkbox.checked = true;
            }
          });
        }
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;

    // name
    if (name.length < 6) {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    // email
    if (!email.match(emailRegex)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    // date
    if (dateRegex.test(date)) {
      setDateError(true);
      isValid = false;
    } else {
      setDateError(false);
    }

    // password
    if (password.length < 8 || !passwordRegex.test(password)) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    // city
    if (city === "") {
      setCityError(true);
      isValid = false;
    } else {
      setCityError(false);
    }

    // gender
    if (gender === "") {
      setGenderError(true);
      isValid = false;
    } else {
      setGenderError(false);
    }

    // contact
    if (contact_no === "") {
      setContactError(true);
      isValid = false;
    } else {
      setContactError(false);
    }

    // hobby
    if (hobby.length <= 0) {
      setHobbyError(true);
      isValid = false;
    } else {
      setHobbyError(false);
    }

    if (isValid) {
      if (id) {
        console.log({ id });
        const localData = JSON.parse(localStorage.getItem("userData")) || [];
        console.log({ localData });
        const findDataIndex = localData.findIndex((item) => item.u_id === id);
        const updatedDataItem = {
          u_id,
          name,
          email,
          date,
          password,
          city,
          gender,
          hobby,
          contact_no,
        };
        localData[findDataIndex] = updatedDataItem;
        localStorage.setItem("userData", JSON.stringify(localData));
        navigate("/");                                                                                                                                                                                                                                                                                                                                                                                                                     
      } else {
        if (agree) {
          const newData = {
            u_id,
            name,
            email,
            date,
            password,
            city,
            gender,
            contact_no,
            hobby,
          };
          const localData = JSON.parse(localStorage.getItem("userData")) || [];
          const updatedData = [...localData, newData];
          console.log(updatedData);

          localStorage.setItem("userData", JSON.stringify(updatedData));
          navigate("/");
        } else {
          setAgreeError(true);
        }
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
    !email.match(emailRegex) ? setEmailError(true) : setEmailError(false);
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

  const handlePassword = (e) => {
    let password = e.target.value;
    password.length < 8 || !passwordRegex.test(password)
      ? setPasswordError(true)
      : setPasswordError(false);
    setPassword(password);
  };

  const handleCity = (e) => {
    let city = e.target.value;
    city === "" ? setCityError(true) : setCityError(false);
    setCity(city);
  };

  const handleRadioChange = (e) => {
    let gender = e.target.value;
    gender === "" ? setGenderError(true) : setGenderError(false);
    setGender(gender);
  };

  const handleHobby = (e) => {
    let value = e.target.value;
    let isChecked = e.target.checked;

    if (isChecked === true) {
      setHobby((prev) => [...prev, value]);
    } else {
      const updatedHobby = hobby.filter((hobby) => hobby !== value);
      setHobby(updatedHobby);
    }
  };

  const handleContact = (e) => {
    const value = e.target.value;
    if (!value.match(contactRegex)) {
      setContactError(true);
    } else {
      setContactError(false);
    }
    setContact_no(value);
  };

  const handleAgree = (e) => {
    const isChecked = e.target.checked;
    isChecked ? setAgreeError(false) : setAgreeError(true);
    setAgree(isChecked);
  };

  return (
    <>
      <div className="form">
        <h1 className="mt-5"> Add User</h1>
        <form onSubmit={handleSubmit} className="user-form mt-5">
          {/* name  */}
          <div>
            <label>Name :</label>
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

          {/* email  */}
          <div>
            <label>Email :</label>
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

          {/* dob  */}
          <div>
            <label>DOB :</label>
            <input
              type="date"
              name="dd"
              placeholder="MM/DD/YYYY"
              value={date}
              onChange={handleDate}
            ></input>
            {dateError ? <p style={{ color: "red" }}>invalid date</p> : ""}
          </div>

          {/* password  */}
          <div className="position-relative">
            <label>Password :</label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="password"
              value={password}
              onChange={handlePassword}
            />
            <div
              className="showPass bg-primary px-2 rounded-circle text-light"
              onClick={(e) => setShowPass(true)}
            >
              <i className="bi bi-eye-slash"></i>
            </div>
            {passwordError ? (
              <p style={{ color: "red" }}>
                Password must contain one digit from 1 to 9, one lowercase
                letter, one uppercase letter, one special character, no space,
                and it must be 8-16 characters long.
              </p>
            ) : (
              ""
            )}
          </div>

          {/* city  */}
          <div>
            <label className="fs-4">City : </label>
            <select className="city fs-4" value={city} onChange={handleCity}>
              <option></option>
              <option value={"rajkot"}>Rajkot</option>
              <option value={"surat"}>Surat</option>
              <option value={"ahemdabad"}>Ahemdabad</option>
              <option value={"vadodara"}>Vadodara</option>
            </select>
            {cityError ? (
              <p style={{ color: "red" }}>please select city</p>
            ) : (
              ""
            )}
          </div>

          {/* gender  */}
          <div className="">
            <label className="fs-4">Gender :</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value={"male"}
              onChange={handleRadioChange}
            />
            <label htmlFor="male" className="fs-4">
              {" "}
              Male{" "}
            </label>
            <input
              type="radio"
              name="gender"
              id="female"
              value={"female"}
              onChange={handleRadioChange}
            />
            <label htmlFor="female" className="fs-4">
              Female
            </label>
            <div>
              {genderError ? (
                <p style={{ color: "red" }}>please select gender</p>
              ) : (
                ""
              )}
            </div>
          </div>

          {/* hobby  */}
          <div className=" fs-4">
            <label>Hobby :</label>
            <input
              type="checkbox"
              name="hobby-study"
              value={"study"}
              onChange={handleHobby}
            />
            Study
            <input
              type="checkbox"
              name="hobby-dancing"
              value={"dancing"}
              onChange={handleHobby}
            />
            Dancing
            <input
              type="checkbox"
              name="hobby-singing"
              value={"singing"}
              onChange={handleHobby}
            />
            Singing
            {hobbyError ? (
              <p style={{ color: "red" }}>please select hobby</p>
            ) : (
              ""
            )}
          </div>

          {/* phone no  */}
          <div>
            <label className="fs-4">Phone No.</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={contact_no}
              onChange={handleContact}
            />
            {contactError ? (
              <p style={{ color: "red" }}>invalid mobile number</p>
            ) : (
              ""
            )}
          </div>

          {/* agree  */}
          <div>
            <input
              type="checkbox"
              name="agree"
              value={"agree"}
              onChange={handleAgree}
            />{" "}
            I agree your terms and condition.
            {agreeError ? (
              <p style={{ color: "red" }}>please accept terms and condition</p>
            ) : (
              ""
            )}
          </div>

          {/* add || update */}
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="border-0 px-5 py-2 rounded-3 text-light fs-4 bg-primary"
            >
              {id ? "update" : "add"}
            </button>
            <Link
              to="/"
              className="px-5 py-3 rounded-3 text-light fs-4 bg-primary text-decoration-none"
            >
              Back{" "}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}