import {
	retrieveDataByID,
	retrieveProducts,
	getUserByEmail,
	saveUser,
	updateUser,
	deleteUser,
	signIn,
	signUp,
	signInWithGoogle,
} from "@/utils/db/servicefirebase";

jest.mock("@/utils/db/firebase", () => ({
	__esModule: true,
	default: {},
}));

jest.mock("firebase/firestore", () => ({
	getFirestore: jest.fn(),
	collection: jest.fn(),
	getDocs: jest.fn(),
	getDoc: jest.fn(),
	doc: jest.fn(),
	query: jest.fn(),
	addDoc: jest.fn(),
	where: jest.fn(),
	updateDoc: jest.fn(),
	deleteDoc: jest.fn(),
}));

const firestore = jest.requireMock("firebase/firestore") as {
	getFirestore: jest.Mock;
	collection: jest.Mock;
	getDocs: jest.Mock;
	getDoc: jest.Mock;
	doc: jest.Mock;
	query: jest.Mock;
	addDoc: jest.Mock;
	where: jest.Mock;
	updateDoc: jest.Mock;
	deleteDoc: jest.Mock;
};

jest.mock("bcrypt", () => ({
	__esModule: true,
	default: {
		hash: jest.fn(),
	},
}));

const bcryptMock = jest.requireMock("bcrypt") as {
	default: {
		hash: jest.Mock;
	};
};

beforeEach(() => {
	jest.clearAllMocks();
	firestore.getFirestore.mockReturnValue("mock-db");
	firestore.collection.mockImplementation((_db: any, name: string) => `collection:${name}`);
	firestore.doc.mockImplementation((_db: any, name: string, id: string) => `doc:${name}:${id}`);
	firestore.where.mockImplementation((field: string, op: string, value: string) => ({ field, op, value }));
	firestore.query.mockImplementation((ref: string, clause: any) => ({ ref, clause }));
});

describe("retrieveProducts", () => {
	it("success: mengembalikan daftar produk", async () => {
		const docs = [
			{ id: "p1", data: () => ({ name: "Produk A", price: 10000 }) },
			{ id: "p2", data: () => ({ name: "Produk B", price: 20000 }) },
		];
		firestore.getDocs.mockResolvedValue({ docs });

		const result = await retrieveProducts("products");

		expect(result).toEqual([
			{ id: "p1", name: "Produk A", price: 10000 },
			{ id: "p2", name: "Produk B", price: 20000 },
		]);
		expect(result.length).toBe(2);
	});

	it("error: melempar error saat getDocs gagal", async () => {
		firestore.getDocs.mockRejectedValue(new Error("get docs error"));

		await expect(retrieveProducts("products")).rejects.toThrow("get docs error");
	});
});

describe("retrieveDataByID", () => {
	it("success: mengembalikan detail data berdasarkan id", async () => {
		firestore.getDoc.mockResolvedValue({
			data: () => ({ name: "Produk A", price: 10000 }),
		});

		const result = await retrieveDataByID("products", "p1");

		expect(result).toEqual({ name: "Produk A", price: 10000 });
		expect(firestore.getDoc).toHaveBeenCalledTimes(1);
	});

	it("error: melempar error saat getDoc gagal", async () => {
		firestore.getDoc.mockRejectedValue(new Error("get doc error"));

		await expect(retrieveDataByID("products", "p1")).rejects.toThrow("get doc error");
	});
});

describe("getUserByEmail", () => {
	it("success: mengembalikan user jika ditemukan", async () => {
		firestore.getDocs.mockResolvedValue({
			docs: [{ id: "u1", data: () => ({ email: "user@mail.com", role: "user" }) }],
		});

		const result = await getUserByEmail("user@mail.com");

		expect(result).toEqual([{ id: "u1", email: "user@mail.com", role: "user" }]);
		expect(result.length).toBe(1);
	});

	it("success: mengembalikan array kosong jika tidak ada user", async () => {
		firestore.getDocs.mockResolvedValue({ docs: [] });

		const result = await getUserByEmail("none@mail.com");

		expect(result).toEqual([]);
		expect(result.length).toBe(0);
	});
});

describe("saveUser", () => {
	it("success: create data user", async () => {
		const payload = { email: "test@mail.com", fullname: "Tester" };
		const expected = { id: "u1" };
		firestore.addDoc.mockResolvedValue(expected);

		const result = await saveUser(payload);

		expect(result).toEqual(expected);
		expect(firestore.addDoc).toHaveBeenCalledWith("collection:users", payload);
		expect(firestore.addDoc.mock.calls.length).toBe(1);
	});

	it("error: melempar error saat create gagal", async () => {
		const payload = { email: "test@mail.com" };
		firestore.addDoc.mockRejectedValue(new Error("create failed"));

		await expect(saveUser(payload)).rejects.toThrow("create failed");
	});
});

describe("updateUser", () => {
	it("success: update data user", async () => {
		const resultExpected = { ok: true };
		firestore.updateDoc.mockResolvedValue(resultExpected);

		const result = await updateUser("u1", { fullname: "Updated Name" });

		expect(result).toEqual(resultExpected);
		expect(firestore.updateDoc).toHaveBeenCalledWith("doc:users:u1", {
			fullname: "Updated Name",
		});
		expect(firestore.updateDoc.mock.calls.length).toBe(1);
	});

	it("error: melempar error saat update gagal", async () => {
		firestore.updateDoc.mockRejectedValue(new Error("update failed"));

		await expect(updateUser("u1", { fullname: "X" })).rejects.toThrow("update failed");
	});
});

describe("deleteUser", () => {
	it("success: delete data user", async () => {
		firestore.deleteDoc.mockResolvedValue(undefined);

		const result = await deleteUser("u1");

		expect(result).toBe(undefined);
		expect(firestore.deleteDoc).toHaveBeenCalledWith("doc:users:u1");
		expect(firestore.deleteDoc.mock.calls.length).toBe(1);
	});

	it("error: melempar error saat delete gagal", async () => {
		firestore.deleteDoc.mockRejectedValue(new Error("delete failed"));

		await expect(deleteUser("u1")).rejects.toThrow("delete failed");
	});
});

describe("signIn", () => {
	it("success: mengembalikan user pertama", async () => {
		firestore.getDocs.mockResolvedValue({
			docs: [{ id: "u1", data: () => ({ email: "user@mail.com", role: "user" }) }],
		});

		const result = await signIn("user@mail.com");

		expect(result).toEqual({ id: "u1", email: "user@mail.com", role: "user" });
	});

	it("empty: mengembalikan undefined jika user tidak ada", async () => {
		firestore.getDocs.mockResolvedValue({ docs: [] });

		const result = await signIn("none@mail.com");

		expect(result).toBe(undefined);
	});
});

describe("signUp", () => {
	it("branch if: callback error saat email sudah ada", async () => {
		const callback = jest.fn();
		firestore.getDocs.mockResolvedValue({
			docs: [{ id: "u1", data: () => ({ email: "exist@mail.com" }) }],
		});

		await signUp(
			{ email: "exist@mail.com", fullname: "User", password: "123456" },
			callback,
		);

		expect(callback).toHaveBeenCalledWith({
			status: "error",
			message: "Email already exists",
		});
		expect(callback.mock.calls.length).toBe(1);
	});

	it("branch else success: hash password lalu simpan user", async () => {
		const callback = jest.fn();
		firestore.getDocs.mockResolvedValue({ docs: [] });
		bcryptMock.default.hash.mockResolvedValue("hashed-password");
		firestore.addDoc.mockResolvedValue({ id: "u2" });

		await signUp(
			{ email: "new@mail.com", fullname: "New User", password: "123456" },
			callback,
		);

		expect(bcryptMock.default.hash).toHaveBeenCalledWith("123456", 10);
		expect(callback).toHaveBeenCalledWith({
			status: "success",
			message: "User registered successfully",
		});
		expect(callback.mock.calls.length).toBe(1);
	});

	it("branch else catch: callback error saat simpan user gagal", async () => {
		const callback = jest.fn();
		firestore.getDocs.mockResolvedValue({ docs: [] });
		bcryptMock.default.hash.mockResolvedValue("hashed-password");
		firestore.addDoc.mockRejectedValue(new Error("add user failed"));

		await signUp(
			{ email: "new@mail.com", fullname: "New User", password: "123456" },
			callback,
		);

		expect(callback).toHaveBeenCalledWith({
			status: "error",
			message: "add user failed",
		});
		expect(callback.mock.calls.length).toBe(1);
	});
});

describe("signInWithGoogle", () => {
	it("branch if: update user lama saat email sudah ada", async () => {
		const callback = jest.fn();
		const userData: { email: string; fullname: string; role?: string } = {
			email: "google@mail.com",
			fullname: "Google User",
		};
		firestore.getDocs.mockResolvedValue({
			docs: [{ id: "u1", data: () => ({ role: "admin" }) }],
		});
		firestore.updateDoc.mockResolvedValue(undefined);

		await signInWithGoogle(userData, callback);

		expect(firestore.updateDoc).toHaveBeenCalled();
		expect(userData.role).toBe("admin");
		expect(callback).toHaveBeenCalledWith({
			status: true,
			message: "User registered and logged in with Google",
			data: userData,
		});
	});

	it("branch else: simpan user baru jika belum ada", async () => {
		const callback = jest.fn();
		const userData: { email: string; fullname: string; role?: string } = {
			email: "new-google@mail.com",
			fullname: "New Google",
		};
		firestore.getDocs.mockResolvedValue({ docs: [] });
		firestore.addDoc.mockResolvedValue({ id: "u2" });

		await signInWithGoogle(userData, callback);

		expect(firestore.addDoc).toHaveBeenCalled();
		expect(userData.role).toBe("member");
		expect(callback).toHaveBeenCalledWith({
			status: true,
			message: "User registered and logged in with Google",
			data: userData,
		});
	});

	it("catch: callback false saat proses gagal", async () => {
		const callback = jest.fn();
		firestore.getDocs.mockRejectedValue(new Error("google login failed"));

		await signInWithGoogle({ email: "err@mail.com" }, callback);

		expect(callback).toHaveBeenCalledWith({
			status: false,
			message: "Failed to register user with Google",
		});
		expect(callback.mock.calls.length).toBe(1);
	});
});
