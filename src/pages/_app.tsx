import { keyStores, connect, Near } from "near-api-js";
import { AppProps } from "next/app";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import '../styles/globals.css';

async function connectToNear() {
    const connectionConfig = {
        networkId: "mainnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore, 
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
    };
    return await connect(connectionConfig);
}
  
export const nearConnectionContext = createContext<{
nearConnection: Near;
setNearConnection: Dispatch<SetStateAction<Near>>;
}>(undefined);

export default function MyApp({ Component, pageProps }: AppProps) {
    const [nearConnection, setNearConnection] = useState<Near>(undefined);
    
    useEffect(() => {
        connectToNear()
          .then(conn => {
            setNearConnection(conn);
        })
    }, [])

    return (
        <nearConnectionContext.Provider value={{ nearConnection, setNearConnection }}>
            <Component {...pageProps} />
        </nearConnectionContext.Provider>
    )
}
