import Sidebar from "./Sidebar";
import {useEffect, useState} from "react";
import axios from 'axios'
import {Icon} from "@iconify/react";
import React from "react";

const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

export default function Settings() {

  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pointOfContact, setPointOfContact] = useState("");
  const [pointOfContactPhoneNumber, setPointOfContactPhoneNumber] = useState("");

  const validate = () => {
    if (emailAddress.length === 0) {
      alert("Email address is required");
      return false;
    }
    if (firstName.length === 0) {
      alert("First name is required");
      return false;
    }
    if (lastName.length === 0) {
      alert("Last name is required");
      return false;
    }
    if (location.length === 0) {
      alert("Location is required");
      return false;
    }
    if (phoneNumber.length === 0) {
      alert("Phone number is required");
      return false;
    }
    if (pointOfContact.length === 0) {
      alert("Point of Contact is required");
      return false;
    }
    if (pointOfContactPhoneNumber.length === 0) {
      alert("Point of Contact Phone Number is required");
      return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(emailAddress).toLowerCase())) {
      alert("Email is invalid")
      return false
    }
    const re2 = /^\d{10}$/;
    if (!re2.test(String(phoneNumber).toLowerCase())) {
      alert("Phone number is invalid")
      return
    }
    if (!re2.test(String(pointOfContactPhoneNumber).toLowerCase())) {
      alert("Point Of Contact Phone Number is invalid")
      return
    }

    return true;
  }

  const updateUser = () => {

    const formData = new FormData()
    formData.append("Email", emailAddress)
    formData.append("FirstName", firstName)
    formData.append("LastName", lastName)
    formData.append("Location", location)
    formData.append("PhoneNumber", phoneNumber)
    formData.append("PointOfContact", pointOfContact)
    formData.append("PointOfContactPhoneNumber", pointOfContactPhoneNumber)

    axios.put("http://localhost:8080/auth/user", formData,
      {
        headers:
          {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
      })
  }

  useEffect(() => {
    axios.get("http://localhost:8080/auth/user", {headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
      }}).then(res => {

       const {
         EmailAddress,
         FirstName,
         LastName,
         Location,
         PhoneNumber,
         PointOfContact,
         PointOfContactPhoneNumber
       } = res.data;

       setEmailAddress(EmailAddress);
        setFirstName(FirstName);
        setLastName(LastName);
        setLocation(Location);
        setPhoneNumber(PhoneNumber);
        setPointOfContact(PointOfContact);
        setPointOfContactPhoneNumber(PointOfContactPhoneNumber);

    })
  }, [])

  if (isMobile) {
    return (
      <h1>This web application is not available on mobile devices.</h1>
    )
  }
  return (
    <div style={{background: "#3b3b40", height: "100vh"}}>
      <Sidebar />

      <div className={"flex flex-col ml-20 h-full"}>
        <div className={"flex w-3/4 ml-auto mr-auto"} style={{height: "83vh"}}>

          <div className={"h-full mt-10 rounded-xl pt-6 flex flex-col  bg-zinc-800 text-gray-200"} style={{flex: "75%", overflow: "scroll"}}>

            <div className={"flex justify-start pl-5 text-xl text-gray-200 pb-1"}>
              <Icon icon="ci:settings" width={28} /> <span className={"ml-1"}>Settings</span>
            </div>

            <div className={"w-full p-6 text-2xl"}>

                <div className="grid gap-6 mb-6 lg:grid-cols-2">
                  <div>
                    <label htmlFor="first_name"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                      name</label>
                    <input type="text" id="first_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required=""
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                    <input type="text" id="last_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required=""
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email
                      address</label>
                    <input type="email" id="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number
                        </label>
                      <input
                             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  <div>
                    <label htmlFor="last_name"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Point Of Contact</label>
                    <input type="text" id="last_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required=""
                            value={pointOfContact}
                            onChange={(e) => setPointOfContact(e.target.value)}

                    />
                  </div>
                  <div>
                    <label htmlFor="last_name"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Point Of Contact's Phone Number</label>
                    <input type="text" id="last_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required=""
                            value={pointOfContactPhoneNumber}
                            onChange={(e) => setPointOfContactPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div  className="mb-6">
                    <label htmlFor="last_name"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Location</label>
                    <input type="text" id="last_name"
                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required=""
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  style={{background: "#3bff9d"}}
                        className="text-slate-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  onClick={() => {
                    if (validate()) {
                      updateUser()
                    }
                }}>
                  Save Changes
                </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
