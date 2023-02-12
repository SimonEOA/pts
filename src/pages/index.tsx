import GameSelect from "@/components/gameSelect";
import Header from "@/components/header";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [selectedIndex, setSelectedIndex] = useState("bg-red-800");
  const [opacity, setOpacity] = useState("bg-opacity-0");

  const bgColors = [
    "bg-red-800",
    "bg-green-800",
    "bg-blue-800",
    "bg-yellow-800",
    "bg-purple-800",
    "bg-orange-800",
  ];
  const updateColor = (color: React.SetStateAction<string>) => {
    setSelectedIndex(color);
  };

  const ScrollPosition = useScrollPosition();

  useEffect(() => {
    setOpacity([selectedIndex, ScrollPosition].join("/"));
    console.log(opacity);
  }, [selectedIndex, ScrollPosition, opacity]);

  return (
    <div>
      {!session && (
        <>
          <h1>You are not signed in</h1> <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <div>
          <button onClick={() => signOut()}>sign out</button>
          <Header selectedIndex={selectedIndex} opacity={opacity}></Header>
          <GameSelect
            selectedIndex={selectedIndex}
            bgColors={bgColors}
            onEnter={updateColor}
          ></GameSelect>
        </div>
      )}
    </div>
  );
}
