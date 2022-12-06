import Sidebar from "./Sidebar";
import {Icon} from "@iconify/react";
import {useEffect, useState} from "react";
import noData from '../assets/no-data.svg'
import axios from 'axios'
import React from "react";
import Webcam from 'webcam-easy'

const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

let webcam;
let myInterval;

export default function LiveFeed() {

  // state for live feed
  const [liveFeed, setLiveFeed] = useState("");
  const [startFeed, setStartFeed] = useState(false);
  const [isUsingWebcam, setIsUsingWebcam] = useState(false);
  const [location,setLocation] = useState("");

  useEffect(() => {
    return () => {
      webcam?.stop();
      if (myInterval) {
        clearInterval(myInterval);
      }
    }
  })

  const postStream = () => {

    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    webcam = new Webcam(webcamElement, 'user', canvasElement, null);
    // activate webcam
    webcam.start()
      .then(result => {
        console.log("webcam started");
      })
      .catch(err => {
        console.log(err)
      })


    const formData = new FormData()

    if (!isUsingWebcam) {
      formData.append("Location", location)
    }
    formData.append("YouTubeLiveLink", liveFeed)

    axios.post("http://localhost:8080/auth/livefeed", formData, {headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      }}).then(res => {

      myInterval = setInterval(() => {

        const image = webcam.snap();
        const livefeedID = res.data.LiveFeedID

        const fx = new FormData()
        fx.append("LiveFeedID", livefeedID)
        fx.append("YouTubeLiveLink", liveFeed)
        fx.append("Image", image)

        axios.post("http://127.0.0.1:1111/", fx, {headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
            'content-type': 'multipart/form-data'
          }})


      }, 2500)

    })



  }

  if (isMobile) {
    return (
      <h1>This web application is not available on mobile devices.</h1>
    )
  }
  return (
    <div>
      <Sidebar />

      <div className={"flex flex-col ml-20 h-full"}>

        <div className={"flex flex-col w-3/4 ml-auto mr-auto"}>
          <div className={"mt-10 rounded-xl flex flex-col  bg-zinc-800 text-gray-200"} style={{overflow: "scroll"}}>
            <div className={"flex justify-start pl-6 text-xl text-gray-200 pb-1 pt-6"}>
              <Icon icon="ant-design:camera-filled" width={28} /> <span className={"ml-2"}>Live Feed Analyzer</span>
            </div>
            <div className={"w-full p-6"}>

              <label htmlFor="input-group-1"
                     className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">What is the Live Stream link?</label>
              <div className="relative mb-6">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <Icon icon="akar-icons:youtube-fill" color="white" />
                </div>
                <input type="text" id="input-group-1"
                       value={liveFeed}
                        onChange={(e) => setLiveFeed(e.target.value)}
                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
              </div>

              <label htmlFor="input-group-1"
                     className="mb-4 block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Are you using your webcam for streaming?</label>

              <div className="flex items-center mb-4">
                <input id="default-radio-1" type="radio" name="default-radio"
                      checked={isUsingWebcam}
                       onClick={() => {
                         setIsUsingWebcam(true)
                       }}
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-radio-1"
                       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                <input  id="default-radio-2" type="radio"
                       checked={!isUsingWebcam}
                        onClick={() => {
                          setIsUsingWebcam(false)
                        }}
                   name="default-radio"
                       className="w-4 h-4 ml-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="default-radio-2"
                       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
              </div>

              {!isUsingWebcam &&
                <>
                <label htmlFor="input-group-1"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Where is the location of the stream?</label>
                <div className="relative mb-6">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <Icon icon="fluent:live-24-filled" color={"white"} />
                </div>
                <input type="text" id="input-group-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                </div>
                </>
              }

                <button
                  onClick={() => {
                    if (liveFeed === "")
                      return
                    setStartFeed(true)
                    setTimeout(() => {
                      postStream()
                    },10)

                  }}
                  style={{background: "#3bff9d"}} type="button"
                        className="text-slate-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 text-center">
                  Analyze Stream
                </button>

            </div>

          </div>

          <div className={"mt-6 rounded-xl flex flex-col h-full bg-zinc-800 text-gray-200 mb-10"} style={{height: "50vh"}}>
            {startFeed ?
              // <iframe style={{height: 1000}} src={"https://www.youtube.com/embed/" + liveFeed.replace("https://youtu.be/", "")}
              //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              //         allowFullScreen></iframe>

              <div className={"m-auto overflow-y-hidden"}>
                <video id="webcam" autoPlay playsInline width={1000}></video>
                <canvas id="canvas" className="d-none"></canvas>
              </div>
              :
              <div className={"flex flex-col items-center justify-center"}>
                <img src={noData} alt="No Data" style={{width: "40%"}}/>
                <h1 style={{textAlign: "center"}}>Live stream not found yet.</h1>
              </div>
            }
          </div>


        </div>
      </div>
    </div>
  )
}