import ICClanUpload from "@Image/Clan/ic-clan-upload.png";
import { PlusIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { Menu, Dropdown } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  ActivePop: (value: any) => void;
}
const ClanCreate = ({ ActivePop }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      initial: "",
      image: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      ActivePop("clan_member");
    },
  });

  const Menus = (
    <Menu>
      <Menu.Item key="0">
        <a>Anyone can join</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a>Only friend can join</a>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="flex justify-center">
      <div className="w-full h-full bg-transparent mx-6 ">
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 150px)",
            backgroundColor: "transparent",
          }}
          className="relative "
        >
          <XIcon
            className="absolute top-3 w-9 h-9 right-3 cursor-pointer z-50"
            onClick={() => ActivePop("clan")}
          />

          <div className="bg-primary-dark shadow shadow-black border border-black w-full h-full pt-8">
            <p className="mb-6 text-center text-[#fff] text-2xl font-extrabold">
              CREATE CLAN
            </p>
            <div className="flex justify-beetween ">
              <div className="mx-10 w-1/3">
                <div
                  className="h-full bg-[#111C20] shadow-2xl shadow-black overflow-y-auto"
                  style={{
                    height: "calc(100vh - 350px)",
                  }}
                >
                  <div className="relative flex flex-col items-center justify-center py-6 px-9 gap-6">
                    <div
                      className={`relative w-full ${
                        formik.errors && "border-2 border-yellow-400"
                      }`}
                    >
                      <img
                        alt="clan"
                        src={ICClanUpload}
                        className={`w-full h-auto rounded `}
                      />
                      {formik.errors && (
                        <p className="absolute bottom-0 text-center text-yellow-400 mb-4">
                          Sorry. your file is too big. Please reupload another
                          file.
                        </p>
                      )}
                    </div>
                    <div className="w-full h-14 border-2 border-[#6bb8e7] flex justify-center items-center bg-[#253d4c] rounded-md cursor-pointer">
                      <PlusIcon className="w-7 h-10 text-white" />
                      <p className="flex items-center text-center text-[#fff] text-lg font-extrabold ml-4">
                        CHANGE LOGO
                      </p>
                    </div>

                    <div className="flex w-full justify-between">
                      <p className="font-bold">File format accepted:</p>
                      <p>.png, .jpg, .gif</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="font-bold">Maximum file size:</p>
                      <p>25 MB</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="font-bold">File resolution:</p>
                      <p>500x500 pixel</p>
                    </div>
                  </div>
                </div>

                {/* BUTTON JOIN */}
                <div
                  className="w-full mt-10 h-14 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer"
                  onClick={() => ActivePop("clan")}
                >
                  <p className="flex items-center text-center text-[#fff] text-lg font-extrabold">
                    CANCEL
                  </p>
                </div>
              </div>

              <div
                style={{
                  height: "calc(100vh - 250px)",
                }}
                className="mr-10 w-2/3 overflow-y-auto p-8 bg-[#111C20] shadow-2xl shadow-black"
              >
                {/* Form Create Clan */}
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="flex w-full gap-6">
                      <div className="flex flex-col gap-5 w-2/3">
                        <p className="font-bold">CLAN NAME</p>
                        <div className="relative">
                          <input
                            type="text"
                            className={`h-[45px] w-full border-l-[5px] border-solid border-[#95BE4C] pl-3 text-white bg-[#2E2E2E]  ${
                              formik.errors.name && "border-2 border-yellow-400"
                            }`}
                            placeholder="Your clan name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                          />
                          <button className="absolute top-0 right-0 h-[45px] leading-[45px] px-3 rounded border-2 border-[#6bb8e7] bg-[#253d4c]">
                            Check
                          </button>
                        </div>
                        {formik.errors.name && (
                          <p className="text-yellow-400">
                            Your clan name is already taken. Please try other
                            name
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-5 w-1/3">
                        <p className="font-bold">CLAN INITIALS</p>
                        <input
                          type="text"
                          className="h-[45px] w-full border-l-[5px] border-solid border-[#95BE4C] pl-3 text-white bg-[#2E2E2E]"
                          placeholder="ABCD"
                          name="initial"
                          onChange={formik.handleChange}
                          value={formik.values.initial}
                        />
                      </div>
                    </div>
                    <p>
                      Clan name must be unique. Your clan name may not contain
                      characters such as @,!, * or $. or any other special
                      characters. Please use only letters and numbers.
                    </p>
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between">
                        <p className="font-bold">DESCRIPTION</p>
                        <p>0/300</p>
                      </div>
                      <textarea
                        className="h-[135px] w-full border-l-[5px] border-solid border-[#95BE4C] p-3 text-white bg-[#2E2E2E]"
                        placeholder="Something cool about your clan..."
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                      />
                    </div>

                    <div className="flex flex-col gap-5">
                      <p className="font-bold">CLAN TYPE</p>
                      <div className="mt-2 w-2/3 h-[45px] border-l-4 border-[#94bd4b] flex items-center bg-[#2e2e2e]">
                        <Dropdown overlay={Menus} trigger={["click"]}>
                          <a
                            className="ant-dropdown-link w-full text-[#fff] text-base font-light mx-6 flex justify-between "
                            onClick={(e) => e.preventDefault()}
                          >
                            Anyone can join
                            <CaretRightOutlined
                              rotate={90}
                              className="flex items-center"
                            />
                          </a>
                        </Dropdown>
                      </div>
                    </div>

                    <div className="flex flex-col gap-5 w-2/3">
                      <p className="font-bold">MINIMUM TROPHIES TO JOIN</p>
                      <input
                        type="text"
                        className="h-[45px] w-full border-l-[5px] border-solid border-[#95BE4C] pl-3 text-white bg-[#2E2E2E]"
                        placeholder="Number"
                      />
                    </div>

                    <div className="flex gap-5 items-center">
                      <input type="checkbox" />
                      <p>
                        I agree to{" "}
                        <span className="underline text-primary-sky">
                          Clan Rules
                        </span>{" "}
                        and allow Battlelab to charge{" "}
                        <span className="text-primary-green">5$</span> for clan
                        creation fee.
                      </p>
                    </div>
                  </div>
                </form>
                <div
                  className="w-[360px] mt-10 h-14 border-2 border-[#6bb8e7] flex justify-center bg-[#253d4c] rounded-md cursor-pointer"
                  onClick={() => formik.handleSubmit()}
                >
                  <p className="flex items-center text-center text-[#fff] text-lg font-extrabold">
                    CREATE CLAN
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClanCreate;
