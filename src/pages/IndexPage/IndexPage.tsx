// import { Section, Cell, Image } from "@telegram-apps/telegram-ui";
// import { Cell } from "@telegram-apps/telegram-ui";

// import { Link } from "@/components/Link/Link.tsx";
import { observer } from "mobx-react-lite";
// import store from "../../store/store";
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

export const IndexPage: FC = observer(() => {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);
  console.log(initDataRaw);
  // console.log(initDataState);
  // const tg = window.Telegram.WebApp;
  // console.log(tg, 'tg!')
  console.log(import.meta.env.VITE_API_URL)

  return (
    <Page back={false}>
      <div className="bg-gray-800 min-h-screen flex items-center justify-center">
        <div className="relative bg-[#1A1A1A] w-full sm:max-w-[360px] h-[100vh] md:h-[830px]">
          <div className="p-4">
            <Header ava={initDataState?.user?.photo_url} />
            <Slipper />
            <GiftCards />
            <ProgressBar />
            <div className="absolute w-full -bottom-1/12 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1A1A1A] h-1/6">
              <BtnStart />
              <Footer />
            </div>
          </div>
        </div>
      </div>
      {/* <MotionSensorApp/> */}
      <MotionSensorComponent />
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
