// import { Section, Cell, Image } from "@telegram-apps/telegram-ui";
// import { Cell } from "@telegram-apps/telegram-ui";

// import { Link } from "@/components/Link/Link.tsx";
import { Page } from "@/components/Page.tsx";

// import tonSvg from "./ton.svg";

import Footer from "@/components/MainPage/Footer";
import GiftCards from "@/components/MainPage/GiftCards";
import Header from "@/components/MainPage/Header";
import ProgressBar from "@/components/MainPage/ProgressBar";
import Slipper from "@/components/MainPage/Slipper";
import BtnStart from "@/components/MainPage/BtnStart";

import { type FC } from "react";
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  // type User,
  useSignal,
} from "@telegram-apps/sdk-react";
// import MotionSensorApp from "@/components/Sensors/MotionSensorApp";
import MotionSensorComponent from "@/components/Sensors/MotionSensorComponent";
// import { useTelegramLocation } from "@/components/Sensors/useTelegramLocation";
import { LocationComponent } from "@/components/Sensors/useTelegramLocation";
// import { List, Placeholder } from "@telegram-apps/telegram-ui";

// import {
//   DisplayData,
//   type DisplayDataRow,
// } from "@/components/DisplayData/DisplayData.tsx";

// function getUserRows(user: User): DisplayDataRow[] {
//   return Object.entries(user).map(([title, value]) => ({ title, value }));
// }

export const IndexPage: FC = () => {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);
  console.log(initDataRaw);

  return (
    <Page back={false}>
      <div className="bg-gray-800 min-h-screen flex items-center justify-center">
        <div className="relative bg-[#1A1A1A] w-full sm:max-w-[360px] h-[100vh] md:h-[830px]">
          <div className="p-4">
            <Header ava={initDataState?.user?.photo_url}/>
            {/* <div className="pt-4 text-amber-300">
              <p>{initDataState?.user?.id}</p>
              <p>{initDataState?.user?.first_name}</p>
              <p>{initDataState?.user?.last_name}</p>
              <p>{initDataState?.auth_date.getTime()}</p>
              <p>{initDataState?.user?.language_code}</p>
              <p>
                {initDataState?.user?.photo_url}
              </p>
              <p className="text-white">{initDataRaw}</p>
            </div> */}
            <Slipper />
            <GiftCards />
            <ProgressBar />
            <div className="absolute w-10/12 -bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <BtnStart />
              <Footer />
            </div>
          </div>
        </div>
      </div>
      <MotionSensorComponent/>
      <LocationComponent />
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
};
