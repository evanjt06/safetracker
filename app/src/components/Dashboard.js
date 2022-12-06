import Sidebar from "./Sidebar";
import DashboardCard from "./sub-components/DashboardCard";
import {useEffect, useState} from "react";
import axios from "axios";
import noData from "../assets/no-data.svg";
import {Icon} from "@iconify/react/dist/iconify";
import React from "react";
import LoadingIcons from "react-loading-icons";

const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

function Dashboard() {

  const [loading, setLoading] = useState(false)
  const [feed, setFeed] = useState([]);
  const [totalThreats, setTotalThreats] = useState(0);
  const [discordThreats, setDiscordThreats] = useState(0);
  const [twitterThreats, setTwitterThreats] = useState(0);
  const [liveFeedThreats, setLiveFeedThreats] = useState(0);

  useEffect(() => {
    setLoading(true)
    axios.get("http://localhost:8080/auth/stats", {headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      }}).then(res => {
      setTotalThreats(res.data.totalThreats);
      setDiscordThreats(res.data.discordThreatCount);
      setTwitterThreats(res.data.twitterThreatCount);
      setLiveFeedThreats(res.data.liveFeedThreatCount);

      setLoading(false)
    })

    axios.get("http://localhost:8080/auth/livefeed", {headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }}).then(res => {

        console.log(res?.data?.res[0])
      if (res?.data?.res[0].RecordData === null) {
        return
      }

      setLoading(false)
      setFeed(res.data.res)
    })
  }, [])

  if (isMobile) {
    return (
      <h1>This web application is not available on mobile devices.</h1>
    )
  }

  return (
    <div>
      <Sidebar />

      <div className={"flex flex-col ml-20 h-full"}>

        <div className={"flex w-3/4 ml-auto mr-auto mb-10"}>
          <div className={"h-full mt-10 rounded-xl pt-10 flex flex-col  bg-zinc-800 text-gray-200"} style={{flex: "75%"}}>
            <div className={"flex mr-auto ml-10 text-xl"}>
              <Icon icon="bxs:dashboard" width={28} /> <span className={"ml-2"}>Live Feed Activity</span>
              <hr />
            </div>
            <div className={"m-12"}>

              {loading ?

                <div className={"flex flex-col justify-center items-center m-auto"}>
                  <LoadingIcons.Bars fill={"#3bff9d"} width={50}  />
                  <h1 className={"text-xl"} style={{textAlign: "center", marginRight: 5}}>Loading ...</h1>
                </div>

                :

                feed === undefined || feed?.length === 0 ?
                  <>
                    <img src={noData} alt="No Data" style={{width: "60%", margin: "auto"}}/>
                    <h1 style={{textAlign: "center"}}>Dashboard data empty.</h1>
                  </>
                  :
                  <ol className="relative border-l border-gray-200 dark:border-gray-700">


                    {feed?.map((item, index) => (
                      <DashboardCard
                        key={index}
                        location={item.Record.Location}
                        liveLink={item.Record.YouTubeLiveLink}
                        data={item.RecordData}
                      />
                    ))}
                  </ol>



              }

            </div>
          </div>
          <div className={"h-full mt-10 ml-10 rounded-xl pt-10 flex flex-col bg-zinc-800 m-auto text-gray-200"} style={{flex: "25%"}}>
            <div className={"mr-auto ml-8 text-2xl"}>
              Statistics
              <hr />
            </div>
            <div className={"flex flex-col justify-around items-stretch m-4 h-full"}>
              <span className={"flex flex-col items-center flex-1 p-5"}>Total Threats Detected: <h1 className={"text-2xl mt-10"} style={{color: "#3bff9d"}}>{totalThreats}</h1></span>
              <span className={"flex flex-col items-center flex-1 p-5"}>Discord Threats Detected: <h1 className={"text-2xl mt-10"} style={{color: "#3bff9d"}}>{discordThreats}</h1></span>
              <span className={"flex flex-col items-center flex-1 p-5"}>Twitter Threats Detected: <h1 className={"text-2xl mt-10"} style={{color: "#3bff9d"}}>{twitterThreats}</h1></span>
              <span className={"flex flex-col items-center flex-1 p-5"}>LiveFeed Threats Detected: <h1 className={"text-2xl mt-10"} style={{color: "#3bff9d"}}>{liveFeedThreats}</h1></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;