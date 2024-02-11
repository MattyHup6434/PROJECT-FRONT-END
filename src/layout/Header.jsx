import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/', text: 'เข้าสู่ระบบ' },
  { to : '/register', text: 'สมัครสมาชิก' },
]

const userNav = [
  { to : '/', text: 'Home' },

]

export default function Header() {
  const {user, logout} = useAuth()
  const finalNav = user?.id ? userNav : guestNav

  const navigate = useNavigate()

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar ">
      <div className="flex-1 navbar-stat ">
        <a className="btn btn-ghost text-xl text-white  ">Hello, {user?.id ? user.username : 'Guest'}</a>
      </div>

      <div className="navbar-end">
    <h1 className=" text-2xl text-white ml- mt-4">RESTREE</h1>
  </div>

  <div className="flex-none  navbar-end">
        <ul className="menu menu-horizontal px-1 text-white">
          { finalNav.map( el => (
            <li key={el.to} >
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))}
          { user?.id && (
            <li>
              <Link to='#' onClick={hdlLogout}>ออกจากระบบ</Link>
            </li>
          ) }
        </ul>
      </div>
      
    </div>
    
  );
}
