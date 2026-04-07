import { render, screen } from "@testing-library/react"
import ProfilePage from "@/pages/profile"

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: { fullname: "Reika" }
    }
  })
}))

describe("Profile Page", () => {
  it("renders profile", () => {
    const page = render(<ProfilePage />)

    expect(screen.getByText("Halaman Profile")).toBeTruthy()
    expect(screen.getByText(/Reika/)).toBeTruthy()

    expect(page).toMatchSnapshot()
  })
})