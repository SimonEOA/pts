import GameSelect from "@/components/gameSelect";
import Header from "@/components/header";
import { WebPlayback } from "@/components/webPlayback";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState("bg-red-800");
  const [opacity, setOpacity] = useState("bg-opacity-0");

  const { data: session, status } = useSession();

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
      <div className={`h-20 ${selectedIndex}`}>
        <Header selectedIndex={selectedIndex} opacity={opacity}></Header>
      </div>
      <GameSelect
        selectedIndex={selectedIndex}
        bgColors={bgColors}
        onEnter={updateColor}
      ></GameSelect>
      {session && <WebPlayback token={session.user.accessToken} />}
    </div>
  );
}
