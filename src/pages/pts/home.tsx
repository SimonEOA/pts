import Canvas from "@/components/canvas";
import { usePusher } from "@/hooks/usePusher";
import { useSpotify } from "@/hooks/useSpotify";
import axios from "axios";
import { channel } from "diagnostics_channel";
import { useSession } from "next-auth/react";
import Pusher, { Channel } from "pusher-js";
import { SetStateAction, useEffect, useRef, useState } from "react";

const Home = () => {
  const parentDivRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [input, setInput] = useState<string>("");

  const [messageToSend, setMessageToSend] = useState("");

  const { pusherRef, channelRef, lobbyMembers, chatMessages, onSubscribe } =
    usePusher();

  const getParentSize = () => {
    setHeight(parentDivRef.current?.clientHeight);
    setWidth(parentDivRef.current?.clientWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getParentSize);
    return () => {
      window.removeEventListener("resize", getParentSize);
    };
  }, [channelRef]);

  useEffect(() => {
    setHeight(parentDivRef.current?.clientHeight);
    setWidth(parentDivRef.current?.clientWidth);
  }, [parentDivRef]);

  const playSpotify = async () => {};

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      onSubscribe(input);
    }
  };

  const handleSubmit = async (e) => {
    if (e.key === "Enter") {
      const res = await axios.post("/api/pusher/chat-update", {
        message: messageToSend,
        member: "simon",
        channelName: input,
      });
      console.log(res);
    }
  };

  return (
    <div className=" grid grid-cols-[0.7fr_repeat(3,_1fr)_1.3fr] grid-rows-[0.5fr_repeat(3,_1fr)_0.8fr] gap-8 justify-center h-screen bg-stone-800">
      <div className=" row-span-4 bg-white flex flex-col">
        {lobbyMembers.map((member) => {
          return <div key={member.userId}>{member.name}</div>;
        })}
      </div>
      <div className=" col-span-4 bg-lime-800 "></div>
      <div
        ref={parentDivRef}
        className=" w-full h-full col-span-3 row-span-3 bg-yellow-400 flex justify-center items-center"
      >
        <Canvas height={height} width={width}></Canvas>
      </div>
      <div className=" row-span-3 bg-teal-600 flex flex-col">
        <div className=" w-full h-full bg-slate-300 ">
          {chatMessages.map((chatMessage) => {
            return (
              <div key={chatMessage.message}>
                {chatMessage.member + " " + chatMessage.message}
              </div>
            );
          })}
        </div>
        <input
          className=" "
          placeholder="Write message..."
          onChange={(e) => setMessageToSend(e.target.value)}
          onKeyDown={handleSubmit}
        />
      </div>
      <div className=" col-span-full bg-blue-700">
        <div>
          <input
            className="  w-2/3"
            placeholder="Write channel name"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className=" w-1/3 rounded-md bg-red-700"
            onClick={() => onSubscribe(input)}
          >
            Subscribe
          </button>
        </div>
        <button onClick={playSpotify}>get tracks</button>
      </div>
    </div>
  );
};

export default Home;
