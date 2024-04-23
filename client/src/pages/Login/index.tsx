import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLoginMutation, type UserData } from "../../app/services/auth"
import { Form } from "antd"
import Layout from "../../components/Layout"
import Input from "../../components/ui/Input"
import PasswordInput from "../../components/ui/PasswordInput"
import Button from "../../components/ui/Button"
import ErrorMessage from "../../components/ErrorMessage"
import { Paths } from "../../utils/path"
import { isErrorWithMessage } from "../../utils/isErrorWithMsg"

const Login = () => {
  const navigate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState<string>("")

  const onLogin = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()
      setError("")
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
            <p className="text-lg ">Log in</p>
          </div>
          <div className="mt-6 px-5">
            <Form onFinish={onLogin} className="flex flex-col gap-4">
              <Input name="email" placeholder="Email" type="email" />
              <PasswordInput name="password" placeholder="Password" />
              <Button
                type="primary"
                htmlType="submit"
                loading={loginUserResult.isLoading}
              >
                Log in
              </Button>
            </Form>
            <div className="mt-5 flex flex-col gap-3">
              <p>
                Don't have an account?{" "}
                <span className="text-blue-500">
                  <Link to={Paths.register}>Sign up</Link>
                </span>
              </p>
              <ErrorMessage message={error} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login
