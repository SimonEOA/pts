import { BsFillPlayCircleFill } from "react-icons/Bs";

const GameSelect = ({
  selectedIndex,
  bgColors,
  onEnter,
}: {
  selectedIndex: string;
  bgColors: string[];
  onEnter: (color: React.SetStateAction<string>) => void;
}) => {
  return (
    <div className={`transition-all duration-500 ${selectedIndex} h-screen`}>
      <div className=" bg-gradient-to-t from-stone-900 h-3/4 pt-5">
        <div className="px-14 h-full">
          <div className="flex justify-center w-full h-3/5 mb-5">
            <div className="bg-neutral-600/60 flex rounded-md w-1/3 h-full p-5 ">
              <div
                className={` w-full h-fill ${selectedIndex} transition-all duration-500`}
              ></div>
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
