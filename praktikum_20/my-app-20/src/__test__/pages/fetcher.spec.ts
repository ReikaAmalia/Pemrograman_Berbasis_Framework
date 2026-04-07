import fetcher from "@/utils/swr/fetcher"

describe("Fetcher", () => {
  it("fetch data correctly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: "test" }),
      })
    ) as jest.Mock

    const result = await fetcher("/api/test")

    expect(result.data).toBe("test")
  })
})