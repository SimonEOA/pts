import { SetStateAction, useState } from "react";

const JoinCreateRoom = () => {
  const [input, setInput] = useState<string>("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
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
      <button type="button" className=" w-1/3 rounded-md bg-red-700">
        Submit
      </button>
    </div>
  );
};

export default JoinCreateRoom;
