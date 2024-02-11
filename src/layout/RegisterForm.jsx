import axios from 'axios'
import {useState} from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username : '', 
    password : '',
    confirmPassword : '',
    email : '',
    name : '',
    address : '',
    phone : '',
    birthdate : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if(input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8000/auth/register', input)
      console.log(rs)
      if(rs.status === 200) {
        alert('Register Successful')
      }
    }catch(err) {
      console.log( err.message)
    }

  }

  return (
    <form className="flex flex-col " style={{ marginRight: '5rem' }} onSubmit={hdlSubmit}>
    <div className=" pl-8 border w-1 min-w-[400px]  mx-auto rounded-lg bg-white p-12  ">
    <div className="text-xl mb-5 text-green-500">ยินดีต้อนรับท่านสมาชิกใหม่

</div>
      <div className='flex gap-5'>
        <div> 
           <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">username</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="username"
            value={input.username}
            onChange={ hdlChange }
          />
        </label>
    
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">รหัสผ่าน</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>
        
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ยืนยันรหัสผ่าน</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-[220px] ">
        <div className="label">
          <span className="label-text">วันเกิด</span>
        </div>
        <input type="date" name="birthdate" value={input.birthdate} onChange={hdlChange} />
      </label>

        </div>

        <div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={ hdlChange }
          />
        </label>
 
    
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">ชื่อของท่าน</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="name"
            value={input.name}
            onChange={ hdlChange }
          />
        </label>


        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">เบอร์โทร</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="phone"
            value={input.phone}
            onChange={ hdlChange }
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="address"
            value={input.address}
            onChange={ hdlChange }
          />
          
        </label>
      
        </div>
      </div>

    </div>
    <button
            type="submit"
            className="btn border  min-w-[400px] mx-auto rounded-lg mt-5 bg-white text-green-500"
          >
           สมัครสมาชิก
          </button>

    </form>
  );
}
