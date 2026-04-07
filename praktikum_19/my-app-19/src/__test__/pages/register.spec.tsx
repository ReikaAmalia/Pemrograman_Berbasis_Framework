import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import TampilanRegister from "@/views/auth/register"
import { useRouter } from "next/router"

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}))

describe("Register Page", () => {
  const pushMock = jest.fn()

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    })

    global.fetch = jest.fn()
  })

  it("renders register page", () => {
    const page = render(<TampilanRegister />)

    expect(screen.getByText("Halaman Register")).toBeTruthy()
    expect(page).toMatchSnapshot()
  })

  it("error jika email kosong", async () => {
    render(<TampilanRegister />)

    fireEvent.click(screen.getByText("Register"))

    await waitFor(() => {
      expect(screen.getByText("Email wajib diisi")).toBeTruthy()
    })
  })

  it("error jika password kurang", async () => {
    render(<TampilanRegister />)

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    })

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123" },
    })

    fireEvent.click(screen.getByText("Register"))

    await waitFor(() => {
      expect(screen.getByText("Password minimal 6 karakter")).toBeTruthy()
    })
  })

  it("register success", async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
    })

    render(<TampilanRegister />)

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@mail.com" },
    })

    fireEvent.change(screen.getByPlaceholderText("Fullname"), {
      target: { value: "Reika" },
    })

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    })

    fireEvent.click(screen.getByText("Register"))

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/auth/login")
    })
  })
})