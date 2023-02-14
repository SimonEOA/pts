import Canvas from "@/components/canvas";
import { useSpotify } from "@/hooks/useSpotify";
import { channel } from "diagnostics_channel";
import { useSession } from "next-auth/react";
import Pusher, { Channel } from "pusher-js";
import { useEffect, useRef, useState } from "react";

type lobbyMember = {
  userId: string;
  name: string;
};

const Home = () => {
  const parentDivRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [input, setInput] = useState<string>("");
  const pusherRef = useRef<Pusher>();
  const channelRef = useRef<Channel>();
  const [lobbyMembers, setLobbyMembers] = useState<lobbyMember[]>([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    pusherRef.current;
    if (!pusherRef.current && session) {
      console.log(session?.user.name);
      console.log(pusherRef.current);
      pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: "eu",
        userAuthentication: {
          endpoint: `../api/auth/pushuser`,
          transport: "ajax",
          params: {
            username: session?.user.name,
          },
        },
        channelAuthorization: {
          endpoint: `../api/auth/pushchannel`,
          transport: "ajax",
        },
      });
      pusherRef.current.signin();
    }
  }, [session?.user.name]);

  const getParentSize = () => {
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

  const playSpotify = async () => {};

  const handleChange = (input: string) => {
    setInput(input);
    console.log(pusherRef.current);
  };

  const onSubmit = () => {
    if (pusherRef.current) {
      channelRef.current = pusherRef.current.subscribe("presence-" + input);

      // when a new member successfully subscribes to the channel
      channelRef.current.bind("pusher:subscription_succeeded", (members) => {
        members.each((member) => {
          // For example
          setLobbyMembers((curr) => [
            ...curr,
            { userId: member.id, name: member.info.name },
          ]);
        });
      });

      channelRef.current.bind("pusher:member_added", (member: any) => {
        setLobbyMembers((members) => [
          ...members,
          { userId: member.id, name: member.info.name },
        ]);
      });

      channelRef.current.bind("pusher:member_removed", (member) => {
        setLobbyMembers((members) =>
          members.filter((el) => el.userId !== member.id)
        );
      });
    }
    console.log(channelRef.current);
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
      <div className=" row-span-3 bg-teal-600">
        <form>
          <input
            placeholder="Write channel name"
            onChange={(e) => handleChange(e.target.value)}
          ></input>
        </form>
        <button onClick={onSubmit}>Submit</button>
      </div>
      <div className=" col-span-full bg-blue-700">
        <button onClick={playSpotify}>get tracks</button>
      </div>
    </div>
  );
};

export default Home;
