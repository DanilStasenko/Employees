import { Alert } from "antd"

interface IErrorMessage {
  message?: string
}

const ErrorMessage = ({ message }: IErrorMessage) => {
  if (!message) return null

  return <Alert message={message} type="error" />
}

export default ErrorMessage
