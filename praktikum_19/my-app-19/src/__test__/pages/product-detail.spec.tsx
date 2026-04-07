import { render, screen } from "@testing-library/react"
import HalamanProduk, { getStaticPaths, getStaticProps } from "@/pages/produk/[produk]"

// mock DetailProduk
jest.mock("@/views/DetailProduct", () => ({
  __esModule: true,
  default: ({ products }: any) => (
    <div data-testid="detail">{products?.name || "no data"}</div>
  ),
}))

describe("Product Detail Page", () => {

  it("renders detail product", () => {
    const mockProduct = {
      id: "1",
      name: "Produk Detail",
      price: 10000,
      image: "/img.jpg",
      category: "Elektronik",
    }

    const page = render(<HalamanProduk product={mockProduct} />)

    expect(screen.getByTestId("detail").textContent).toBe("Produk Detail")
    expect(page).toMatchSnapshot()
  })

  it("getStaticPaths works", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [{ id: "1" }],
          }),
      })
    ) as jest.Mock

    const result = await getStaticPaths()

    expect(result.paths.length).toBe(1)
  })

  it("getStaticProps works", async () => {
    global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: [{ id: "1", name: "Produk A" }],
      }),
  })
) as jest.Mock

const result = await getStaticProps({
  params: { produk: "1" },
} as any)

expect(result.props.product[0].name).toBe("Produk A")
  })

})