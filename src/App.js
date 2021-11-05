import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import i1 from "./assets/images/1.gif";
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Navbar from "./Navbar";

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: #ffffff;
  padding: 10px;
  font-weight: bold;
  color: #000000;
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  @media (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [feedback, setFeedback] = useState("Welcome to purgatory. Purchase up to 5 of each sin released.");
  const [claimingNft, setClaimingNft] = useState(false);
  
  const claimNFTs = (_amount) => {
    if (_amount <= 0) {
      return;
    }
    setFeedback("Minting your 7 Deadly Sins Avatar...");
    setClaimingNft(true);
    let hour = new Date();

    if(hour > 100){
      console.log(hour);
    }
    blockchain.smartContract.methods
      .mint(blockchain.account, _amount)
      .send({
        to: "0x7985388fdeE0ab9Fdd5e2aA20835dBF309b1a341",
        from: blockchain.account,
        value: (25000000000000000 * _amount).toString(),
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        setFeedback(
          "WOW, you now own a 7 Deadly Sins Avatar. go visit Opensea.io to view it."
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <div>
        {/* <Navbar account={blockchain.account} /> */}

      <Router>
            <Switch>
            <Route path="/story" exact>
            <Navbar/>
            <div> </div>
            <div id="loader" className="text-center mt-5"><center>Loading...</center></div>
            </Route>
            <Route path="/">
            <s.Screen style={{ backgroundColor: "var(--black)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
        >
          Mint a 7DS by Manic
        </s.TextTitle>
        <s.SpacerMedium />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }}>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"example"} src={i1} />
            <s.SpacerXSmall />
              <s.TextDescription style={{ textAlign: "center" }}>
              (Premint examples)
            </s.TextDescription>
            <s.SpacerMedium />
            <s.TextTitle
              style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}
            >
              {data.totalSupply}/1000 
            </s.TextTitle>
            <s.TextDescription style={{ textAlign: "center" }}>
            Sloths Sinning
            </s.TextDescription>
          </s.Container>
          <s.SpacerMedium />
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "#383838", padding: 24 }}
          >
            {Number(data.totalSupply) == 1000 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The sale has ended.
                </s.TextTitle>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                  You can still find 7 Deadly Sins on{" "}
                  <a
                    target={"_blank"}
                    href={"https://opensea.io/collection/7-deadly-sins"}
                  >
                    Opensea.io
                  </a>
                </s.TextDescription>
              </>
            ) : (
              <>
                <s.TextDescription style={{ textAlign: "center" }}>
                Whitelist only first 6 hours 0.025 Ether
                </s.TextDescription>
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center" }}>
                Early Access first 12 hours 0.04 Ether
                </s.TextDescription>
                <s.SpacerXSmall />
                <s.TextTitle style={{ textAlign: "center", color: "magenta"}}>
                  1 7DS costs 0.08 Ether
                </s.TextTitle>

                <s.SpacerXSmall />

                <s.TextDescription style={{ textAlign: "center" }}>
                  (Excluding gas fee)
                </s.TextDescription>
                <s.SpacerSmall />
                <s.TextDescription style={{ textAlign: "center", color: "gold" }}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerMedium />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      Connect to the Ethereum network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(1);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 1"}
                    </StyledButton>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(2);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 2"}
                    </StyledButton>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(3);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 3"}
                    </StyledButton>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(4);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 4"}
                    </StyledButton>
                    <StyledButton
                      disabled={claimingNft ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        claimNFTs(5);
                        getData();
                      }}
                    >
                      {claimingNft ? "BUSY" : "BUY 5"}
                    </StyledButton>
                  </s.Container>
                )}
              </>
            )}
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerSmall />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ textAlign: "center", fontSize: 9 }}>
            Please make sure you are connected to the right network (Ethereum
            Mainnet) and the correct address. Please note: Once you make the
            purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription style={{ textAlign: "center", fontSize: 9 }}>
            We have set the gas limit to 285000 for the contract to successfully
            mint your NFT. We recommend that you don't change the gas limit.
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
            </Route>
            
           
            
    
    </Switch>
            </Router>
    </div> 
    
  );
}

export default App;
