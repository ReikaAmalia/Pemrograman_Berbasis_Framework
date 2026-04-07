import { render, screen } from "@testing-library/react"
import Navbar from "@/components/navbar"

// mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: {
      user: {
        name: "Reika",
        image: "/avatar.png",
      },
    },
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

// mock next/image
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />
})

// mock script
jest.mock("next/dist/client/script", () => (props: any) => {
  return <div>{props.children}</div>
})

describe("Navbar", () => {
  it("renders user info", () => {
    const page = render(<Navbar />)

    expect(screen.getByText(/Welcome/i)).toBeTruthy()
    expect(page).toMatchSnapshot()
  })
})