// import React from 'react';
import { observer } from "mobx-react-lite";
import store from "../../store/store";
// import { useEffect, useState } from "react";
import { Link } from "@/components/Link/Link.tsx";

const Header = observer(({ ava }: any) => {
  return (
    <header className="flex justify-between">
      <div className="relative pr-4">
        <div className="rounded-full w-[50px] h-[50px] flex items-center justify-center overflow-hidden">
          <img
            src={
              ava
                ? ava
                : "https://9qhr1l4qpuouftdm.public.blob.vercel-storage.com/assets/ava.png"
            }
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-9 left-4">
          <span className="text-[#00FF99] bg-[#2B2A2A] text-xs font-maven-pro pt-0.5 pb-0.5 pr-2 pl-2 rounded-2xl">
            {store.steps}
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex flex-row">
          <div className="flex items-center space-x-1">
            <img
              src="https://9qhr1l4qpuouftdm.public.blob.vercel-storage.com/assets/image.png"
              alt=""
              className="w-5 h-5"
            />
            <span className="text-white text-xs font-maven-pro font-medium pr-2">
              {store.tonBalance}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <img
              src="https://9qhr1l4qpuouftdm.public.blob.vercel-storage.com/assets/coin.png"
              alt="Coins"
              className="w-5 h-5"
            />
            <span className="text-white text-xs font-maven-pro font-medium pr-2">
              {store.coins}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <img
              src="https://9qhr1l4qpuouftdm.public.blob.vercel-storage.com/assets/map.png"
              alt="Energy"
              className="w-5 h-5"
            />
            <span className="text-white text-xs font-maven-pro font-medium pr-2">
              23.45
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Link to="/ton-connect">
          <div className="bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#2B2A2A" />
              <path
                d="M29.45 21.64V22.64C29.45 22.91 29.24 23.13 28.96 23.14H27.5C26.97 23.14 26.49 22.75 26.45 22.23C26.42 21.92 26.54 21.63 26.74 21.43C26.92 21.24 27.17 21.14 27.44 21.14H28.95C29.24 21.15 29.45 21.37 29.45 21.64Z"
                fill="white"
              />
              <path
                d="M25.99 20.69C25.49 21.18 25.25 21.91 25.45 22.67C25.71 23.6 26.62 24.19 27.58 24.19H28.45C29 24.19 29.45 24.64 29.45 25.19V25.38C29.45 27.45 27.76 29.14 25.69 29.14H14.21C12.14 29.14 10.45 27.45 10.45 25.38V18.65C10.45 17.42 11.04 16.33 11.95 15.65C12.58 15.17 13.36 14.89 14.21 14.89H25.69C27.76 14.89 29.45 16.58 29.45 18.65V19.09C29.45 19.64 29 20.09 28.45 20.09H27.43C26.87 20.09 26.36 20.31 25.99 20.69Z"
                fill="white"
              />
              <path
                d="M24.2 12.82C24.47 13.09 24.24 13.51 23.86 13.51L16.18 13.5C15.74 13.5 15.51 12.96 15.83 12.65L17.45 11.02C18.82 9.66 21.04 9.66 22.41 11.02L24.16 12.79C24.17 12.8 24.19 12.81 24.2 12.82Z"
                fill="white"
              />
            </svg>
          </div>
        </Link>
      </div>
    </header>
  );
});

export default Header;
