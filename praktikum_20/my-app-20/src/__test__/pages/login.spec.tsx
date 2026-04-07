import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TampilanLogin from "@/views/auth/login";
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

describe("Login Page", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      query: {},
    });
  });

  it("login success", async () => {
    (signIn as jest.Mock).mockResolvedValue({
      error: null,
    });

    render(<TampilanLogin />);

    fireEvent.submit(screen.getByRole("form"), {
      target: {
        email: { value: "test@mail.com" },
        password: { value: "123456" },
      },
    });

    await waitFor(() => {
      expect(signIn).toHaveBeenCalled();
      expect(pushMock).toHaveBeenCalled(); 
    });
  });

  it("login gagal", async () => {
    (signIn as jest.Mock).mockResolvedValue({
      error: "Login failed",
    });

    render(<TampilanLogin />);

    fireEvent.submit(screen.getByRole("form"), {
      target: {
        email: { value: "test@mail.com" },
        password: { value: "123" },
      },
    });

    await waitFor(() => {
      expect(screen.getByText("Login failed")).toBeInTheDocument();
    });
  });
});