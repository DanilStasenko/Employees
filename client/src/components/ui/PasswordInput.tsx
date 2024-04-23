import { Form, Input as AntInput } from "antd"
import type { SizeType } from "antd/es/config-provider/SizeContext"
import type { NamePath } from "antd/es/form/interface"

interface IPasswordInput {
  name: string
  placeholder: string
  dependencies?: NamePath[]
  size?: SizeType
}

const PasswordInput = ({
  name,
  placeholder,
  dependencies,
  size,
}: IPasswordInput) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        { required: true, message: "Required field" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve()
            }

            if (name === "ConfirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error("The two passwords that you entered don't match"),
              )
            } else {
              if (value.length < 6) {
                return Promise.reject(
                  new Error("The password must be longer than 6 characters"),
                )
              }
              return Promise.resolve()
            }
          },
        }),
      ]}
    >
      <AntInput.Password placeholder={placeholder} size={size} />
    </Form.Item>
  )
}

export default PasswordInput
