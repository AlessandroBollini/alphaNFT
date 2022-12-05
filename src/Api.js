import { Alchemy, Network } from "alchemy-sdk";

const config = {
    apiKey: "l6ZPirxmkFBjmMcFPjtd2Jp8zKrhxBCD",
    network: Network.MATIC_MAINNET
};
const alchemy = new Alchemy(config);

async function Api(address) {
    console.log(1);
    const contract = "0xc16ed03d58Ad3D8b629D8B14eef651dAbCDA44ec";
    return await alchemy.nft.getOwnersForContract(contract);
}

export default Api;