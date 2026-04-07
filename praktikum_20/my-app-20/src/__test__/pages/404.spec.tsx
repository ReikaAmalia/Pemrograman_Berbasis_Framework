import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Custom404 from "@/pages/404";

jest.mock("next/image", () => ({
	__esModule: true,
	default: (props: any) => {
		const { alt, ...rest } = props;
		return <img alt={alt} {...rest} />;
	},
}));

describe("Custom 404 Page", () => {
	it("menampilkan judul 404", () => {
		render(<Custom404 />);
		expect(screen.getByText("404 - Halaman Tidak Ditemukan")).toBeInTheDocument();
	});

	it("menampilkan deskripsi halaman", () => {
		render(<Custom404 />);
		expect(
			screen.getByText(
				"Maaf, halaman yang Anda cari mungkin telah dipindahkan atau tidak tersedia.",
			),
		).toBeInTheDocument();
	});

	it("menampilkan gambar 404 berdasarkan alt text", () => {
		render(<Custom404 />);
		expect(screen.getByAltText("404")).toBeInTheDocument();
	});
});
