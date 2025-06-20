// import React from 'react';

const GiftCard = ({ data }: any) => {
  return (
    <>
      <div className="relative">
        <div className="bg-[#2B2A2A] h-[120px] rounded-lg shadow-md p-4 flex flex-col items-center justify-center space-y-2">
          <div className="absolute top-3 left-2">{data.status}</div>
          {/* Gift img */}
          <div className="absolute top-7">
            <div className="w-[45px] h-[45px] flex items-center justify-center overflow-hidden">
              <img
                src={data.img}
                alt="gift"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Time */}
          <span className="absolute bottom-7 text-[10px] text-[#7A7A7A]">
            {data.time}
          </span>
          {/* Button */}
          <button className="absolute bottom-1 w-[94px] h-[30px] bg-transparent border-1 border-[#00FF99] from-[#74F3EC] to-[#00FF99] hover:bg-gradient-to-b hover:text-black transition-colors duration-300 ease-in-out rounded-xl text-[#00FF99]">
            Open
          </button>
        </div>
      </div>
    </>
  );
};

export default GiftCard;
