// import React from 'react';
import { observer } from "mobx-react-lite";
import store from "../../store/store";

const BtnStart = observer(() => {
  return (
    <div className="flex justify-center pb-4">
      {store.start ? (
        <button
          onClick={() => {
            store.setStart(false);
          }}
          className="w-[126px] h-[53px] font-maven-pro font-medium rounded-full text-white text-xl bg-gradient-to-b from-[#c5456b] to-[#ff5e00]"
        >
          Stop
        </button>
      ) : (
        <button
          onClick={() => {
            store.setStart(true);
          }}
          className="w-[126px] h-[53px] font-maven-pro font-medium rounded-full text-black text-xl bg-gradient-to-b from-[#74F3EC] to-[#00FF99]"
        >
          Start
        </button>
      )}
    </div>
  );
});

export default BtnStart;
