import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./register.module.css";

const TampilanRegister = () => {
  const { push } = useRouter();

  const handleRegister = () => {
    // Simulasi register berhasil
    alert("Register Berhasil!");

    // Setelah register akan menuju ke halaman login
    push("/auth/login");
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.title}>Halaman Register</h1>

      <input 
        type="text" 
        placeholder="Username" 
        className={styles.input} 
      />

      <input 
        type="email" 
        placeholder="Email" 
        className={styles.input} 
      />

      <input 
        type="password" 
        placeholder="Password" 
        className={styles.input} 
      />

      <button onClick={handleRegister} className={styles.button}>
        Register
      </button>

      <p className={styles.text}>
        Sudah punya akun?
      </p>

      <Link href="/auth/login">Ke Halaman Login</Link>
    </div>
  );
};

export default TampilanRegister;