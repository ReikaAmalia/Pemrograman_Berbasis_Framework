import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CategoryPage from "@/pages/category/[...slug]";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("Category Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("render halaman category", () => {
		(useRouter as jest.Mock).mockReturnValue({
			query: { slug: ["elektronik"] },
		});

		render(<CategoryPage />);

		expect(screen.getByText("Halaman Category")).toBeInTheDocument();
	});

	it("menampilkan daftar kategori", () => {
		(useRouter as jest.Mock).mockReturnValue({
			query: { slug: ["elektronik", "fashion", "makanan"] },
		});

		render(<CategoryPage />);

		expect(screen.getByText("elektronik")).toBeInTheDocument();
		expect(screen.getByText("fashion")).toBeInTheDocument();
		expect(screen.getByText("makanan")).toBeInTheDocument();
	});

	it("handle kondisi jika tidak ada kategori", () => {
		(useRouter as jest.Mock).mockReturnValue({
			query: {},
		});

		render(<CategoryPage />);

		expect(screen.getByText("Tidak ada parameter")).toBeInTheDocument();
		expect(screen.queryByText("elektronik")).not.toBeInTheDocument();
	});
});
