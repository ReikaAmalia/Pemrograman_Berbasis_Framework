import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

// fungsi reusable untuk cek user by email
// dipakai oleh signIn, signUp, dan signInWithGoogle agar tidak perlu tulis query berulang
export async function getUserByEmail(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
}

// fungsi reusable untuk simpan user baru ke database
export async function saveUser(userData: any) {
  return await addDoc(collection(db, "users"), userData);
}

// fungsi reusable untuk update data user di database
export async function updateUser(id: string, userData: any) {
  return await updateDoc(doc(db, "users", id), userData);
}

export async function deleteUser(id: string) {
  return await deleteDoc(doc(db, "users", id));
}

export async function signIn(email: string) {
  // refactor: pakai getUserByEmail agar tidak duplikasi query
  const data = await getUserByEmail(email);
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    role?: string;
  },
  callback: Function,
) {
  // refactor: pakai getUserByEmail agar tidak duplikasi query
  const data = await getUserByEmail(userData.email);

  if (data.length > 0) {
    callback({
      status: "error",
      message: "Email already exists",
    });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "user";
    // refactor: pakai saveUser agar tidak duplikasi addDoc
    await saveUser(userData)
      .then(() => {
        callback({
          status: "success",
          message: "User registered successfully",
        });
      })
      .catch((error) => {
        callback({
          status: "error",
          message: error.message,
        });
      });
  }
}

// fungsi untuk simpan/update data user Google ke Firestore
export async function signInWithGoogle(userData: any, callback: any) {
  try {
    // refactor: pakai getUserByEmail agar tidak duplikasi query
    const data: any = await getUserByEmail(userData.email);

    if (data.length > 0) {
      // user sudah ada → ambil role lama lalu update data
      userData.role = data[0].role;
      // refactor: pakai updateUser agar tidak duplikasi updateDoc
      await updateUser(data[0].id, userData);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: userData,
      });
    } else {
      // user baru → set role member lalu simpan ke database
      userData.role = "member";
      // refactor: pakai saveUser agar tidak duplikasi addDoc
      await saveUser(userData);
      callback({
        status: true,
        message: "User registered and logged in with Google",
        data: userData,
      });
    }
  } catch (error: any) {
    callback({
      status: false,
      message: "Failed to register user with Google",
    });
  }
}