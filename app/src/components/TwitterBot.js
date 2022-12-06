import Sidebar from "./Sidebar";
import SocialCard from "./sub-components/SocialCard";
import {useEffect, useState, Fragment} from "react";
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import noData from '../assets/no-data.svg'
import {Icon} from "@iconify/react";
import React from "react";
import { ThreeDots } from 'react-loading-icons'

const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

export default function TwitterBot() {

  const [twitterData, setTwitterData] = useState([]);
  const  [isOpen, setIsOpen] = useState(false)
  const [twitterHandle, setTwitterHandle] = useState('')

  const [isLoading, setLoading] = useState(false)

  // call twitter api (aathma)
  const analyzeTwitterProfile =  () => {

    const f = new FormData()
    f.append('TwitterScannedAccountID', twitterHandle)

    const url = "http://127.0.0.1:5000/";
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem("jwt")}`
    }
    axios.post(url, f, {headers})
      .then(res => {
        if (res.data.status === 200) {
          // there is a threat found, refetch GET request
          axios.get("http://localhost:8080/auth/twitter", {headers: {
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            }}).then(res => {
            setTwitterData(res.data.TwitterData)
          })
        }
      })

  }

  useEffect(() => {
    axios.get("http://localhost:8080/auth/twitter", {headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }}).then(res => {
      setTwitterData(res.data.TwitterData)
    })
  }, [])


  if (isMobile) {
    return (
      <h1>This web application is not available on mobile devices.</h1>
    )
  }

  return (

    <div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {setIsOpen(false)}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="font-medium leading-6 text-gray-900"
                  >
                    Enter in the Twitter handle of the account you want to analyze.
                  </Dialog.Title>
                  <div className="my-2">
                    <input type="text"
                           className="border border-gray-300 text-gray-900 text-sm rounded-lg f block w-full p-2.5"
                           value={twitterHandle}
                            onChange={(e) => {setTwitterHandle(e.target.value)}}
                           required />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      className="rounded-md border border-transparent bg-orange-300 px-4 py-2 text-sm font-medium text-orange-900 hover:bg-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        if (twitterHandle.length === 0) {
                          alert("Please enter a Twitter handle.")
                          return
                        }
                        setLoading(true)
                        setTimeout(() => {
                          setIsOpen(false)
                          setLoading(false)
                        }, 2000)

                        analyzeTwitterProfile()
                      }}
                    >
                      {isLoading ? <div className={"flex"}><span className={"mr-2"}>Loading</span> <ThreeDots height={20} width={20} /></div> : "Analyze Profile"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Sidebar />

      <div className={"flex flex-col ml-20 h-full"}>

        <div className={"flex w-3/4 ml-auto mr-auto mb-10"}>
          <div className={"h-full mt-10 rounded-xl pt-10 flex flex-col  bg-zinc-800 text-gray-200"} style={{flex: "75%"}}>
            <div className={"w-full pl-4 pr-4 text-2xl"}>

              <div className={"h-full rounded-xl flex flex-col  bg-zinc-800 text-gray-200"} style={{overflow: "scroll"}}>

                <div className={"flex"}>

                <div className={"flex mr-auto ml-6 text-xl"}>
                  <Icon icon="akar-icons:twitter-fill" width={28} /> <span className={"ml-2"}>Your Twitter Analytics</span>
                </div>

                  <button type="button"
                          style={{backgroundColor: "#3bff9d"}}
                          onClick={() => {setIsOpen(true)}}
                          className="text-black font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-5 dark:hover:bg-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
                    {" "} <span className={"ml-2"}>Scan Twitter Handle</span>
                  </button>
                </div>

                <div className={"m-12"}>

                  {twitterData.length === 0 ?
                    <>
                   <img src={noData} alt="No Data" style={{width: "50%", margin: "auto"}}/>
                      <h1 style={{textAlign: "center"}}>No data found.</h1>
                    </>
                    :

                    <ol className="relative border-l border-gray-200 dark:border-gray-700">
                      {
                        twitterData.map((data, index) => {
                          return (
                            <SocialCard key={index}
                                        isDiscord={false}
                                        ImageURL={data.ImageURL}
                                        TextContent={data.TextContent}
                                        AuthorDiscordTag={data.AuthorTwitterTag}
                                        AuthorDiscordID={data.AuthorTwitterID}
                                        Datetime={data.Datetime}
                            />
                          )
                        })
                      }
                    </ol>

                  }

                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>


  )

}