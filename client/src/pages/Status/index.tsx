import { Link, useParams } from "react-router-dom"
import { Button, Result } from "antd"
import { Paths } from "../../utils/path"

const statuses: Record<string, string> = {
  created: "Added successfully",
  updated: "Updated successfully",
  deleted: "Deleted successfully",
}

const Status = () => {
  const { status } = useParams()

  return (
    <div className="flex justify-center items-center w-full">
      <Result
        status={status ? "success" : 404}
        title={status ? statuses[status] : "Not found"}
        extra={
          <Button key="dashboard">
            <Link to={Paths.home}>Home</Link>
          </Button>
        }
      />
    </div>
  )
}

export default Status
