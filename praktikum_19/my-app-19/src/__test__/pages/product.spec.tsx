import { render, screen } from "@testing-library/react"
import ProductPage from "@/pages/produk"

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/produk",
      pathname: "",
      query: {},
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      isReady: true,
    }
  },
}))

jest.mock("swr", () => ({
  __esModule: true,
  default: () => ({
    data: { data: [{ id: "1", name: "Produk A", price: 50000, image: "/img.jpg", category: "Elektronik" }] },
    error: null,
    isLoading: false,
  }),
}))

jest.mock("@/views/produk", () => ({
  __esModule: true,
  default: ({ products }: any) => (
    <div data-testid="product">
      {products.length} Produk
    </div>
  ),
}))

describe("Product Page", () => {

  it("renders product page correctly", () => {
    const page = render(<ProductPage />)
    expect(screen.getByTestId("product").textContent).toBe("1 Produk")
    expect(page).toMatchSnapshot()
  })

  it("renders dengan 0 produk jika data kosong", () => {
    // Override mock khusus test ini
    jest.mock("swr", () => ({
      __esModule: true,
      default: () => ({
        data: { data: [] },
        error: null,
        isLoading: false,
      }),
    }))
    const page = render(<ProductPage />)
    expect(page).toMatchSnapshot()
  })

})
