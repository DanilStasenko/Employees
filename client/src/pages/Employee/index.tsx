import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../app/features/auth/authSlice"
import { Paths } from "../../utils/path"
import { isErrorWithMessage } from "../../utils/isErrorWithMsg"
import { Descriptions, Modal, Spin } from "antd"
import Layout from "../../components/Layout"
import Button from "../../components/ui/Button"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import ErrorMessage from "../../components/ErrorMessage"

const Employee = () => {
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()
  const [error, setError] = useState<string>("")
  const params = useParams<{ id: string }>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { data, isLoading } = useGetEmployeeQuery(params.id || "")
  const [deleteEmployee] = useDeleteEmployeeMutation()

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    )
  }

  if (!data) {
    navigate(Paths.home)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteEmployee = async () => {
    hideModal()

    try {
      await deleteEmployee(data?.id!).unwrap
      navigate(`${Paths.status}/deleted`)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      maybeError ? setError(err.data.message) : setError("Unknown error")
    }
  }

  return (
    <Layout>
      <Descriptions title="Information about employee" bordered>
        <Descriptions.Item label="Name" span={3}>
          {`${data?.firstName} ${data?.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Age" span={3}>
          {data?.age}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {data?.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data?.userId && (
        <div className="mt-5  flex gap-4">
          <Link to={`${Paths.employeeEdit}/${data?.id}`}>
            <Button type="primary" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={showModal}
          >
            Delete
          </Button>
        </div>
      )}
      <div className="mt-5">
        <ErrorMessage message={error} />
      </div>
      <Modal
        title="Confirm deletion"
        open={isModalOpen}
        okText="Confirm"
        cancelText="Cancel"
        onCancel={hideModal}
        onOk={handleDeleteEmployee}
      >
        {`Are you sure you want to delete the employee ${data?.firstName} ${data?.lastName}?`}
      </Modal>
    </Layout>
  )
}

export default Employee
