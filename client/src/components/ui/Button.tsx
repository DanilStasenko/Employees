import { Button as AntButton, Form } from "antd"
import type { SizeType } from "antd/es/config-provider/SizeContext"

interface IButton {
  children: React.ReactNode
  htmlType?: "button" | "submit" | "reset"
  type?: "link" | "text" | "default" | "primary" | "dashed"
  onClick?: React.MouseEventHandler<HTMLElement>
  danger?: boolean
  loading?: boolean
  shape?: "default" | "circle" | "round"
  ghost?: boolean
  icon?: React.ReactNode
  size?: SizeType
}

const Button = ({
  children,
  htmlType = "button",
  onClick,
  type,
  danger,
  loading,
  shape,
  icon,
  ghost,
  size,
}: IButton) => {
  return (
    <Form.Item className="mb-0">
      <AntButton
        htmlType={htmlType}
        onClick={onClick}
        type={type}
        danger={danger}
        loading={loading}
        shape={shape}
        icon={icon}
        ghost={ghost}
        size={size}
      >
        {children}
      </AntButton>
    </Form.Item>
  )
}

export default Button
