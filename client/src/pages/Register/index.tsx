import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../app/features/auth/authSlice"
import { useRegisterMutation } from "../../app/services/auth"
import { Paths } from "../../utils/path"
import { isErrorWithMessage } from "../../utils/isErrorWithMsg"
import type { User } from "@prisma/client"
import { Form } from "antd"
import Layout from "../../components/Layout"
import Input from "../../components/ui/Input"
import PasswordInput from "../../components/ui/PasswordInput"
import Button from "../../components/ui/Button"
import ErrorMessage from "../../components/ErrorMessage"

type RegisterData = Omit<User, "id"> & { confirmPassword: string }

const Register = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const [error, setError] = useState<string>("")
  const [registerUser] = useRegisterMutation()

  useEffect(() => {
    if (user) {
      navigate(Paths.home)
    }
  }, [user, navigate])

  const onRegister = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap()
      navigate(Paths.home)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      maybeError ? setError(err.data.message) : setError("Unknown error")
    }
  }

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="w-full sm:w-[80%] py-4 border-2 rounded">
          <div className="border-b-2 rounded pb-4 px-5">
            <p className="text-lg ">Sign up</p>
          </div>
          <div className="mt-6 px-5">
            <Form onFinish={onRegister} className="flex flex-col gap-4">
              <Input name="name" placeholder="Name" />
              <Input name="email" placeholder="Email" type="email" />
              <PasswordInput
                name="password"
                placeholder="Password"
                dependencies={[]}
              />
              <PasswordInput
                name="ConfirmPassword"
                placeholder="Confirm password"
                dependencies={[]}
              />
              <Button type="primary" htmlType="submit">
                Sign up
              </Button>
            </Form>
            <div className="mt-5">
              <p>
                Do you have an account?{" "}
                <span className="text-blue-500">
                  <Link to={Paths.login}>Log in</Link>
                </span>
              </p>
            </div>
            <ErrorMessage message={error} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Register
