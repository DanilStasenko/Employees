import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import type { Employee } from "@prisma/client"
import { useGetAllEmployeesQuery } from "../../app/services/employees"
import { selectUser } from "../../app/features/auth/authSlice"
import { Paths } from "../../utils/path"
import { PlusCircleOutlined } from "@ant-design/icons"
import type { ColumnsType } from "antd/es/table"
import { Table } from "antd"
import Layout from "../../components/Layout"
import Button from "../../components/ui/Button"

const columns: ColumnsType<Employee> = [
  {
    title: "First name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
]

const Employees = () => {
  const navigate = useNavigate()
  const user = useAppSelector(selectUser)
  const { data, isLoading } = useGetAllEmployeesQuery()

  useEffect(() => {
    if (!user) navigate(Paths.login)
  }, [navigate, user])

  const onAddEmployeeClick = () => navigate(Paths.employeeAdd)

  return (
    <Layout>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={onAddEmployeeClick}
      >
        Add employee
      </Button>
      <Table
        className="mt-8"
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={record => record.id}
        onRow={record => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          }
        }}
      />
    </Layout>
  )
}

export default Employees
