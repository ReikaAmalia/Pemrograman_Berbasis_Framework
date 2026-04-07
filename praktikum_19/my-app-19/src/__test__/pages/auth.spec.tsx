import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("next-auth/react", () => ({
	signIn: jest.fn(),
}));

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("Auth Page (Login/Register)", () => {
	const pushMock = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		(useRouter as jest.Mock).mockReturnValue({
			push: pushMock,
			query: {},
		});
		global.fetch = jest.fn();
	});

	it("render halaman login dan register", () => {
		render(<LoginPage />);
		expect(screen.getByText("Halaman login")).toBeInTheDocument();

		render(<RegisterPage />);
		expect(screen.getByText("Halaman Register")).toBeInTheDocument();
	});

	it("input email dan password pada login", () => {
		render(<LoginPage />);

		const emailInput = screen.getByPlaceholderText("Email") as HTMLInputElement;
		const passwordInput = screen.getByPlaceholderText("password") as HTMLInputElement;

		fireEvent.change(emailInput, { target: { value: "user@mail.com" } });
		fireEvent.change(passwordInput, { target: { value: "123456" } });

		expect(emailInput.value).toBe("user@mail.com");
		expect(passwordInput.value).toBe("123456");
	});

	it("submit form register", async () => {
		(global.fetch as jest.Mock).mockResolvedValue({ status: 200 });

		render(<RegisterPage />);

		fireEvent.change(screen.getByPlaceholderText("Email"), {
			target: { value: "new@mail.com" },
		});
		fireEvent.change(screen.getByPlaceholderText("Fullname"), {
			target: { value: "New User" },
		});
		fireEvent.change(screen.getByPlaceholderText("Password"), {
			target: { value: "123456" },
		});

		fireEvent.click(screen.getByRole("button", { name: "Register" }));

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledTimes(1);
			expect(global.fetch).toHaveBeenCalledWith(
				"/api/register",
				expect.objectContaining({ method: "POST" }),
			);
			expect(pushMock).toHaveBeenCalledWith("/auth/login");
		});
	});

	it("kondisi login berhasil", async () => {
		(signIn as jest.Mock).mockResolvedValue({ error: null });

		render(<LoginPage />);

		fireEvent.submit(screen.getByRole("form"), {
			target: {
				email: { value: "test@mail.com" },
				password: { value: "123456" },
			},
		});

		await waitFor(() => {
			expect(signIn).toHaveBeenCalled();
			expect(pushMock).toHaveBeenCalledWith("/");
		});
	});

	it("kondisi login gagal", async () => {
		(signIn as jest.Mock).mockResolvedValue({ error: "Login failed" });

		render(<LoginPage />);

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
