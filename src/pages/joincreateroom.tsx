import { SetStateAction, useState } from "react";

const JoinCreateRoom = () => {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      onSubmit();
    }
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
  };
  return (
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
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default JoinCreateRoom;
