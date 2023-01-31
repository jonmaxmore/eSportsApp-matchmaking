import React, { useEffect, useState, useRef } from "react";
import { Modal, Select } from "antd";
import { Menu, Input, Switch } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import "./styles.css";
import "antd/dist/antd.css";
import clsx from "clsx";
import UserAPI from "@api/UserAPI";
import { FormFeedback } from "reactstrap";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import DeleteAccount from "./DeleteAccount";
import { useNavigate } from "react-router-dom";
import { Token } from "../../../Token";

interface Props {
  User: {
    avtarName: "";
    email: "";
    defaultLang: "EN";
  };
  ActivePop: (value: any) => void;
}

const Setting = ({ User, ActivePop }: Props) => {
  //   const Menuse = (
  //     <Menu>
  //       <Menu.Item key="0">
  //         <a>English</a>
  //       </Menu.Item>
  //       <Menu.Item key="1">
  //         <a>Thai</a>
  //       </Menu.Item>
  //     </Menu>
  //   );

  const navigate = useNavigate();
  const [AvatarName, setAvatarName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [languageValidationMessage, setLanguageValidationMessage] =
    useState("");
  const [Language, setLanguage] = useState("");
  const [userMobileTabLoginSwitch, setUserMobileTabLoginSwitch] =
    useState(false);
  const [validationMsg, setValidationMsg] = useState({
    avtarName: "",
    email: "",
    password: "",
  });
  const [avatarNameSuccess, setAvatarNameSuccess] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [deleteAccountPopup, setDeleteAccountPopup] = useState(false);
  const [deleteValidationMsg, setDeleteValidationMsg] = useState("");

  const [editName, setEditName] = useState(true);
  const [editEmail, setEditEmail] = useState(true);
  const [editPassword, setEditPassword] = useState(true);
  const InputName: any = useRef();
  const InputEmail: any = useRef();
  const InputPassword: any = useRef();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    UserAPI.getUserDetail()
      .then((res) => {
        if (res.data.success) {
          setAvatarName(res.data.user.avatar_unique_name);
          setEmail(res.data.user.email);
          setPassword(res.data.user.password);
          setLanguage(res.data.user.default_lang);
          setUserMobileTabLoginSwitch(res.data.user.is_mob_tab_login);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // User Avatar Form Validation
  const updateAvatarName = () => {
    let validationMsg: any = {};
    if (InputName.current.input.value === "") {
      setAvatarNameSuccess("");
      validationMsg.avtarName = "Avatar name is required.";
      setValidationMsg(validationMsg);
      return true;
    } else {
      setAvatarNameSuccess("");
      validationMsg.avtarName = "";
      setValidationMsg(validationMsg);
      const data = {
        avatar_name: InputName.current.input.value,
      };
      UserAPI.updateUserAvatarName(data)
        .then((res) => {
          if (res.data.success) {
            setEditName(true);
            setAvatarNameSuccess("Avatar name updated.");
          } else {
            validationMsg.avtarName = "Avatar name has already been taken.";
            setValidationMsg(validationMsg);
          }
        })
        .catch(function (error) {
          console.log("error ", error);
        });
    }
  };

  // User Email Form Validation
  const updateEmail = () => {
    let validationMsg: any = { email: "" };
    setValidationMsg(validationMsg);
    setEmailSuccess("");
    if (InputEmail.current.input.value === "") {
      validationMsg.email = "Email address is required.";
      setValidationMsg(validationMsg);
      return true;
    } else {
      const data = {
        email: InputEmail.current.input.value,
      };
      UserAPI.updateUserEmail(data)
        .then((res) => {
          if (res.data.success) {
            setEditEmail(true);
            setEmailSuccess("Email address updated.");
          } else {
            validationMsg.email = "Email address has already been taken.";
            setValidationMsg(validationMsg);
          }
        })
        .catch(function (error) {
          console.log("error ", error);
        });
    }
  };

  // User Password validation
  const updatePassword = () => {
    let validationMsg: any = { password: "" };
    setValidationMsg(validationMsg);
    setEmailSuccess("");
    if (InputPassword.current.input.value === "") {
      setPasswordSuccess("");
      validationMsg.password = "Password is required.";
      setValidationMsg(validationMsg);
      return true;
    } else {
      const data = {
        password: InputPassword.current.input.value,
      };
      UserAPI.updateUserPassword(data)
        .then((res) => {
          if (res.data.success) {
            // setPasswordValidationMessage(res.data.message);
            setEditPassword(true);
            setPasswordSuccess("Password updated");
          } else {
            // setPasswordValidationMessage(res.data.message);
          }
        })
        .catch(function (error) {
          console.log("error ", error);
        });
    }
  };

  // User User Language Form
  const updateLanguage = (language: any) => {
    const data = {
      language: language,
    };
    UserAPI.updateUserLanguage(data)
      .then((res) => {
        setLanguageValidationMessage("Language updated.");
        setLanguage(data.language);
      })
      .catch(function (error) {
        console.log("error ", error);
      });
  };

  // User Mobile Tab Login Function
  function onUserMobileTabLoginChange(checked: any) {
    const data = {
      status: checked,
    };
    UserAPI.updateUserMobileTabLoginStatus(data)
      .then((res) => {
        // setUserMobileTabLoginSwitch(checked);
      })
      .catch(function (error) {
        console.log("error ", error);
      });
  }

  const onDeleteAcount = (avtarName: string) => {
    if (avtarName !== "") {
      const payload = {
        avatarName: avtarName,
      };
      UserAPI.deleteUserAccount(payload)
        .then((res) => {
          if (res.data.success) {
            setDeleteAccountPopup(false);
            Token.clearStorage();
            navigate("/login");
          } else {
            setDeleteValidationMsg("Please enter valid avatar name.");
          }
        })
        .catch(function (error) {
          console.log("error ", error);
        });
    } else {
      setDeleteValidationMsg("Enter avatar name.");
      return true;
    }
  };

  const ArrowDown = () => {
    return <CaretDownOutlined className=" text-white text-lg" />;
  };

  const ActiveEditName = () => {
    if (editName === true) {
      return (
        <div
          className=" w-[120px] h-full border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer"
          onClick={(e) => {
            setEditName(false);
            InputName.current?.focus({ preventScroll: false });
          }}
        >
          <p className="flex items-center text-center text-[#fff] text-base font-bold ">
            EDIT
          </p>
        </div>
      );
    } else {
      return (
        <div className="w-[120px] h-full flex justify-end items-center">
          <div
            className="w-[40px] h-full bg-[#2e2e2e] border-2 border-[#6bb8e7] flex justify-center items-center rounded-md cursor-pointer mx-4"
            onClick={(e) => {
              setEditName(true);
              InputName.current?.focus({ preventScroll: false });
            }}
          >
            <XIcon className="w-[20px] h-[20px] text-[#787878]" />
          </div>
          <div
            className="w-[40px] h-full bg-[#253d4c] border-2 border-[#6bb8e7] flex justify-center items-center rounded-md cursor-pointer"
            onClick={(e) => {
              // setEditName(true)
              updateAvatarName();
              InputName.current?.focus({ preventScroll: false });
            }}
          >
            <CheckIcon
              // onClick={() => updateAvatarName()}
              className="w-[20px] h-[20px] text-[#fff]"
            />
          </div>
        </div>
      );
    }
  };

  const ActiveEditEmail = () => {
    if (editEmail === true) {
      return (
        <div
          className=" w-[120px] h-full border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer"
          onClick={(e) => {
            setEditEmail(false);
            InputEmail.current?.focus({ preventScroll: false });
          }}
        >
          <p className="flex items-center text-center text-[#fff] text-base font-bold ">
            CHANGE
          </p>
        </div>
      );
    } else {
      return (
        <div className="w-[120px] h-full flex justify-end items-center">
          <div
            className="w-[40px] h-full bg-[#2e2e2e] border-2 border-[#6bb8e7] flex justify-center items-center rounded-md cursor-pointer mx-4"
            onClick={(e) => {
              setEditEmail(true);
              InputEmail.current?.focus({ preventScroll: false });
            }}
          >
            <XIcon className="w-[20px] h-[20px] text-[#787878]" />
          </div>
          <div
            className="w-[40px] h-full bg-[#253d4c] border-2 border-[#6bb8e7] flex justify-center items-center rounded-md cursor-pointer"
            onClick={(e) => {
              updateEmail();
              InputEmail.current?.focus({ preventScroll: false });
            }}
          >
            <CheckIcon
              // onClick={() => updateEmail()}
              className="w-[20px] h-[20px] text-[#fff]"
            />
          </div>
        </div>
      );
    }
  };

  const ActiveEditPassword = () => {
    if (editPassword === true) {
      return (
        <div
          className=" w-[120px] h-full border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer"
          onClick={(e) => {
            setEditPassword(false);
            InputPassword.current?.focus({ preventScroll: false });
          }}
        >
          <p className="flex items-center text-center text-[#fff] text-base font-bold ">
            CHANGE
          </p>
        </div>
      );
    } else {
      return (
        <div className="w-[120px] h-full flex justify-end items-center">
          <div
            className="w-[40px] h-full bg-[#2e2e2e] border-2 border-[#6bb8e7] flex justify-center items-center rounded-md cursor-pointer mx-4"
            onClick={(e) => {
              setEditPassword(true);
              InputPassword.current?.focus({ preventScroll: false });
            }}
          >
            <XIcon className="w-[20px] h-[20px] text-[#787878]" />
          </div>
          <div
            className="w-[40px] h-full bg-[#253d4c] border-2 border-[#6bb8e7] flex justify-center items-center rounded-md cursor-pointer"
            onClick={(e) => {
              updatePassword();
              InputPassword.current?.focus({ preventScroll: false });
            }}
          >
            <CheckIcon
              // onClick={ () => updatePassword() }
              className="w-[20px] h-[20px] text-[#fff]"
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-full bg-[#0c191c] ">
      <div
        className="w-full py-6 border-l-4 border-[#94bd4b] flex items-center justify-items-center text-center
                bg-gradient-to-r from-[#11323f] to-[#0d212a]"
      >
        <p className="pl-6 text-[#fff] text-base font-semibold">
          ACCOUNT SETTINGS
        </p>
      </div>
      <div className="w-full px-12">
        <p className=" mt-6  text-[#fff] text-base font-semibold">
          AVATAR NAME
        </p>
        <div className=" mt-2 w-full wide:w-2/3 h-[40px] border-l-4 border-[#94bd4b] inputDis flex items-center justify-between text-center bg-[#2e2e2e]">
          <Input
            className=" text-[#fff] bg-[#2e2e2e]  text-base font-normal h-full "
            ref={(ref) => {
              InputName.current = ref as Input;
            }}
            disabled={editName}
            bordered={false}
            onChange={(value) => {
              setAvatarName(value.target.value);
            }}
            onPressEnter={() => {
              setEditName(true);
              InputName.current?.blur();
            }}
            value={AvatarName}
          />
          <div className={clsx(editName === true ? "h-full" : "h-full")}>
            <ActiveEditName />
          </div>
        </div>
        {validationMsg.avtarName && (
          <FormFeedback type="valid" style={{ marginLeft: "0%", color: "red" }}>
            {validationMsg.avtarName}
          </FormFeedback>
        )}
        {avatarNameSuccess && (
          <FormFeedback
            type="valid"
            style={{ marginLeft: "0%", color: "green" }}
          >
            {avatarNameSuccess}
          </FormFeedback>
        )}
        <p className=" mt-6 text-[#fff] text-base font-semibold">
          E-MAIL ADDRESS
        </p>
        <div className=" mt-2  w-full wide:w-2/3 h-[40px] border-l-4 border-[#94bd4b] flex inputDis items-center justify-between text-center bg-[#2e2e2e]">
          <Input
            className=" text-[#fff] bg-[#2e2e2e]  text-base font-normal h-full "
            ref={(ref) => {
              InputEmail.current = ref as Input;
            }}
            disabled={editEmail}
            bordered={false}
            onChange={(value) => {
              setEmail(value.target.value);
            }}
            onPressEnter={() => {
              setEditEmail(true);
              InputEmail.current?.blur();
            }}
            value={Email}
          />
          <div className={clsx(editEmail === true ? "h-full" : "h-full")}>
            <ActiveEditEmail />
          </div>
        </div>
        {validationMsg.email && (
          <FormFeedback type="valid" style={{ marginLeft: "0%", color: "red" }}>
            {validationMsg.email}
          </FormFeedback>
        )}
        {emailSuccess && (
          <FormFeedback
            type="valid"
            style={{ marginLeft: "0%", color: "green" }}
          >
            {emailSuccess}
          </FormFeedback>
        )}

        <p className=" mt-6 text-[#fff] text-base font-semibold ">PASSWORD</p>
        <div className=" mt-2  w-full wide:w-2/3 h-[40px] border-l-4 border-[#94bd4b] flex items-center justify-between  inputDis text-center bg-[#2e2e2e]">
          <Input
            className=" text-[#fff] bg-[#2e2e2e]  text-base font-normal h-full "
            ref={(ref) => {
              InputPassword.current = ref as Input;
            }}
            disabled={editPassword}
            bordered={false}
            onChange={(value) => {
              setPassword(value.target.value);
            }}
            onPressEnter={() => {
              setEditPassword(true);
              InputPassword.current?.blur();
            }}
            type="password"
            // value={Password}
          />
          <div className={clsx(editPassword === true ? "h-full" : "h-full")}>
            <ActiveEditPassword />
          </div>
        </div>
        {validationMsg.password && (
          <FormFeedback type="valid" style={{ marginLeft: "0%", color: "red" }}>
            {validationMsg.password}
          </FormFeedback>
        )}
        {passwordSuccess && (
          <FormFeedback
            type="valid"
            style={{ marginLeft: "0%", color: "green" }}
          >
            {passwordSuccess}
          </FormFeedback>
        )}

        <p className=" mt-6 text-[#fff] text-base font-semibold">LANGUAGE</p>
        <div className=" mt-2  w-full wide:w-2/3 h-[40px]  flex Selecter">
          <Select
            style={{
              width: "100%",
              color: "#fff",
              borderRadius: "0px",
              height: "40px",
            }}
            className="Selecter  border-y-0 border-r-0 border-l-4 border-primary-green "
            suffixIcon={<ArrowDown />}
            placeholder="Select a language"
            dropdownClassName="rounded-none bg-[#2e2e2e] text-white"
            onChange={(value) => updateLanguage(value)}
            value={Language}
          >
            <Select.Option value="Th" className="text-white hover:text-black">
              Thai
            </Select.Option>
            <Select.Option value="En" className="text-white hover:text-black">
              English
            </Select.Option>
          </Select>
        </div>
        <FormFeedback type="valid" style={{ marginLeft: "0%", color: "green" }}>
          {languageValidationMessage}
        </FormFeedback>

        <div className="flex justify-between border-t-2 mt-6 border-[#333a3c]">
          <p className=" mt-10 text-[#fff] text-base font-semibold ">
            ALLOW LOGIN
          </p>
          <div className="flex items-center justify-center mt-10 check">
            <Switch
              defaultChecked={userMobileTabLoginSwitch}
              onChange={onUserMobileTabLoginChange}
              className="bg-[#989898] "
            />
          </div>
        </div>
        <p className=" mt-3  text-[#efeff0] text-base  border-b-2 pb-12 border-[#333a3c]">
          Enable this setting to use your account on mobilesand tablet devices
        </p>
      </div>

      <div className="flex justify-center mt-10 ">
        <button
          className="w-1/2 py-4 border-2 border-[#6bb8e7] flex justify-center bg-[#0f191c] rounded-md cursor-pointer"
          onClick={() => {
            setDeleteAccountPopup(true);
          }}
        >
          <p className="flex items-center text-center text-[#fff]  text-xl font-extrabold ">
            DELETE ACCOUNT
          </p>
        </button>
      </div>
      <Modal
        visible={deleteAccountPopup}
        footer={null}
        title={null}
        centered
        closable={false}
        bodyStyle={{ padding: "0px" }}
        className="p-0 w-full h-auto flex items-center justify-center"
      >
        <DeleteAccount
          setDeleteAccountPopup={setDeleteAccountPopup}
          onDeleteAcount={onDeleteAcount}
          deleteValidationMsg={deleteValidationMsg}
        />
      </Modal>
    </div>
  );
};
export default Setting;
