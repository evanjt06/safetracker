import Sidebar from "./Sidebar";
import SocialCard from "./sub-components/SocialCard";
import {useEffect, useState} from "react";
import axios from 'axios'
import noData from '../assets/no-data.svg'
import {Icon} from "@iconify/react";
import { AnnotationIcon, ClockIcon, ChartPieIcon, UsersIcon } from '@heroicons/react/outline'
import React from "react";

const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

export default function DiscordBot() {

  const features = [
    {
      name: 'Hourly Server Scans',
      description:
        'The SafeTracker Discord Bot will scan your server(s) hourly and send you a message if there is any suspicious activity.',
      icon: ClockIcon,
    },
    {
      name: 'User Detection',
      description:
        'You will be notified of the user\'s Discord ID and Discord Tag whenever suspicious activity is detected.',
      icon: UsersIcon,
    },
    {
      name: 'Visual Graphs',
      description:
        'Whenever a suspicious message is detected, the SafeTracker Discord Bot will send you a visual graph of how severe the threat is.',
      icon: ChartPieIcon,
    },
    {
      name: 'Privacy Oriented',
      description:
        'The data the SafeTracker Bot collects is not stored in a database or shared with anyone except you.',
      icon: AnnotationIcon,
    },
  ]

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
          <div className={"h-full mt-10 rounded-xl flex flex-col  bg-zinc-800 text-gray-200"} style={{flex: "75%"}}>

            <div className="py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                  <div className={"flex mr-auto ml-2 text-xl"}>
                    <Icon icon="akar-icons:discord-fill" width={28} /> <span className={"ml-2"}>SafeTracker Discord Bot</span>
                  </div>
                </div>

                <div className="mt-10">
                  <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    {features.map((feature) => (
                      <div key={feature.name} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-black" style={{backgroundColor: "#3bff9d"}}>
                            <feature.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <p className="ml-16 text-lg font-bold leading-6 font-medium">{feature.name}</p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            <div className={"w-full pl-4 pr-4"}>

              <div className={"flex justify-center h-full rounded-xl bg-zinc-800 text-gray-200"} style={{overflow: "scroll"}}>
                  <button type="button" style={{width: 200}}
                          onClick={() => {
                            window.open("https://discordapp.com/oauth2/authorize?&client_id=990756358775246868&permissions=8&scope=bot", "_blank")
                          }}
                          className="text-white bg-gradient-to-br from-purple-600 to-blue-500  font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-10">
                    <div className={"m-auto flex justify-center items-center"}>
                      <Icon icon="akar-icons:discord-fill" /> <span className={"ml-2"}>Add To Discord</span>
                    </div>
                  </button>
              </div>
            </div>

          </div>
        </div>

      </div>
      </div>


  )

}