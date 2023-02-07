import Canvas from "@/components/canvas";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const parentDivRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();

  const getParentSize = () => {
    console.log("hej");
    setHeight(parentDivRef.current?.clientHeight);
    setWidth(parentDivRef.current?.clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getParentSize);
    return () => {
      window.removeEventListener("resize", getParentSize);
    };
  }, []);

  useEffect(() => {
    setHeight(parentDivRef.current?.clientHeight);
    setWidth(parentDivRef.current?.clientWidth);
  }, [parentDivRef]);

  return (
    <div className=" grid grid-cols-[0.7fr_repeat(3,_1fr)_1.3fr] grid-rows-[0.5fr_repeat(3,_1fr)_0.8fr] gap-8 justify-center h-screen bg-stone-800">
      <div className=" row-span-4 bg-white"></div>
      <div className=" col-span-4 bg-lime-800 "></div>
      <div
        ref={parentDivRef}
        className=" w-full h-full col-span-3 row-span-3 bg-yellow-400 flex justify-center items-center"
      >
        <Canvas height={height} width={width}></Canvas>
      </div>
      <div className=" row-span-3 bg-teal-600"></div>
      <div className=" col-span-full bg-blue-700"></div>
    </div>
  );
};

export default Home;
