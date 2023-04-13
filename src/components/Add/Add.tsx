import React, { useState } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Add() {
  const [ethereum, setEthereum] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [eventsList, setEventsList] = useState([]);

  async function requestAccount() {
    console.log("Requesting account...");

    // Check if Meta Mask Extension exists
    if (window.ethereum) {
      console.log("detected");
      console.log("window.ethereum", window.ethereum);

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setEthereum(window.ethereum);
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Meta Mask not detected");
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  moment.locale("en-GB");
  const localizer = momentLocalizer(moment);

  const { emoji } = useParams();
  console.log("emoji", emoji);

  const decodedEmoji = emoji;
  console.log("decodedEmoji", decodedEmoji);

  const now = new Date();
  const events = [
    {
      id: 1,
      title: emoji,
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
  ];

  return (
    <>
      <div>Add</div>

      <div className="App">
        <header className="app-header">
          <button onClick={connectWallet}>Connect Wallet</button>
          <h3>Wallet Address: {walletAddress}</h3>
        </header>
      </div>

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
      />
    </>
  );
}
