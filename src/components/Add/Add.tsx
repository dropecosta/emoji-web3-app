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



 
/* This code is defining a React functional component called `Add` that renders a calendar and allows
the user to connect their Ethereum wallet and add events to the calendar. It imports various
dependencies such as `useState`, `useEffect`, `ethers`, `Link`, `useParams`, `Calendar`,
`momentLocalizer`, and `moment`. The component uses state hooks to manage the Ethereum provider,
wallet address, connection status, and events. It also defines a function `requestAccount` to
connect the user's wallet and a function `handleSelect` to add events to the calendar. The component
also uses the `useEffect` hook to set default events when the wallet address is available. Finally,
it renders a header with a "Connect Wallet" button and a link to go back to the home page, and a
calendar component that displays the events and allows the user to add new events. */

/*
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Link, useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { b64_to_utf8, unicodeToEmoji } from "../../utils/emojiHelper";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const { utils } = ethers;

const Add: React.FC = () => {
  const [ethereum, setEthereum] = useState<ethers.providers.Web3Provider>();
  const [walletAddress, setWalletAddress] = useState<string>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [events, setEvents] = useState<any[]>([]);

  const { emoji } = useParams();
  const decoded = b64_to_utf8(emoji!);
  const convertedEmoji = unicodeToEmoji(decoded);



  const requestAccount = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("No Ethereum wallet detected. Please install MetaMask or a compatible wallet.");
      }
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(signer, signer);

      // Check if the signer has an associated address
      if (!signer._address) {
        throw new Error("Signer does not have an associated address");
      }

      const address = await signer.getAddress();
      console.log(address, address);
  
      setEthereum(provider);
      setWalletAddress(address);
      setIsConnected(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = async ({ start, end }: any) => {
    if (!ethereum) return;

    try {
      const signer = ethereum.getSigner();
      const event = {
        id: events.length + 1,
        title: convertedEmoji,
        start,
        end,
      };

      // Sign the message
      const message = JSON.stringify(event);
      const signature = await signer.signMessage(message);

      // Verify the signature
      const recoveredAddress = utils.verifyMessage(message, signature);
      if (recoveredAddress !== walletAddress) {
        throw new Error("Invalid signature");
      }

      setEvents([...events, event]);
    } catch (error) {
      console.log(error);
      alert("Failed to add event to calendar");
    }
  };

  useEffect(() => {
    if (walletAddress) {
      const defaultEvents = [
        {
          id: 1,
          title: "Any other event",
          start: new Date(new Date().setHours(new Date().getHours() - 1)),
          end: new Date(new Date().setHours(new Date().getHours() + 1)),
        },
      ];

      setEvents(defaultEvents);
    }
  }, [walletAddress]);

  moment.locale("en");
  const localizer = momentLocalizer(moment);

  return (
    <div className="calendar">
      <h1>Add</h1>
      <header className="app-header">
        {isConnected ? (
          <p>Connected to wallet: {walletAddress}</p>
        ) : (
          <button className="button" role="button" onClick={requestAccount}>
            Connect Wallet
          </button>
        )}
        <Link to="/">Back to Home</Link>
      </header>

      {walletAddress && (
        <Calendar
          views={["month"]}
          selectable
          localizer={localizer}
          defaultView="month"
          style={{ height: "100vh" }}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          onSelectSlot={handleSelect}
        />
      )}
    </div>
  )};

  export default Add
 */
