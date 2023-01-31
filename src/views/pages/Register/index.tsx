import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import capcha from "./CAPTCHA.png";
import Logo from "./Logo";
import { SingUPStyle } from "./style";
import { useFormik } from "formik";
import * as Yup from "yup";
import Style from "./style.module.css";
import clsx from "clsx";
import { Checkbox } from "antd";
import AuthAPI from "../../../api/AuthAPI";
import { Select } from "antd";
import {
  CaretDownOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import "./style.css";
import CountryCode from "./CountryCode";
import ReCAPTCHA from "react-google-recaptcha";
import config from "@Config/app.config";
const SingUP = () => {
  const navigate = useNavigate();
  const [userExist, SetUserExist] = useState(false);
  const [userExistMessage, SetUserExistMessage] = useState("");
  const [countryPhoneCode, setCountryPhoneCode] = useState("");
  const [reCaptcha, setReCaptcha] = useState(false);
  const [eyepassowrd, setEyePassword] = useState(false);
  const [eyeConfirmpassowrd, setEyeConfirmPassword] = useState(false);

  const handleReactCaptcha = (value: any) => {
    //console.log("Captcha value:", value);
    setReCaptcha(true);
  };

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
      country_code: "",
      mobile: "",
      avatar_unique_name: "",
      is_18_year_old: false,
      is_agree_to_termsandconditions: false,
      is_not_robot: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email not valid")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirm_password: Yup.string()
        .required("Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      name: Yup.string()
        .required("Name is required")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
      mobile: Yup.string()
        .required("Telephone Number is Required")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid",
        ),
      avatar_unique_name: Yup.string().required("Avatar Name is required."),
      is_agree_to_termsandconditions: Yup.boolean().oneOf(
        [true],
        "You must accept the terms & condition and privacy policy.",
      ),
      is_18_year_old: Yup.boolean().oneOf(
        [true],
        "You should be at least 18 years old or above.",
      ),
    }),
    onSubmit: (values) => {
      values.country_code = countryPhoneCode;
      AuthAPI.signUp(values)
        .then((res) => {
          if (res.data.success) {
            navigate("/login", {
              state: {
                message:
                  "Thank you for filling out your information! Please login",
              },
            });
          } else {
            SetUserExist(true);
            SetUserExistMessage(res.data.message + ", Please login");
          }
        })
        .catch(function (error) {
          // setLoader(false)
          console.log("error ", error);
        });
    },
  });

  return (
    <div style={SingUPStyle.app as React.CSSProperties}>
      <Logo />
      <div style={SingUPStyle.windows as React.CSSProperties}>
        <div
          style={SingUPStyle.block as React.CSSProperties}
          className="pt-1 xl:pt-5"
        >
          <h1 style={SingUPStyle.login as React.CSSProperties} className="pb-2">
            SIGNUP
          </h1>
          <div style={SingUPStyle.QRegister as React.CSSProperties}>
            <p className="text-white">Already have an account? Login </p>
            <Link style={{ color: "#23edfc" }} to="/login">
              here
            </Link>
          </div>
          <div>
            {userExist && <h3 style={{ color: "red" }}>{userExistMessage}</h3>}
          </div>
          <div style={SingUPStyle.container as React.CSSProperties}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      paddingRight: "30px",
                      borderRight: "2px solid #fff",
                    }}
                  >
                    <div style={SingUPStyle.input as React.CSSProperties}>
                      <h5 className="text-white">E-MAIL ADDRESS</h5>
                      <input
                        style={SingUPStyle.form as React.CSSProperties}
                        name="email"
                        id="email"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.email}
                        className="bg-[#2e2e2e]"
                      />
                      {validation.touched.email && validation.errors.email && (
                        <div className="text-red-500">
                          {validation.errors.email}
                        </div>
                      )}
                    </div>
                    <div
                      style={SingUPStyle.input2 as React.CSSProperties}
                      className="mt-2 xl:mt-6"
                    >
                      <h5 className="text-white">PASSWORD</h5>
                      <div className="flex">
                        <input
                          style={SingUPStyle.form as React.CSSProperties}
                          name="password"
                          id="password"
                          type={!eyepassowrd ? "Password" : "text"}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password}
                        />
                        {!eyepassowrd ? (
                          <span
                            onClick={() => {
                              setEyePassword(true);
                            }}
                          >
                            <EyeOutlined
                              style={{
                                color: "white",
                                marginLeft: "-25px",
                                marginTop: "25px",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          </span>
                        ) : (
                          <span
                            onClick={() => {
                              setEyePassword(false);
                            }}
                          >
                            <EyeInvisibleOutlined
                              style={{
                                color: "white",
                                marginLeft: "-25px",
                                marginTop: "25px",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          </span>
                        )}
                      </div>
                      {validation.touched.password &&
                        validation.errors.password && (
                          <div className="text-red-500">
                            {validation.errors.password}
                          </div>
                        )}
                    </div>
                    <div
                      style={SingUPStyle.input2 as React.CSSProperties}
                      className="mt-2 xl:mt-6"
                    >
                      <h5 className="text-white">REPEAT PASSWORD</h5>
                      <div className="flex">
                        <input
                          style={SingUPStyle.form as React.CSSProperties}
                          name="confirm_password"
                          id="confirm_password"
                          type={!eyeConfirmpassowrd ? "Password" : "text"}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.confirm_password}
                        />
                        {!eyeConfirmpassowrd ? (
                          <span
                            onClick={() => {
                              setEyeConfirmPassword(true);
                            }}
                          >
                            <EyeOutlined
                              style={{
                                color: "white",
                                marginLeft: "-25px",
                                marginTop: "25px",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          </span>
                        ) : (
                          <span
                            onClick={() => {
                              setEyeConfirmPassword(false);
                            }}
                          >
                            <EyeInvisibleOutlined
                              style={{
                                color: "white",
                                marginLeft: "-25px",
                                marginTop: "25px",
                                position: "relative",
                                zIndex: "2",
                              }}
                            />
                          </span>
                        )}
                      </div>
                      {validation.touched.confirm_password &&
                        validation.errors.confirm_password && (
                          <div className="text-red-500">
                            {validation.errors.confirm_password}
                          </div>
                        )}
                    </div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      paddingLeft: "30px",
                    }}
                  >
                    <div style={SingUPStyle.input as React.CSSProperties}>
                      <h5 className="text-white">FULL NAME</h5>
                      <input
                        style={SingUPStyle.form as React.CSSProperties}
                        name="name"
                        id="name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name}
                      />
                      {validation.touched.name && validation.errors.name && (
                        <div className="text-red-500">
                          {validation.errors.name}
                        </div>
                      )}
                    </div>
                    <div
                      style={SingUPStyle.input2 as React.CSSProperties}
                      className="mt-2 xl:mt-6"
                    >
                      <h5 className="text-white">TELEPHONE NUMBER</h5>
                      <div className="border-l-[5px] h-[40px] border-primary-green flex mt-[1rem]">
                        <Select
                          showSearch
                          bordered={false}
                          defaultValue="+66"
                          className="w-[150px] bg-[#1E1E1E] text-white py-1.5"
                          suffixIcon={
                            <CaretDownOutlined className="w-3 h-3 text-white text-[10px]" />
                          }
                        >
                          {CountryCode.map((value: any) => {
                            return (
                              <Select.Option
                                value={value.name}
                                className="flex gap-1 items-center"
                              >
                                <img
                                  src={value.image}
                                  alt={value.name}
                                  className="w-5 h-5"
                                />
                                <p
                                  onClick={() => {
                                    setCountryPhoneCode(value.dial_code);
                                  }}
                                >
                                  ({value.dial_code}) ({value.code})
                                </p>
                              </Select.Option>
                            );
                          })}
                        </Select>
                        <input
                          style={SingUPStyle.form2 as React.CSSProperties}
                          name="mobile"
                          id="mobile"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobile}
                        />
                      </div>
                      {validation.touched.mobile &&
                        validation.errors.mobile && (
                          <div className="text-red-500">
                            {validation.errors.mobile}
                          </div>
                        )}
                    </div>
                    <div
                      style={SingUPStyle.input2 as React.CSSProperties}
                      className="mt-2 xl:mt-6"
                    >
                      <h5 className="text-white">AVATAR NAME</h5>
                      <input
                        style={SingUPStyle.form as React.CSSProperties}
                        name="avatar_unique_name"
                        id="avatar_unique_name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.avatar_unique_name}
                      />
                      {validation.touched.avatar_unique_name &&
                        validation.errors.avatar_unique_name && (
                          <div className="text-red-500">
                            {validation.errors.avatar_unique_name}
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    margin: "20px 0px 20px 0px",
                    gridGap: "60px",
                  }}
                >
                  <div>
                    <div style={SingUPStyle.checkbox as React.CSSProperties}>
                      <div
                        className={clsx(
                          " border-2 border-primary-sky w-[30px] h-[30px] flex items-center rounded-sm",
                          Style.box,
                        )}
                      >
                        <input
                          type="checkbox"
                          name="is_agree_to_termsandconditions"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          className={clsx(
                            Style.checkbox,
                            "w-[30px] h-[30px] bg-[#0d1518] rounded-sm",
                          )}
                        />
                      </div>
                      <label
                        style={SingUPStyle.remember2 as React.CSSProperties}
                        className="text-white"
                      >
                        I agree to Terms & Condition and Privacy Policy
                      </label>
                    </div>
                    {validation.touched.is_agree_to_termsandconditions &&
                      validation.errors.is_agree_to_termsandconditions && (
                        <div className="text-red-500">
                          {validation.errors.is_agree_to_termsandconditions}
                        </div>
                      )}
                    <div style={SingUPStyle.checkbox as React.CSSProperties}>
                      <div
                        className={clsx(
                          " border-2 border-primary-sky w-[30px] h-[30px] flex items-center rounded-sm",
                          Style.box,
                        )}
                      >
                        <input
                          type="checkbox"
                          name="is_18_year_old"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          // value={validation.values.is_18_year_old}
                          className={clsx(
                            Style.checkbox,
                            "w-[30px] h-[30px] bg-[#0d1518] rounded-sm",
                          )}
                        />
                      </div>
                      <label
                        style={SingUPStyle.remember2 as React.CSSProperties}
                        className="text-white"
                      >
                        I am 18 years old or above
                      </label>
                    </div>
                    {validation.touched.is_18_year_old &&
                      validation.errors.is_18_year_old && (
                        <div className="text-red-500">
                          {validation.errors.is_18_year_old}
                        </div>
                      )}
                  </div>
                  <div
                    style={{
                      background: "#222222",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px",
                    }}
                  >
                    <div style={SingUPStyle.checkbox as React.CSSProperties}>
                      <div
                        className={clsx(
                          " border-2 border-primary-sky w-[30px] h-[30px] flex items-center rounded-sm",
                          Style.box,
                        )}
                      >
                        <input
                          type="checkbox"
                          name="is_not_robot"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.is_not_robot}
                          className={clsx(
                            Style.checkbox,
                            "w-[30px] h-[30px] bg-[#0d1518] rounded-sm ",
                          )}
                        />
                      </div>
                      <label
                        style={SingUPStyle.remember2 as React.CSSProperties}
                        className="text-white"
                      >
                        I am not a robot
                      </label>
                    </div>
                    {/* <ReCAPTCHA
                  sitekey="6Lemh-oiAAAAAEHBUz9MtwKc66ltJPZOf3sNDppF"
                  theme='dark'
                  onChange={handleReactCaptcha}
                  /> */}
                    <img src={capcha} alt="logo" />
                  </div>
                </div>
                {/* <button
              disabled={!reCaptcha ? true : false}
                type="submit"
                className = {clsx("bg-primary-sky/30 w-100 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg",
                reCaptcha ? "cursor-pointer" : "opacity-50 cursor-not-allowed")}
              >
               
               <a href="/OTP" style={{ color: '#fff', fontWeight: 'bold' }}>
                  SIGN UP
                  </a>
              </button> */}
                <button
                  type="submit"
                  className={clsx(
                    "bg-primary-sky/30 w-100 h-16 text-white font-bold rounded-sm border-2 border-primary-sky uppercase text-lg",
                  )}
                >
                  <a href="/OTP" style={{ color: "#fff", fontWeight: "bold" }}>
                    SIGN UP
                  </a>
                </button>
              </div>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default SingUP;
