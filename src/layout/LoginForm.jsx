import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post("http://localhost:8000/auth/login", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8000/auth/me", {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });
      console.log(rs1.data);
      setUser(rs1.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
     <form className="flex flex-col" style={{ marginRight: '5rem' }} onSubmit={hdlSubmit}>

        <div className=" pl-4 border w-1 min-w-[350px] h-[400px] mx-auto rounded-lg mt-5 bg-white  ">
          <div className="ml-12  w-[200px]">
        
            <img
              src="https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
              alt="Image description"
            />
          </div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">username</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              name="username"
              value={input.username}
              onChange={hdlChange}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full max-w-xs"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>
        </div>

        <div className="flex gap-5 mx-auto">
          <button
            type="submit"
            className="btn border  min-w-[350px] mx-auto rounded-lg mt-5 bg-white text-green-500"
          >
           เข้าสู่ระบบ
          </button>
        </div>
      </form>
    </div>
  );
}
