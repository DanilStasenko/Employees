import { Form, Input as AntInput } from "antd"
import type { SizeType } from "antd/es/config-provider/SizeContext"

interface IInput {
  name: string
  placeholder: string
  type?: string
  size?: SizeType
}

const Input = ({ name, placeholder, type = "text", size }: IInput) => {
  return (
    <Form.Item
      name={name}
      rules={[{ required: true, message: "Required field" }]}
      shouldUpdate={true}
    >
      <AntInput placeholder={placeholder} type={type} size={size} />
    </Form.Item>
  )
}

export default Input
