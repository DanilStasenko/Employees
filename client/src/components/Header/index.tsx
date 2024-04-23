import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectUser } from "../../app/features/auth/authSlice"
import { Paths } from "../../utils/path"
import {
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons"
import Button from "../ui/Button"

const Header = () => {
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onLogoutClick = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate(Paths.login)
  }

  return (
    <header className="pt-7 mb-12">
      <nav>
        <ul className="flex justify-between">
          <li className="flex items-center">
            <Link to={Paths.home} className="flex items-center gap-x-2">
              <TeamOutlined className="text-xl md:text-3xl" />
              <p className="hidden xs:block text-xl md:text-3xl">Employees</p>
            </Link>
          </li>
          <li className="flex items-center gap-x-2">
            {user ? (
              <Button
                icon={<LogoutOutlined />}
                size="large"
                onClick={onLogoutClick}
              >
                Log out
              </Button>
            ) : (
              <>
                <Link to={Paths.register}>
                  <Button size="large" icon={<UserOutlined />}>
                    <span>Sign up</span>
                  </Button>
                </Link>
                <Link to={Paths.login}>
                  <Button size="large" icon={<LoginOutlined />}>
                    <span>Log in</span>
                  </Button>
                </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
