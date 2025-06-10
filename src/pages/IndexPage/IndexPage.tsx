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
  // const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);
  // console.log(initDataRaw);

  return (
    <Page back={false}>
      <div className="bg-gray-800 min-h-screen flex items-center justify-center">
        <div className="relative bg-[#1A1A1A] w-full sm:max-w-[360px] h-[100vh] md:h-[830px]">
          <div className="md:absolute fixed w-full p-4 h-[80px] bg-[#1A1A1A] z-10">
            <Header ava={initDataState?.user?.photo_url} />
          </div>
          <div className="p-4 pt-20">
            <div className="">
              <Slipper />
            </div>
            <GiftCards />
            <ProgressBar />
          </div>
          <div className="md:absolute fixed w-full bg-[#1A1A1A] h-[140px] bottom-0">
            <div className="pt-2">
              <BtnStart />
            </div>
            <div className="flex justify-center ">
              <Footer />
            </div>
          </div>
        </div>
      </div>
      {/* <MotionSensorApp /> */}
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
