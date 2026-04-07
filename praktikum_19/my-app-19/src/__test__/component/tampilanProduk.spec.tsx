import { render, screen } from "@testing-library/react"
import TampilanProduk from "@/views/produk"

// ✅ Mock next/image (biar tidak error)
jest.mock("next/image", () => (props: any) => {
  return <img {...props} />
})

// ✅ Mock next/link
jest.mock("next/link", () => {
  return ({ children }: any) => {
    return children
  }
})

describe("TampilanProduk Component", () => {

  it("renders with product data", () => {
    const mockProducts = [
      {
        id: "1",
        name: "Produk A",
        price: 50000,
        image: "/img.jpg",
        category: "Elektronik",
      },
    ]

    const page = render(<TampilanProduk products={mockProducts} />)

    // ✅ getByTestId + toBe
    expect(screen.getByTestId("title").textContent).toBe("Daftar Produk")

    // ✅ cek nama produk tampil
    expect(screen.getByText("Produk A")).toBeTruthy()

    // ✅ snapshot
    expect(page).toMatchSnapshot()
  })

  it("renders skeleton jika produk kosong", () => {
    const page = render(<TampilanProduk products={[]} />)

    // snapshot kondisi kosong
    expect(page).toMatchSnapshot()
  })

})