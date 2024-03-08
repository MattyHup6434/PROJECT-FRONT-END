import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const guestNav = [
  { to : '/', text: 'เข้าสู่ระบบ' },
  { to : '/register', text: 'สมัครสมาชิก' },
]

const userNav = [
  { to : '/', text: 'Home' },

]
const adminNav = [
  { to: '#', text: 'Admin' },
  { to: '/restaurant', text: 'Restaurant' },
  { to: '#', text: 'Settings' },
];


export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  let finalNav = [];

  if (user?.id) {
    finalNav = [...userNav];
    if (user.role === 'ADMIN') {
      finalNav.push({ to: '#', text: 'AdminMode', subMenu: adminNav });
    }
  } else {
    finalNav = [...guestNav];
  }

  const hdlLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex justify-between">
      <div className="flex navbar-stat ">
        <a className="btn btn-ghost text-xl text-white  ">Hello, {user?.id ? user.username: 'Guest'} || stauts : {user?.id ? user.StatusUser:'NULL'}</a>
      </div>

      <div className="flex justify-center">
    <h1 className=" text-navbar2xl text-white  mt-4">LOGO</h1>
  </div>

  <div className="flex justify-end">
        <ul className="menu menu-horizontal px-1 text-white">
          {finalNav.map(el => (
            <li key={el.to}>
              {el.subMenu ? (
                <div className="dropdown dropdown-bottom">
                <button className="dropbtn ">{el.text}</button>
                <div className="dropdown-content ">
                    {el.subMenu.map(subItem => (
                      <Link key={subItem.to} to={subItem.to}>{subItem.text}</Link>
                    ))}
                  </div>
              </div>
              ) : (
                <Link to={el.to}>{el.text}</Link>
              )}
            </li>
          ))}
          {user?.id && (
            <li>
              <Link to="#" onClick={hdlLogout}>ออกจากระบบ</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
