import './App.css';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Api from './Api';
import { WagmiConfig, createClient, defaultChains, configureChains, } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { Profile } from './Profile';
import { Buffer } from "buffer";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: 'l6ZPirxmkFBjmMcFPjtd2Jp8zKrhxBCD' }),
  publicProvider(),
]);

const client = createClient({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

function App() {
  let [address, setAddress] = useState("none");
  let [isOwner, setIsOwner] = useState(false);

  const btnHandler = async () => {
    const isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)
    if (isMobile != null) {
      console.log("1.1");
      await mobileConnect();
    } else {
      await desktopConnect();
    }
  };

  const mobileConnect = () => {
    console.log("mobile");
  }

  const desktopConnect = async () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async (res) => {
          setAddress(res[0]);
          await Api(res[0])
            .then(data => {
              setIsOwner(data.owners.includes(res[0].toLowerCase()));
            })
        })
        .catch(err => {
          console.error(err);
        })
    } else {
      alert("install metamask extension!!");
    }
  }

  const isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)
  if (isMobile != null) {
    return (
      <WagmiConfig client={client}>
        <Profile />
      </WagmiConfig>
    );
  } else {
    return (
      <div className="App">
        <Button onClick={btnHandler}>
          Connect to wallet
        </Button>
        <br></br>
        <br></br>
        <div>This account: {JSON.stringify(address)} owns one of our NFTs: {JSON.stringify(isOwner)}</div>
      </div>
    );
  }
}

export default App;
