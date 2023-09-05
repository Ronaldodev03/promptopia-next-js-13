"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { setCookie, deleteCookie } from "cookies-next";
const Nav = () => {
  const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const routes = useRouter();

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  const { data: session } = useSession();

  return (
    <nav className=" flex-between w-full mb-16 pt-3  ">
      {/* Got it. */}
      <Link href="/" className="gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className=" sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={() => {
                signOut();
                deleteCookie("logged");
              }}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt="profile"
                width={37}
                height={37}
                className=" rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                    setCookie("logged", "true");
                  }}
                  className="black_btn"
                >
                  Sing In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative ">
        {session?.user ? (
          <div className=" flex">
            {"  "}
            <Image
              src={session?.user.image}
              alt="profile"
              width={37}
              height={37}
              className=" rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)} // toggle the hambuger button for the menu.
            />
            {toggleDropdown ? (
              <div className="dropdown">
                <Link
                  href="profile"
                  className="dropdown_link "
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="create-prompt"
                  className="dropdown_link "
                  onClick={() => setToggleDropdown(false)}
                >
                  Create-Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                    deleteCookie("logged");
                  }}
                  className="mt-5 black_btn w-full"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                    setCookie("logged", "true");
                  }}
                  className="black_btn"
                >
                  Sing In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
