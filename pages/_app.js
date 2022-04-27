import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";
function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl="https://ftfl216f4tqt.usemoralis.com:2053/server" appId="f67bySASMxzCqGLStPKQpIAlZru9eTAVaw9tn2O8">
      <Component {...pageProps} />
    </MoralisProvider>
    )
}

export default MyApp
