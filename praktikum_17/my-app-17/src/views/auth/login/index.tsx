import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    
    // event.preventDefault();
    // const form = event.currentTarget;
    // const formData = new FormData(event.currentTarget);
    // const email = formData.get("email") as string;
    // const fullname = formData.get("Fullname") as string;
    // const password = formData.get("Password") as string;

    try {
        const res = await signIn("credentials", {
            redirect: false,
            email: event.target.email.value,
            password: event.target.password.value,
            callbackUrl,
    });
    // validasi email dan password
    if (!res?.error) {
      setIsLoading(false);
      push(callbackUrl);
    } else {
        setIsLoading(false);
        setError(res?.error || "Login failed");
    } 
    } catch (error) {
        setIsLoading(false);
        setError("wrong email or password");
    }
};
  
  return (
    <>
    <div className={style.login}>
      {/* modifikasi line 41 */}
      {error && <p className={style.login__form__error}>{error}</p>}
      <h1 className={style.login__title}>Halaman login</h1>

      <div className={style.login__form}>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className={style.login__form__item}>
            <label
              htmlFor="email"
              className={style.login__form__item__label}
            >
              Email 
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={style.login__form__item__input}
            />
          </div>

          {/* Fullname */}
          {/* <div className={style.login__form__item}>
            <label
              htmlFor="Fullname"
              className={style.login__form__item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.login__form__item__input}
            />
          </div> */}

          {/* Password */}
          <div className={style.login__form__item}>
            <label
              htmlFor="Password"
              className={style.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className={style.login__form__item__input}
            />
          </div>

          {/* Button login */}
          <button
            type="submit"
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "login"}
          </button>

        <br /> <br />
        <button
        onClick={() => signIn("google", {callbackUrl, redirect: false })}
        className={style.login__form__item__button}
          disabled={isLoading}
          >
            {isLoading ? "Loading..." : "sign in with google"}
        </button>
        </form>

        {/* Halaman login */}
        <br />
        <p className={style.login__form__item__text}>
          Tidak punya akun? <Link href="/auth/register">Ke Halaman Register </Link>
        </p>
      </div>
      {/* Form selesai disini */}

    </div>
    </>
  );
};

export default TampilanLogin;
