import {Icon} from "@iconify/react/dist/iconify";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import spng from "../assets/white.png"
import Spinner from 'react-svg-spinner'

const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

export default function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [pointOfContact, setPointOfContact] = useState('');
    const [pointOfContactSMS, setPointOfContactSMS] = useState('');
    // const [discordID, setDiscordID] = useState('');
    // const [twitterID, setTwitterID] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const registerUser = async (location) => {

      const formData = new FormData()
      formData.append('Email', email)
      formData.append('Password', password)
      formData.append('FirstName', firstName)
      formData.append('LastName', lastName)
      formData.append('PhoneNumber', phone)
      formData.append('PointOfContact', pointOfContact)
      formData.append('PointOfContactPhoneNumber', pointOfContactSMS)
      // if (discordID) {
      //   formData.append('DiscordID', discordID)
      // }
      // if (twitterID) {
      //   formData.append('TwitterID', twitterID)
      // }
      formData.append("Location", location)

      try {
        const response = await axios.post('http://localhost:8080/register', formData)
        const response2 = await axios.post("http://localhost:8080/login", {
          "EmailAddress": email,
          "Password": password
        })
        const d = await response2.data.token
        localStorage.setItem("jwt", d)

        setIsLoading(false)
        navigate("/")
      } catch (err) {
        if (err.response.data === "EmailAddress already found") {
          alert("Email address has already been taken.")
        }
        setIsLoading(false)
      }

      }

  if (isMobile) {
    return (
      <h1>This web application is not available on mobile devices.</h1>
    )
  }
  return (
    <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
         style={{
           backgroundImage: "url(https://images.unsplash.com/photo-1496588152823-86ff7695e68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)",
           // backgroundSize: "contain",
           backgroundRepeat: "no-repeat",
           backgroundPosition: "center",
           backgroundAttachment: "fixed"

         }}
    >
      <div className="w-4/12 space-y-8 bg-white p-10 rounded-2xl">
        <div>
          <img style={{margin: "auto", borderRadius: "1%"}} src={spng} width={90}/>
          <h2 className="mt-6 text-center text-3xl font-extrabold">Sign up for SafeTracker</h2>

        </div>
        <div className="mt-8 space-y-6">
            <div className="mt-10 sm:mt-0">
              <div className="flex justify-center">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="shadow overflow-hidden sm:rounded-md">
                      <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                              First name
                            </label>
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="p-2 w-full rounded-lg"
                              style={{border: "2px solid lightgrey"}}
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                              Last name
                            </label>
                            <input
                              type="text"
                              name="last-name"
                              id="last-name"
                              autoComplete="family-name"
                              className="p-2 w-full rounded-lg"
                              style={{border: "2px solid lightgrey"}}
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                              Email address
                            </label>
                            <input
                              type="text"
                              name="email-address"
                              id="email-address"
                              autoComplete="email"
                              className="p-2 w-full rounded-lg"
                              style={{border: "2px solid lightgrey"}}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="p-2 w-full rounded-lg"
                              style={{border: "2px solid lightgrey"}}
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                              Password
                            </label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              autoComplete="address-level2"
                              className="p-2 w-full rounded-lg"
                              style={{border: "2px solid lightgrey"}}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                              Point Of Contact
                            </label>
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="p-2 w-full rounded-lg"
                              style={{border: "2px solid lightgrey"}}
                              value={pointOfContact}
                              onChange={(e) => setPointOfContact(e.target.value)}
                            />
                          </div>
                          <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                              Point Of Contact's SMS
                            </label>
                            <input
                              type="text"
                              name="street-address"
                              id="street-address"
                              autoComplete="street-address"
                              className="p-2 w-full rounded-lg"
                              style={{border: "2px solid lightgrey"}}
                              value={pointOfContactSMS}
                              onChange={(e) => setPointOfContactSMS(e.target.value)}
                            />
                          </div>
                          {/*<div className="col-span-6 sm:col-span-3 lg:col-span-3">*/}
                          {/*  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">*/}
                          {/*    Discord ID (optional)*/}
                          {/*  </label>*/}
                          {/*  <input*/}
                          {/*    type="text"*/}
                          {/*    name="street-address"*/}
                          {/*    id="street-address"*/}
                          {/*    autoComplete="street-address"*/}
                          {/*    className="p-2 w-full rounded-lg"*/}
                          {/*    style={{border: "2px solid lightgrey"}}*/}
                          {/*    value={discordID}*/}
                          {/*    onChange={(e) => setDiscordID(e.target.value)}*/}
                          {/*  />*/}
                          {/*</div>*/}
                          {/*<div className="col-span-6 sm:col-span-3 lg:col-span-3">*/}
                          {/*  <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">*/}
                          {/*    Twitter ID (optional)*/}
                          {/*  </label>*/}
                          {/*  <input*/}
                          {/*    type="text"*/}
                          {/*    name="street-address"*/}
                          {/*    id="street-address"*/}
                          {/*    autoComplete="street-address"*/}
                          {/*    className="p-2 w-full rounded-lg"*/}
                          {/*    style={{border: "2px solid lightgrey"}}*/}
                          {/*    value={twitterID}*/}
                          {/*    onChange={(e) => setTwitterID(e.target.value)}*/}
                          {/*  />*/}
                          {/*</div>*/}

                        </div>
                      </div>
                    </div>
                </div>
            </div>

          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {

                if (firstName === "" || lastName === "" || email === "" || phone === "" || password === "" || pointOfContact === "" || pointOfContactSMS === "") {
                  alert("Please fill out all fields")
                  return
                }

                if (password.length < 8) {
                  alert("Password must be at least 8 characters")
                  return
                }

                if (phone.length < 10) {
                  alert("Phone number must be at least 10 digits")
                  return
                }

                if (pointOfContactSMS.length < 10) {
                  alert("Point of contact's SMS number must be at least 10 digits")
                  return
                }

                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(String(email).toLowerCase())) {
                  alert("Email is invalid")
                  return
                }

                const re2 = /^\d{10}$/;
                if (!re2.test(String(phone).toLowerCase())) {
                  alert("Phone number is invalid")
                  return
                }
                if (!re2.test(String(pointOfContactSMS).toLowerCase())) {
                  alert("Point Of Contact SMS is invalid")
                  return
                }

                if (window.navigator.geolocation) {

                  setIsLoading(true)
                  window.navigator.geolocation.getCurrentPosition(
                    (success) => {
                      const { latitude, longitude } = success.coords;
                      fetch(
                        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=2cb236a94ac444caa818afeb6dad19ac`
                      )
                        .then((response) => response.json())
                        .then(({ results }) => {
                          registerUser(results[0].formatted)
                        });
                    },
                    (fail) => {
                      alert("You must enable location viewing permissions.");
                    }
                  );
                }


              }
              }
            >
              {isLoading ? <Spinner size={24} thickness={3} gap={0.9} /> : "Sign up"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Already have an account? Sign in here.
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}