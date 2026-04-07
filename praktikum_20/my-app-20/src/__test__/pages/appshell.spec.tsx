import { render, screen } from "@testing-library/react"
import AppShell from "@/components/Appshell"

// ✅ Mock router
jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/home",
    }
  },
}))

// ✅ Mock dynamic (INI PENTING)
jest.mock("next/dynamic", () => () => {
  return function MockedComponent() {
    return <div data-testid="navbar">Navbar</div>
  }
})

describe("AppShell", () => {
  it("renders navbar and children", () => {
    const page = render(
      <AppShell>
        <div data-testid="child">Content</div>
      </AppShell>
    )

    expect(screen.getByTestId("navbar")).toBeTruthy()
    expect(screen.getByTestId("child")).toBeTruthy()
    expect(page).toMatchSnapshot()
  })
})