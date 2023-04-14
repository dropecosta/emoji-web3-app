import React, { useState } from "react";
import { ethers } from "ethers";
import { Link, useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { b64_to_utf8, unicodeToEmoji } from "../../utils/emojiHelper";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const Add: React.FC = () => {
  const [ethereum, setEthereum] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [signer, setSigner] = useState<Promise<ethers.JsonRpcSigner>>();

  async function requestAccount() {
    console.log("Requesting account...");

    // Check if MetaMask Extension exists
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setEthereum(window.ethereum);
        setWalletAddress(accounts[0]);
        setIsConnected(true);

        const provider = new ethers.BrowserProvider(window.ethereum);
        setSigner(provider.getSigner());
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsConnected(false);
      alert("Meta Mask not detected");
    }
  }

  moment.locale("en");
  const localizer = momentLocalizer(moment);

  // convert to emoji
  const { emoji } = useParams();
  const decoded = b64_to_utf8(emoji!);
  const convertedEmoji = unicodeToEmoji(decoded);

  const emojiEvent = 
    {
      id: 1,
      title: convertedEmoji,
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    }
  ;


  const defaultEvents = [
    {
      id: 1,
      title: 'Any other event',
      start: new Date(new Date().setHours(new Date().getHours() - 1)),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
  ];

  defaultEvents.push(emojiEvent);

  return (
    <div className="calendar">
      <h1>Add</h1>
      <header className="app-header">
        <button className="button" role="button" onClick={requestAccount}>
          Connect Wallet
        </button>
        <Link to="/">Back to Home</Link>
      </header>
        <h3>Wallet Address: {walletAddress}</h3>

      <Calendar
        views={["month"]}
        selectable
        localizer={localizer}
        defaultView="month"
        style={{ height: "100vh" }}
        events={defaultEvents}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
      />
    </div>
  );
};

export default Add;
