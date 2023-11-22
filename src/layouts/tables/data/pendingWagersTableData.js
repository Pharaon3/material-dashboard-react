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
const math = require("mathjs");
import React, { useState, useEffect } from "react";
export default function data() {
  const [rows, setRows] = useState([]);
  let wagerData = [];
  let market_rules = [];
  let soccerEventArray = [];
  const [feed, setFeed] = useState([]);
  let soccerDetail = [];
  let soccerEvent = [];
  const getWagerData = () => {
    // const axios = require("axios");

    // let config1 = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: "http://socket.betdata.pro:9595/events/50030074488/",
    //   headers: {
    //     "HTTP-X-API-KEY": "RwaU4mQfGuh67hEyzSe4I2fdcWSA1i02",
    //   },
    // };

    // axios
    //   .request(config1)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

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
          wagerData.push({
            wagerID: wagerID,
            sport: sport,
            league: league,
            eventName: eventName,
            market: market,
            selectedOption: selectedOption,
            betPlaced: betPlaced,
            scorewhen: scorewhen,
            halfWhen: halfWhen,
            eventTimer: eventTimer,
            feedData: feedData,
          });
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
  const getResult = () => {
    wagerData.map((row) => {
      let feedData = "" + row.feedData;
      const [feedId, feedEvent, feedSelection] = feedData.split("-");
      const detailData = getDetailData(feedId);
      const eventData = getEventData(feedId);
      const cCode = getCCode(feedEvent);
      const c1 = eventData?.d?.ps?.CS?.score?.c1;
      const c2 = eventData?.d?.ps?.CS?.score?.c2;
      const a = eventData?.d?.m[feedEvent]?.o?.[feedSelection]?.a?.[0];
      const p = eventData?.d?.p;
      const commonCode = eventData?.d?.m[feedEvent]?.o?.[feedSelection]?.c;
      const checkValue = market_rules[row.sport]?.[cCode]?.common?.[commonCode] ?? "";
      const pCode = market_rules[row.sport]?.[cCode]?.FULL?.p ?? "";
      // console.log("pCode: ", pCode, "Result: ", eval(pCode));
      const variables = { a: a, c1: c1, c2: c2 };
      if (checkValue && eval(pCode)) {
        // if (validateMathExpression(checkValue, variables)) {
        if (eval(checkValue)) console.log(checkValue, "Bet Win!");
        else console.log(checkValue, "Bet Lose!");
        // } else {
        //   console.log("Not enough data feeded.", checkValue);
        // }
      } else {
        console.log("Cannot grade.");
      }

      // switch (row.sport) {
      //   case "Soccer":
      //     console.log("cCode: ", cCode);
      //     switch (cCode) {
      //       case "ML": // Moneyline - Who's winner in this game?
      //         switch (feedSelection) {
      //           case "1": // Bet Home.
      //             console.log("Bet Home");
      //             if (detailData?.d?.match?.status?.name == "Ended") {
      //               if (detailData?.d?.match?.result?.winner == "home") {
      //                 console.log("WIN BET!!!!!!!!!!!!!!!!!!!!!");
      //               } else {
      //                 console.log("LOSE BET!!!!!!!!!!!!!!!!!!!!");
      //               }
      //             } else {
      //               console.log("Cannot grade now.");
      //             }
      //             break;
      //           case "2": // Bet Draw.
      //             console.log("Bet Draw");
      //             if (detailData?.d?.match?.status?.name == "Ended") {
      //               if (detailData?.d?.match?.result?.winner == "draw") {
      //                 console.log("WIN BET!!!!!!!!!!!!!!!!!!!!!");
      //               } else {
      //                 console.log("LOSE BET!!!!!!!!!!!!!!!!!!!!");
      //               }
      //             } else {
      //               console.log("Cannot grade now.");
      //             }
      //             break;
      //           case "3": // Bet Away.
      //             console.log("Bet Away.");
      //             if (detailData?.d?.match?.status?.name == "Ended") {
      //               if (detailData?.d?.match?.result?.winner == "away") {
      //                 console.log("WIN BET!!!!!!!!!!!!!!!!!!!!!");
      //               } else {
      //                 console.log("LOSE BET!!!!!!!!!!!!!!!!!!!!");
      //               }
      //             } else {
      //               console.log("Cannot grade now.");
      //             }
      //             break;
      //           default:
      //             console.log("Error: ", feedData);
      //             break;
      //         }
      //         break;
      //       case "TOTAL_GOALS_REGULAR_TIME": // Total Goals (Regular Time)
      //         let rule = soccerEventArray?.d?.m[feedEvent]?.o[feedSelection]?.n;
      //         let goals = soccerEventArray?.d?.m[feedEvent]?.o[feedSelection]?.a[0];
      //         console.log(
      //           "Total goals: ",
      //           detailData?.d?.match?.result?.home + detailData?.d?.match?.result?.away
      //         );
      //         switch (rule) {
      //           case "Over": // Win if total goal is over goals.
      //             console.log("Bet Over " + goals);
      //             if (detailData?.d?.match?.status?.name == "Ended") {
      //               if (
      //                 detailData?.d?.match?.result?.home + detailData?.d?.match?.result?.away >
      //                 goals
      //               ) {
      //                 console.log("WIN BET!!!!!!!!!!!!!!!!!!!!!");
      //               } else {
      //                 console.log("LOSE BET!!!!!!!!!!!!!!!!!!!!");
      //               }
      //             } else {
      //               console.log("Cannot grade now.");
      //             }
      //             break;
      //           case "Under": // Win if total goal is under goals.
      //             console.log("Bet Under " + goals);
      //             if (detailData?.d?.match?.status?.name == "Ended") {
      //               if (
      //                 detailData?.d?.match?.result?.home + detailData?.d?.match?.result?.away <
      //                 goals
      //               ) {
      //                 console.log("WIN BET!!!!!!!!!!!!!!!!!!!!!");
      //               } else {
      //                 console.log("LOSE BET!!!!!!!!!!!!!!!!!!!!");
      //               }
      //             } else {
      //               console.log("Cannot grade now.");
      //             }
      //             break;
      //           default:
      //             console.log("Error: ", feedData);
      //             break;
      //         }
      //         break;
      //       default:
      //         // console.log("feedEvent: ", feedEvent);
      //         break;
      //     }
      //     break;
      //   default:
      //     break;
      // }
    });
  };
  function validateMathExpression(expression, variables) {
    try {
      const scope = { ...variables };
      console.log("scope: ", scope);
      const result = math.evaluate(expression, scope);
      console.log("result: ", result);
      return typeof result === "number" || typeof result === "boolean";
    } catch (error) {
      return false;
    }
  }
  const getCCode = (feedEvent) => {
    return soccerEventArray?.d?.m[feedEvent]?.c;
  };
  const getDetailData = (feedId) => {
    return soccerDetail;
  };
  const getEventData = (feedId) => {
    return soccerEventArray;
  };
  useEffect(() => {
    getWagerData();
    const fetchMarketRules = async () => {
      try {
        const response = await fetch("./market_rules.json");
        const data = await response.json();
        market_rules = data;
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };
    const fetchSoccerData = async () => {
      try {
        const response = await fetch("./footballEventData.json");
        const data = await response.json();
        soccerEventArray = data;
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };
    const fetchSoccerDetail = async () => {
      try {
        const response = await fetch("./footballDetail.json");
        const data = await response.json();
        soccerDetail = data;
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    // Call the fetchData function
    fetchMarketRules();
    fetchSoccerData();
    fetchSoccerDetail();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getResult();
    }, 1000);
  }, []);

  return {
    columns: [
      { Header: "Wager ID", accessor: "wagerID", align: "center" },
      { Header: "Sport", accessor: "sport", align: "center" },
      { Header: "League", accessor: "league", width: "50px", align: "center" },
      { Header: "Event Name", accessor: "eventName", align: "center" },
      { Header: "Market", accessor: "market", align: "center" },
      { Header: "Selected Option", accessor: "selectedOption", align: "center" },
      { Header: "Bet Placed", accessor: "betPlaced", align: "center" },
      { Header: "Score", accessor: "scorewhen", width: "50px", align: "center" },
      { Header: "Which half", accessor: "halfWhen", width: "50px", align: "center" },
      { Header: "Event Timer", accessor: "eventTimer", width: "50px", align: "center" },
      { Header: "Feed Data", accessor: "feedData", align: "center" },
    ],
    rows,
  };
}
