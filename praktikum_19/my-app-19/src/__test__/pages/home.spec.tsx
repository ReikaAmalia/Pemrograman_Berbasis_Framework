import { render, screen } from "@testing-library/react"
import Home from "@/pages/index"

describe("Home Page", () => {
  it("renders home page", () => {
    const page = render(<Home />)

    expect(screen.getByText("Praktikum Next.js Pages Router")).toBeTruthy()
    expect(screen.getByText("Mahasiswa D4 Pengembangan Web")).toBeTruthy()

    expect(page).toMatchSnapshot()
  })
})