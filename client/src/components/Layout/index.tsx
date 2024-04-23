import Header from "../Header"

interface ILayout {
  children: React.ReactNode
}

const Layout = ({ children }: ILayout) => {
  return (
    <div className="w-full h-full mx-auto my-0 max-w-7xl px-3 lg:px-6 min-h-screen">
      <Header />
      {children}
    </div>
  )
}

export default Layout
