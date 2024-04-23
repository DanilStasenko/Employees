import { useCurrentQuery } from "../../services/auth"
import { Spin } from "antd"

interface IAuth {
  children: JSX.Element
}

const Auth = ({ children }: IAuth) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    )

  return <>{children}</>
}

export default Auth
