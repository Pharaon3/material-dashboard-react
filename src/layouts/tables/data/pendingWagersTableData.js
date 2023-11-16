/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import axios from "axios";
import React, { useState, useEffect } from "react";
export default function data() {
  const [rows, setRows] = useState([]);
  const getWagerData = () => {
    // const axios = require("axios");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://ezlivebet.com/service/koz.asmx/GetPendingWagers?id=1",
      headers: {},
    };
    axios
      .request(config)
      .then((response) => {
        const xmlString = response.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
        const text = xmlDoc.documentElement.textContent;
        const resArray = text.split("^");
        const newRows = resArray.map((row) => {
          const [
            wagerID,
            sport,
            league,
            eventName,
            market,
            selectedOption,
            betPlaced,
            scorewhen,
            halfWhen,
            eventTimer,
            feedData,
          ] = row.split("|");
          return {
            wagerID: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {wagerID}
              </MDTypography>
            ),
            sport: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {sport}
              </MDTypography>
            ),
            league: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {league}
              </MDTypography>
            ),
            eventName: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {eventName}
              </MDTypography>
            ),
            market: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {market}
              </MDTypography>
            ),
            selectedOption: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {selectedOption}
              </MDTypography>
            ),
            betPlaced: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {betPlaced}
              </MDTypography>
            ),
            scorewhen: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {scorewhen}
              </MDTypography>
            ),
            halfWhen: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {halfWhen}
              </MDTypography>
            ),
            eventTimer: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {eventTimer}
              </MDTypography>
            ),
            feedData: (
              <MDTypography component="div" variant="caption" color="text" fontWeight="medium">
                {feedData}
              </MDTypography>
            ),
          };
        });
        setRows(newRows);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getWagerData();
  }, []);

  return {
    columns: [
      { Header: "Wager ID", accessor: "wagerID", align: "center" },
      { Header: "Sport", accessor: "sport", align: "center" },
      { Header: "League", accessor: "league", align: "center" },
      { Header: "Event Name", accessor: "eventName", align: "center" },
      { Header: "Market", accessor: "market", align: "center" },
      { Header: "Selected Option", accessor: "selectedOption", align: "center" },
      { Header: "Bet Placed", accessor: "betPlaced", align: "center" },
      { Header: "Score", accessor: "scorewhen", align: "center" },
      { Header: "Which half", accessor: "halfWhen", align: "center" },
      { Header: "Event Timer", accessor: "eventTimer", align: "center" },
      { Header: "Feed Data", accessor: "feedData", align: "center" },
    ],

    rows,
  };
}
