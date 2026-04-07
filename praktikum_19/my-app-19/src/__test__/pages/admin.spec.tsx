import { render, screen } from "@testing-library/react"
import HalamanAdmin from "@/pages/admin"

describe("Admin Page", () => {
  it("renders admin", () => {
    const page = render(<HalamanAdmin />)

    expect(screen.getByText("Halaman Admin")).toBeTruthy()

    expect(page).toMatchSnapshot()
  })
})