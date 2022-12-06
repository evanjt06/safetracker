import {Icon} from "@iconify/react/dist/iconify";

export default function SocialCard({isDiscord, ImageURL, TextContent, AuthorDiscordTag, AuthorDiscordID, Datetime}) {
  return (

      <li className="flex items-center mb-10 ml-6">
        <div className={"flex-1"}>
                      <span
                        className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full" style={{backgroundColor: "#3bff9d"}}>
                        {isDiscord ?  <Icon icon="akar-icons:discord-fill" width={20} color={"black"}/> : <Icon icon="akar-icons:twitter-fill" width={20} color={"black"} />}
                      </span>
          <h1 className="flex items-center mb-1 text-lg font-bold text-gray-900 dark:text-white">
            Detected user: {AuthorDiscordTag}
          </h1>
          <p className="mt-4 mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <b>User's Twitter Handle:</b> <span className={"text-white"}>@{AuthorDiscordID}</span>
          </p>
          <p className="mt-4 mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <b>Date detected:</b> <span className={"text-white"}>{new Date(Datetime).toLocaleString()}</span>
          </p>
          <p className="mt-4 mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            <b>Detected Message Threat:</b> <span className={"text-white"}>{" " + TextContent}</span>
          </p>
        </div>

        <div className={"flex-1 ml-4"}>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              <img src={ImageURL} alt={""} />
            </p>
        </div>
      </li>


  )
}