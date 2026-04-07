import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DetailBlog from "@/pages/blog/[slug]";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
	useRouter: jest.fn(),
}));

describe("Blog Page", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("render halaman blog", () => {
		(useRouter as jest.Mock).mockReturnValue({
			query: {},
		});

		render(<DetailBlog />);

		expect(screen.getByText("Detail Blog")).toBeInTheDocument();
		expect(screen.getByText("Slug:")).toBeInTheDocument();
	});

	it("menampilkan data blog jika ada", () => {
		(useRouter as jest.Mock).mockReturnValue({
			query: { slug: "artikel-pertama" },
		});

		render(<DetailBlog />);

		expect(screen.getByText("Detail Blog")).toBeInTheDocument();
		expect(screen.getByText("Slug: artikel-pertama")).toBeInTheDocument();
	});

	it("handle empty state jika data kosong", () => {
		(useRouter as jest.Mock).mockReturnValue({
			query: { slug: "" },
		});

		render(<DetailBlog />);

		expect(screen.getByText("Slug:")).toBeInTheDocument();
		expect(screen.queryByText("Slug: artikel-pertama")).not.toBeInTheDocument();
	});
});
