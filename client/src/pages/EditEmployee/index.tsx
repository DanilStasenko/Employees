import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees"
import type { Employee } from "@prisma/client"
import { isErrorWithMessage } from "../../utils/isErrorWithMsg"
import { Paths } from "../../utils/path"
import { Spin } from "antd"
import Layout from "../../components/Layout"
import EmployeeForm from "../../components/EmployeeForm"

const EditEmployee = () => {
  const navigate = useNavigate()
  const params = useParams<{ id: string }>()
  const [error, setError] = useState<string>("")
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [editEmployee] = useEditEmployeeMutation()

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    )
  }

  const handleEditEmployee = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      }
      await editEmployee(editedEmployee).unwrap()

      navigate(`${Paths.status}/updated`)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      maybeError ? setError(err.data.message) : setError("Unknown error")
    }
  }

  return (
    <Layout>
      <EmployeeForm
        employee={data}
        btnText="Edit"
        title="Edit employee"
        error={error}
        onFinish={handleEditEmployee}
      />
    </Layout>
  )
}

export default EditEmployee
