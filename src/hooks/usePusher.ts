import { useSession } from "next-auth/react";
import Pusher, { Channel } from "pusher-js";
import { useEffect, useRef, useState } from "react";

export const usePusher = () => {
  const pusherRef = useRef<Pusher>();
  const channelRef = useRef<Channel>();
  const [lobbyMembers, setLobbyMembers] = useState<lobbyMember[]>([]);
  const [chatMessages, setChatMessages] = useState<chatMessage[]>([]);
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
  }, [session, session?.user.name]);

  const onSubscribe = (input: string) => {
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

      channelRef.current.bind("chat-update", function (data) {
        const { username, message } = data;
        console.log(message);
        setChatMessages((prevState) => [
          ...prevState,
          { member: username, message },
        ]);
      });
    }
  };

  return { pusherRef, channelRef, lobbyMembers, chatMessages, onSubscribe };
};
