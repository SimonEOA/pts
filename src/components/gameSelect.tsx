import { usePusher } from "@/hooks/usePusher";
import axios from "axios";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";

const GameSelect = ({
  selectedIndex,
  bgColors,
  onEnter,
}: {
  selectedIndex: string;
  bgColors: string[];
  onEnter: (color: React.SetStateAction<string>) => void;
}) => {
  const [input, setInput] = useState<string>("");
  const messageEl = useRef<HTMLDivElement>(null);

  const {
    pusherRef,
    channelRef,
    lobbyMembers,
    chatMessages,
    onSubscribe,
    session,
  } = usePusher();

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleKeyDown = async (e: { key: string }) => {
    if (e.key === "Enter") {
      const res = await axios.post("/api/pusher/chat-update", {
        message: input,
        member: session?.user.name,
        channelName: "",
      });
      setInput("");
      console.log(res);
    }
  };

  const handleSubscribe = (e: { key: string }) => {
    if (e.key === "Enter") {
      onSubscribe("");
    }
  };

  useEffect(() => {
    if (messageEl && messageEl.current) {
      const handleAutoScroll = (event: Event) => {
        const target = event.currentTarget as HTMLElement;
        target?.scroll({ top: target?.scrollHeight, behavior: "smooth" });
      };

      messageEl.current.addEventListener("DOMNodeInserted", handleAutoScroll);

      return () => {
        messageEl.current?.removeEventListener(
          "DOMNodeInserted",
          handleAutoScroll
        );
      };
    }
  }, [messageEl]);

  return (
    <div className={`transition-all duration-500 ${selectedIndex} h-screen`}>
      <div className=" bg-gradient-to-t from-stone-900 h-3/4 pt-5">
        <div className="px-14 h-full">
          <div className="flex justify-center w-full h-3/5 mb-5  gap-3">
            <div className="bg-neutral-600/70 flex rounded-md w-2/3 h-full p-5 ">
              <div
                className={` w-2/5 h-fill ${selectedIndex} transition-all duration-500`}
              >
                <div className=" row-span-4 bg-white flex flex-col">
                  {lobbyMembers.map((member) => {
                    return <div key={member.userId}>{member.name}</div>;
                  })}
                </div>
                <button onClick={() => onSubscribe("")}>Subscribe</button>
              </div>
            </div>
            <div className="bg-neutral-600/70 flex rounded-md w-1/4 h-full p-5 flex-col">
              <div
                className=" w-full mt-auto mb-0 overflow-y-auto"
                ref={messageEl}
              >
                {chatMessages.map((chatMessage, index) => {
                  return (
                    <div className=" text-gray-50" key={index}>
                      {chatMessage.member + ": " + chatMessage.message}
                    </div>
                  );
                })}
              </div>
              <input
                className=""
                placeholder="Write message..."
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={input}
              />
            </div>
          </div>
          <h2 className=" text-white font-bold text-4xl pb-6">Good evening</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-3">
            {bgColors.map((color, index) => (
              <div
                key={color}
                className={` h-24 w-fill bg-neutral-600/50 flex rounded-md hover:bg-neutral-500/50 group`}
                onMouseEnter={() => onEnter(color)}
              >
                <div
                  className={`h-24 ${color} w-24 mr-4 rounded-l-md shadow-lg shadow-zinc-900`}
                ></div>
                <div className=" grid place-content-center text-white font-bold text-xl mr-auto">
                  {color}
                </div>
                <div className=" hidden place-content-center mr-5 lg:grid">
                  <BsFillPlayCircleFill className=" grid place-content-center transition-all duration-100 w-14 h-14 text-green-600 bg-black  rounded-full shadow-lg shadow-zinc-800 opacity-0 group-hover:opacity-100 hover:scale-105" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-screen bg-stone-900"></div>
      <div className="h-screen bg-stone-900"></div>
    </div>
  );
};

export default GameSelect;
