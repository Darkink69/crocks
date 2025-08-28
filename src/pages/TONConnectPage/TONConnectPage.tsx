import { openLink } from "@telegram-apps/sdk-react";
import {
  TonConnectButton,
  useTonWallet,
  useTonAddress,
  SendTransactionRequest,
  useTonConnectUI,
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

  const [tonConnectUI] = useTonConnectUI();

  const myWallet = "UQDncYGSo8oA2jQVZwolIiTdylIE4QAeNtrpkmwW9sYjX0bB";

  // get transaction
  // https://toncenter.com/api/v2/getTransactions?address=UQDncYGSo8oA2jQVZwolIiTdylIE4QAeNtrpkmwW9sYjX0bB&limit=10&to_lt=0&archival=true
  // UQDoj1UzJasYurg5oLsfA69pmVG7ATWTxyxawgfGFvLffbX8
  // 976634512

  const getAllTokens = () => {
    fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${myWallet}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
      });
  };

  const transaction: SendTransactionRequest = {
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
    messages: [
      {
        address: "UQDoj1UzJasYurg5oLsfA69pmVG7ATWTxyxawgfGFvLffbX8", // message destination in user-friendly format
        amount: "100000", // Toncoin in nanotons
      },
    ],
  };

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
      <div onClick={() => getAllTokens()}>TON BALANCE</div>
      <div>
        <button onClick={() => tonConnectUI.sendTransaction(transaction)}>
          Send transaction
        </button>
      </div>
      {/* wallet && (
      <div>
        <span>Connected wallet address: {wallet.account.address}</span>
        <span>Device: {wallet.device.appName}</span>
        <span>Connected via: {wallet.provider}</span>
        {wallet.connectItems?.tonProof?.proof && (
          <span>Ton proof: {wallet.connectItems.tonProof.proof}</span>
        )}

        <div>Connected wallet info:</div>
        <div>
          {wallet.name} <img src={wallet.imageUrl} />
        </div>
      </div>
      ) */}
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
    </Page>
  );
};
