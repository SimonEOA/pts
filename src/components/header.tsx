import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Header = ({
  selectedIndex,
  opacity,
}: {
  selectedIndex: any;
  opacity: any;
}) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleSignIn = () => {};

  const handleMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div
      className={`transition-all duration-500 fixed w-full z-20 top-0 left-0 ${selectedIndex} h-20 flex flex-row justify-end`}
    >
      {session ? (
        <div className="flex flex-col">
          <button
            onClick={handleMenuClick}
            className=" bg-zinc-900 h-fit w-fit flex items-center p-0.5 rounded-full text-white gap-1 hover:bg-zinc-700 "
          >
            <div className=" h-8 w-8 flex ">
              <Image
                src={session.user.image ?? ""}
                height={2000}
                width={2000}
                alt={""}
                className={" rounded-full "}
              />
            </div>
            <div className=" hidden lg:inline-flex">
              <p>{session.user.name}</p>
              {openMenu ? (
                <IoMdArrowDropup
                  className="h-6 w-6"
                  aria-hidden="true"
                ></IoMdArrowDropup>
              ) : (
                <IoMdArrowDropdown
                  className="h-6 w-6"
                  aria-hidden="true"
                ></IoMdArrowDropdown>
              )}
            </div>
          </button>
          {openMenu && (
            <div className=" w-36 bg-zinc-700 ">
              {" "}
              <button onClick={() => signOut()}>Log out</button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => signIn()}>Log in with Spotify</button>
      )}
    </div>
  );
};

export default Header;
