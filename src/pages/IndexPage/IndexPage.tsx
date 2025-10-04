// import { Section, Cell, Image } from "@telegram-apps/telegram-ui";
// import { Cell } from "@telegram-apps/telegram-ui";

// import { Link } from "@/components/Link/Link.tsx";
import { observer } from "mobx-react-lite";
import store from "../../store/store";
import { Page } from "@/components/Page.tsx";

// import tonSvg from "./ton.svg";

import Footer from "@/components/MainPage/Footer";
import GiftCards from "@/components/MainPage/GiftCards";
import Header from "@/components/MainPage/Header";
import ProgressBar from "@/components/MainPage/ProgressBar";
import Slipper from "@/components/MainPage/Slipper";
import BtnStart from "@/components/MainPage/BtnStart";

import { useEffect, type FC } from "react";
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  // type User,
  useSignal,
} from "@telegram-apps/sdk-react";
// import MotionSensorApp from "@/components/Sensors/MotionSensorApp";
import MotionSensorComponent from "@/components/Sensors/MotionSensorComponent";

// import { useTelegramLocation } from "@/components/Sensors/useTelegramLocation";
// import { LocationComponent } from "@/components/Sensors/useTelegramLocation";
// import MotionSensorApp from "@/components/Sensors/MotionSensorApp";
// import { List, Placeholder } from "@telegram-apps/telegram-ui";

// import {
//   DisplayData,
//   type DisplayDataRow,
// } from "@/components/DisplayData/DisplayData.tsx";

// function getUserRows(user: User): DisplayDataRow[] {
//   return Object.entries(user).map(([title, value]) => ({ title, value }));
// }
// import { useState, useEffect } from 'react';
import Websocket from "@/components/websocket";
// import WebSocketComponent from "@/components/WebSocketComponent";

export const IndexPage: FC = observer(() => {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);
  console.log(initDataRaw);
  console.log(initDataState?.user);
  store.setUser(initDataState?.user);
  // const tg = window.Telegram.WebApp;
  // console.log(tg, 'tg!')
  useEffect(() => {
    fetch(
      `https://toncenter.com/api/v2/getAddressBalance?address=UQDncYGSo8oA2jQVZwolIiTdylIE4QAeNtrpkmwW9sYjX0bB`
    )
      .then((response) => response.json())
      .then((data) => store.setTons(data.result))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Page back={false}>
      <div className="bg-gray-800 min-h-screen flex items-center justify-center">
        <div className="relative bg-[#1A1A1A] w-full sm:max-w-[360px] h-[100vh] md:h-[830px]">
          <div className="z-10 sticky top-0 p-4 bg-[#1A1A1A]">
            {/* <Link to="/ton-connect"> */}
            <Header ava={initDataState?.user?.photo_url} />
            {/* </Link> */}
          </div>

            <div >
    <div>
      <picture>
        <source type="application/x-tgsticker" srcSet="https://cdn4.telesco.pe/file/sticker.tgs?token=RgHQ8jDP351yYmQs2meIgvIRxo32ribjBcwzUseHOlMQHXeeW2Aqi2An-XPGLl3D-1b6nPluCEwAUesiip4qdYQZbrGIfzxDDgxSkDbEQ0z7K14HJb0BJW-LpwFBEJ_eGqz7Lla0zV4eZpr2bZzS6gJhcetryov4WU8shjN2nJhC5twxczvLBSvX9zUdZ04VhWB6C-ioD4dds3SZl1qHIGrDGI6HV63KGkGgoLbrTFWEDHkKkDHc7uvyYGc9UGlwKRx5FDy4WcGmrhzVbKFuGyFV3Nt65Ql4qRH1PW3O6YHb1_vjjOUlr5VhKXfSLgV7DGkkUjM-ff-y2qmtD1RPzA"></source>
        <source type="image/svg+xml" srcSet="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iLTMwMCUiIHgyPSItMjAwJSIgeTE9IjAiIHkyPSIwIj48c3RvcCBvZmZzZXQ9Ii0xMCUiIHN0b3Atb3BhY2l0eT0iLjEiLz48c3RvcCBvZmZzZXQ9IjMwJSIgc3RvcC1vcGFjaXR5PSIuMDciLz48c3RvcCBvZmZzZXQ9IjcwJSIgc3RvcC1vcGFjaXR5PSIuMDciLz48c3RvcCBvZmZzZXQ9IjExMCUiIHN0b3Atb3BhY2l0eT0iLjEiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ4MSIgZnJvbT0iLTMwMCUiIHRvPSIxMjAwJSIgZHVyPSIzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJ4MiIgZnJvbT0iLTIwMCUiIHRvPSIxMzAwJSIgZHVyPSIzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2cpIiBkPSJNMjYwLDQ4MWMtMjIsMS0xMjMsMi0xMzQtMjAtNi0xMywzNi0xOSw0MS0yMCwxNy0zLTEtNy05LTEyLTMtMy02LTUtOS03LTYxLTQ2LTczLTEyOS00OS0xOTcsNy0yMCwyMC0zOCwyNy01OCwxLTItMzAtNi0yNi0xNyw0LTEwLDQ0LTE2LDU0LTIyLDktNiwxNy0xOSwyNS0yNywzNS0zMyw5MS02NywxNDEtNDksMTA3LDQwLDEyMSwyMTQsODQsMzA1LTE2LDM4LTQzLDU4LTc0LDgzLTUsNCw1MCw1LDQzLDIxLTksMTgtOTQsMjAtMTE0LDIweiIvPjwvc3ZnPg=="></source>
        
      <canvas width="324" height="324"></canvas></picture>
    </div>
  </div>
          <div className="flex-1 overflow-y-auto p-4 bg-[#1A1A1A]">
            <Slipper />
            <GiftCards />

            <ProgressBar />

            {/* <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="bg-[#1A1A1A] p-3 text-white">
                  Item {i + 1}
                </div>
              ))}
            </div> */}
          </div>
          <div className="z-10 w-full sticky bottom-0 bg-[#1A1A1A] h-[140px] pt-2">
            <BtnStart />
            <div className="flex justify-center">
              <Footer />
            </div>
          </div>
        </div>
      </div>

      <Websocket />
      <MotionSensorComponent />
      {/* <Link to="/ton-connect">
        <Cell
          // before={
          //   <Image src={tonSvg} style={{ backgroundColor: "#007AFF" }} />
          // }
          subtitle="Connect your TON wallet"
        >
          TON Connect
        </Cell>
      </Link> */}
      {/* <LocationComponent /> */}

      {/* <Link to="/init-data">
        <Cell subtitle="User data, chat information, technical data">
          Init Data
        </Cell>
      </Link> */}
      {/* <List>
        <Section
          header="Features"
          footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
        >
          <Link to="/ton-connect">
            <Cell
              before={
                <Image src={tonSvg} style={{ backgroundColor: "#007AFF" }} />
              }
              subtitle="Connect your TON wallet"
            >
              TON Connect
            </Cell>
          </Link>
        </Section>
        <Section
          header="Application Launch Data"
          footer="These pages help developer to learn more about current launch information"
        >
          <Link to="/init-data">
            <Cell subtitle="User data, chat information, technical data">
              Init Data
            </Cell>
          </Link>
          <Link to="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">
              Launch Parameters
            </Cell>
          </Link>
          <Link to="/theme-params">
            <Cell subtitle="Telegram application palette information">
              Theme Parameters
            </Cell>
          </Link>
        </Section>
      </List> */}
    </Page>
  );
});
