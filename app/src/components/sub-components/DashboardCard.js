import {Icon} from "@iconify/react/dist/iconify";

export default function DashboardCard({location, liveLink, data}) {

  return data?.map((current) => (
    <li className="mb-10 ml-6">
                          <span
                            className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full" style={{backgroundColor: "#3bff9d"}}>
                              <Icon icon="jam:triangle-danger-f" width={20} color={"black"} />
                          </span>
      <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
        Location of Threat: {location}
      </h3>
      <time
        className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
         Live Streaming Link: <a rel={"noreferrer noopener"} target={"_blank"} className={"hover:underline"} style={{color: "#1476cc", marginLeft: 5}} href={liveLink}> {liveLink}</a>
      </time>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        Date detected: {new Date(current.Datetime).toLocaleString()}
        </p>
      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        <img src={current.ImageURL} alt={""} />
      </p>
    </li>
  ))
}