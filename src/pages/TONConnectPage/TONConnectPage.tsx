import { openLink } from "@telegram-apps/sdk-react";
import {
  TonConnectButton,
  useTonWallet,
  useTonAddress,
  // SendTransactionRequest,
} from "@tonconnect/ui-react";

import {
  Avatar,
  Cell,
  List,
  Navigation,
  Placeholder,
  Section,
  Text,
  Title,
} from "@telegram-apps/telegram-ui";
import type { FC } from "react";

import { DisplayData } from "@/components/DisplayData/DisplayData.tsx";
import { Page } from "@/components/Page.tsx";
import { bem } from "@/css/bem.ts";

import "./TONConnectPage.css";

const [, e] = bem("ton-connect-page");

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();
  const adrss = useTonAddress();
  console.log(wallet, "wallet!!!");
  console.log(adrss, "adrss!!!");

  const myWallet = "UQDncYGSo8oA2jQVZwolIiTdylIE4QAeNtrpkmwW9sYjX0bB";

  // get transaction
  // https://toncenter.com/api/v2/getTransactions?address=UQDncYGSo8oA2jQVZwolIiTdylIE4QAeNtrpkmwW9sYjX0bB&limit=10&to_lt=0&archival=true

  const getAllTokens = () => {
    fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${myWallet}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
      });
  };

  // const transaction: SendTransactionRequest = {
  //   validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
  //   messages: [
  //     {
  //       address: "0QD-SuoCHsCL2pIZfE8IAKsjc0aDpDUQAoo-ALHl2mje04A-", // message destination in user-friendly format
  //       amount: "1000000", // Toncoin in nanotons
  //     },
  //   ],
  // };

  if (!wallet) {
    return (
      <Page>
        <Placeholder
          className={e("placeholder")}
          header="TON Connect"
          description={
            <>
              <Text>
                To display the data related to the TON Connect, it is required
                to connect your wallet
              </Text>
              <TonConnectButton className={e("button")} />
            </>
          }
        />
      </Page>
    );
  }

  const {
    account: { chain, publicKey, address },
    device: { appName, appVersion, maxProtocolVersion, platform, features },
  } = wallet;

  return (
    <Page>
      <List>
        {"imageUrl" in wallet && (
          <>
            <Section>
              <Cell
                before={
                  <Avatar
                    src={wallet.imageUrl}
                    alt="Provider logo"
                    width={60}
                    height={60}
                  />
                }
                after={<Navigation>About wallet</Navigation>}
                subtitle={wallet.appName}
                onClick={(e) => {
                  e.preventDefault();
                  openLink(wallet.aboutUrl);
                }}
              >
                <Title level="3">{wallet.name}</Title>
              </Cell>
            </Section>
            <TonConnectButton className={e("button-connected")} />
          </>
        )}
        <DisplayData
          header="Account"
          rows={[
            { title: "Address", value: address },
            { title: "Chain", value: chain },
            { title: "Public Key", value: publicKey },
          ]}
        />
        <DisplayData
          header="Device"
          rows={[
            { title: "App Name", value: appName },
            { title: "App Version", value: appVersion },
            { title: "Max Protocol Version", value: maxProtocolVersion },
            { title: "Platform", value: platform },
            {
              title: "Features",
              value: features
                .map((f) => (typeof f === "object" ? f.name : undefined))
                .filter((v) => v)
                .join(", "),
            },
          ]}
        />
      </List>
      <div onClick={() => getAllTokens()}>TON BALANCE</div>
    </Page>
  );
};
