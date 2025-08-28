// // import { Cell, Image } from "@telegram-apps/telegram-ui";

// // import { Link } from "@/components/Link/Link.tsx";
// // import { Routes, Route } from "react-router-dom";
// import { observer } from "mobx-react-lite";
// // import store from "../../store/store";
// import { Page } from "@/components/Page.tsx";

// // import tonSvg from "./ton.svg";

// // import Main from "@/pages/MainPage/Main";
// // import Tasks from "@/pages/Tasks/Tasks";
// // import Roulette from "@/pages/Roulette/Roulette";
// // import Reff from "@/pages/Reff/Reff";

// import { useEffect, type FC } from "react";
// import {
//   initDataRaw as _initDataRaw,
//   initDataState as _initDataState,
//   // type User,
//   useSignal,
// } from "@telegram-apps/sdk-react";

// // import { List, Placeholder } from "@telegram-apps/telegram-ui";

// // import {
// //   DisplayData,
// //   type DisplayDataRow,
// // } from "@/components/DisplayData/DisplayData.tsx";

// // function getUserRows(user: User): DisplayDataRow[] {
// //   return Object.entries(user).map(([title, value]) => ({ title, value }));
// // }
// // import { useState, useEffect } from 'react';
// // import Websocket from "@/components/websocket";

// export const IndexPage: FC = observer(() => {
//   const initDataRaw = useSignal(_initDataRaw);
//   const initDataState = useSignal(_initDataState);
//   console.log(initDataRaw);
//   console.log(initDataState);
//   store.setUser(initDataState?.user);
//   store.setUser(initDataRaw);
//   // const tg = window.Telegram.WebApp;
//   // console.log(tg, 'tg!')

//   // const UserData = {
//   //   queryId: initDataState?.query_id || null,
//   //   user: {
//   //     id: initDataState?.user?.id,
//   //     firstName: initDataState?.user?.first_name,
//   //     lastName: initDataState?.user?.last_name,
//   //     languageCode: initDataState?.user?.language_code,
//   //     allowsWriteToPm: initDataState?.user?.allows_write_to_pm,
//   //     photoUrl: initDataState?.user?.photo_url,
//   //   },
//   //   chatInstance: initDataState?.chat_instance,
//   //   chatType: initDataState?.chat_type,
//   //   authDate: initDataState?.auth_date,
//   //   signature: initDataState?.signature,
//   //   hash: initDataState?.hash,
//   // };

//   // const UserData = {
//   //   queryId: "AAGxlXUwAAAAALGVdTANicQZ",
//   //   user: {
//   //     id: 813012401,
//   //     firstName: "Wowa",
//   //     lastName: "ZZzzz",
//   //     languageCode: "ru",
//   //     allowsWriteToPm: true,
//   //     photoUrl:
//   //       "https://t.me/i/userpic/320/suxwv-xayl6LkQDl3kF8Cv8zMVLf88FUSFHhWTbdECU.svg",
//   //   },
//   //   chatInstance: "-213971902754402266",
//   //   chatType: "sender",
//   //   authDate: 1754314558,
//   //   signature:
//   //     "A7xoVUHPtMtGOo2Sd09eSq5d2-jGOjx9CoAeifX3Ip9KjCj91SomasSAxvrvyYq90mDiuvmIzKyJzu404L5xBQ",
//   //   hash: "f74ef203b68a7f59c003907009711da72f2b29144c68e3a2c77f11689af6821e",
//   // };

//   // МАЯЧОК №1: Проверяем, что компонент вообще отрисовывается.
//   console.log("1. Компонент IndexPage отрисован.");

//   // useEffect для обновления store остается, он нам не мешает.
//   useEffect(() => {
//     if (initDataState?.user) {
//       store.setUser(initDataRaw);
//     }
//   }, [initDataState?.user]);

//   // Главный useEffect для регистрации
//   useEffect(() => {
//     // МАЯЧОК №2: Проверяем, что этот useEffect вообще запускается.
//     console.log("2. Запускается useEffect для регистрации...");

//     // МАЯЧОК №3: САМЫЙ ВАЖНЫЙ. Проверяем, какое значение у initDataRaw.
//     console.log("3. Значение initDataRaw:", initDataRaw);

//     if (!initDataRaw) {
//       console.log(
//         "-> Условие if (!initDataRaw) сработало. Выход из useEffect."
//       );
//       return;
//     }

//     // МАЯЧОК №4: Проверяем, что мы прошли проверку if.
//     console.log("4. Проверка пройдена, готовимся к отправке fetch...");

//     const requestBody = {
//       initData: initDataRaw,
//     };

//     const domain = import.meta.env.VITE_API_URL;
//     // МАЯЧОК №5: Проверяем, что переменная окружения прочиталась.
//     console.log("5. VITE_API_URL:", domain);

//     // МАЯЧОК №6: Последний шаг перед отправкой.
//     console.log("6. Отправляем запрос с телом:", requestBody);

//     fetch(domain + `/api/v1/users/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           console.error(`Ошибка от сервера: ${response.status}`);
//           return response.text().then((text) => {
//             throw new Error(text);
//           });
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Успешный ответ от сервера:", data);
//       })
//       .catch((error) => {
//         console.error("Ошибка при отправке запроса:", error);
//       });
//   }, [initDataRaw]);

//   useEffect(() => {
//     fetch(
//       `https://toncenter.com/api/v2/getAddressBalance?address=UQDncYGSo8oA2jQVZwolIiTdylIE4QAeNtrpkmwW9sYjX0bB`
//     )
//       .then((response) => response.json())
//       .then((data) => store.setTons(data.result))
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <Page back={false}>
//       <div className="bg-gray-800 min-h-screen flex items-center justify-center">
//         <Main />
//       </div>

//       {/* <Websocket /> */}
//       {/* <Link to="/ton-connect">
//         <Cell
//           before={<Image src={tonSvg} style={{ backgroundColor: "#007AFF" }} />}
//           subtitle="Connect your TON wallet"
//         >
//           TON Connect
//         </Cell>
//       </Link> */}
//       {/* <LocationComponent /> */}

//       {/* <Link to="/tasks">
//         <Tasks />
//       </Link>
//       <Link to="/roulette">
//         <Roulette />
//       </Link>
//       <Link to="/reff">
//         <Reff />
//       </Link> */}
//       {/* <List>
//         <Section
//           header="Features"
//           footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
//         >
//           <Link to="/ton-connect">
//             <Cell
//               before={
//                 <Image src={tonSvg} style={{ backgroundColor: "#007AFF" }} />
//               }
//               subtitle="Connect your TON wallet"
//             >
//               TON Connect
//             </Cell>
//           </Link>
//         </Section>
//         <Section
//           header="Application Launch Data"
//           footer="These pages help developer to learn more about current launch information"
//         >
//           <Link to="/init-data">
//             <Cell subtitle="User data, chat information, technical data">
//               Init Data
//             </Cell>
//           </Link>
//           <Link to="/launch-params">
//             <Cell subtitle="Platform identifier, Mini Apps version, etc.">
//               Launch Parameters
//             </Cell>
//           </Link>
//           <Link to="/theme-params">
//             <Cell subtitle="Telegram application palette information">
//               Theme Parameters
//             </Cell>
//           </Link>
//         </Section>
//       </List> */}
//     </Page>
//   );
// });
