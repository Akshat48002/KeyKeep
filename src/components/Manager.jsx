import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  const [show, setShow] = useState(false);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const savePassword = async (e) => {
    e.preventDefault();

    // Trim values to avoid whitespace-only input
    const { site, username, password } = form;

    if (!site.trim() || !username.trim() || !password.trim()) {
      toast.error("❗ All fields are required", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    const updated = [...passwordArray, { ...form, id: uuidv4() }];
    // If any such id exists in the db, delete it 
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
    setpasswordArray(updated);
    await fetch("http://localhost:3000/",{method:"POST" , headers:{"Content-Type": "application/json",},body:JSON.stringify(updated) })
    setform({ site: "", username: "", password: "" });

    toast("🦄 Saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const deletePassword = async (id) => {
    const c = confirm("Are you really want to delete your password?");
    if (c) {
      const updated = passwordArray.filter((item) => item.id !== id);
      setpasswordArray(updated);
      let res = await fetch("http://localhost:3000/",{method:"DELETE" , headers:{"Content-Type": "application/json",},body:JSON.stringify(updated) })
      toast("🦄 Password Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
   const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const showPassword = () => {
    setShow(!show);
  };

  const copyText = (text) => {
    toast("🦄 Copied to Clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="fixed inset-0 -z-10 h-full w-full bg-gray-800 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-white opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 md:p-3 mycontainer ">
        <div className="logo">
          <h1 className="text-xl text-center font-semibold text-white">
            🔑 <span className="tracking-wide">Key</span>
            <span className="font-bold">Keep</span>
          </h1>
        </div>
        <p className="text-green-600 text-center">Your password keeper</p>
        <div className="flex flex-col p-4 text-white gap-8 items-center">
          <input
            className="rounded-full border-4 p-3 py-2 border-slate-400 w-full"
            value={form.site}
            onChange={handleChange}
            type="text"
            name="site"
            id="site"
            placeholder="Enter Website URL"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 justify-between ">
            <input
              className="rounded-full border-4 p-3 py-2 border-slate-400 w-full"
              value={form.username}
              onChange={handleChange}
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
            />
            <div className="relative">
              <input
                className="rounded-full border-4 p-3 py-2 border-slate-400 w-full"
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                type={show ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter Password "
              />
              <span
                className="absolute right-[10px] top-[10px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1 invert"
                  width={28}
                  src={show ? "./icons/show.png" : "./icons/invisible.png"}
                  alt="toggle visibility"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-slate-400 text-white font-bold w-fit rounded-full px-8 py-2 cursor-pointer hover:bg-slate-200 hover:text-black"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords p-4">
          <h2 className="text-white font-bold text-sm md:text-2xl py-4">
            your saved password
          </h2>
          {passwordArray.length === 0 && (
            <div className="text-white text-sm">No passwords to show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto text-white w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-slate-500">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-slate-300 text-black">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-3 border border-white ">
                        <div
                          className="flex items-center justify-center cursor-pointer gap-2"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                          >
                            <path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v16a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 18H8V7h11v16z" />
                          </svg>
                        </div>
                      </td>
                      <td className="py-2 border border-white ">
                        <div
                          className="flex items-center justify-center cursor-pointer gap-2"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <span>{item.username}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                          >
                            <path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v16a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 18H8V7h11v16z" />
                          </svg>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white">
                        <div
                          className="flex items-center justify-center cursor-pointer gap-2"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <span>{"*".repeat(item.password.length)}</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                          >
                            <path d="M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v16a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 18H8V7h11v16z" />
                          </svg>
                        </div>
                      </td>
                      <td className="py-2 border border-white">
                        <div className="flex justify-center items-center gap-2">
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              width={24}
                              height={24}
                            >
                              <path d="M17.414 2.586a2 2 0 0 0-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 0 0 0-2.828zM3 17a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H4a1 1 0 0 0-1 1z" />
                            </svg>
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              width="24"
                              height="24"
                            >
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a1 1 0 011-1h4a1 1 0 011 1m-7 0h8" />
                            </svg>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
