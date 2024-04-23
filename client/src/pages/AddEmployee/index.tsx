import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Employee } from "@prisma/client"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../app/features/auth/authSlice"
import { useAddEmployeeMutation } from "../../app/services/employees"
import { isErrorWithMessage } from "../../utils/isErrorWithMsg"
import { Paths } from "../../utils/path"
import EmployeeForm from "../../components/EmployeeForm"
import Layout from "../../components/Layout"

const AddEmployee = () => {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const [addEmployee] = useAddEmployeeMutation()

  useEffect(() => {
    if (!user) navigate(Paths.login)
  }, [navigate, user])

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()
      navigate(`${Paths.status}/created`)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      maybeError ? setError(err.data.message) : setError("Unknown error")
    }
  }

  return (
    <Layout>
      <EmployeeForm
        btnText="Add"
        title="Add employee"
        onFinish={handleAddEmployee}
        error={error}
      />
    </Layout>
  )
}

export default AddEmployee
