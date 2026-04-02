import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
} from "firebase/firestore";
import app from "./firebase";

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

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
  },
  callback: Function,
) {
  
  const q = query(
    collection(db, "users"),
    where("email", "==", userData.email),
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    // user sudah ada -> tidak boleh daftar
    callback({
      status: "error",
      message: "User already exists",
    });
  } else {
    // user belum ada -> boleh daftar
    await addDoc(collection(db, "users"), userData);
    callback({
      status: "success",
      message: "User registered successfully",
    });
  }
} 