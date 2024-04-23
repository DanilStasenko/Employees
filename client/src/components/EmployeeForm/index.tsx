import type { Employee } from "@prisma/client"
import { Form } from "antd"
import Input from "../ui/Input"
import ErrorMessage from "../ErrorMessage"
import Button from "../ui/Button"

interface IEmployeeForm<T> {
  onFinish: (values: T) => void
  btnText: string
  title: string
  error?: string
  employee?: T
}

const EmployeeForm = ({
  onFinish,
  title,
  btnText,
  error,
  employee,
}: IEmployeeForm<Employee>) => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="max-w-96 w-full lg:max-w-[70%]">
        <h2 className="mb-5 text-xl">{title}</h2>
        <Form name="employee-form" onFinish={onFinish} initialValues={employee}>
          <Input name="firstName" placeholder={"First name"} />
          <Input name="lastName" placeholder={"Last name"} />
          <Input name="age" placeholder={"Age"} type="number" />
          <Input name="address" placeholder={"Address"} />
          <div className="mt-8">
            <ErrorMessage message={error} />
            <Button htmlType="submit" type="primary">
              {btnText}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default EmployeeForm
