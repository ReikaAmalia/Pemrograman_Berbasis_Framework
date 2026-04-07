import { render, screen } from "@testing-library/react"
import HalamanEditor from "@/pages/editor"

describe("Editor Page", () => {
  it("renders editor", () => {
    const page = render(<HalamanEditor />)

    expect(screen.getByText("Halaman Editor")).toBeTruthy()

    expect(page).toMatchSnapshot()
  })
})