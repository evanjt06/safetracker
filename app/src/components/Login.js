import {Icon} from "@iconify/react/dist/iconify";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import Spinner from "react-svg-spinner";
import spng from "../assets/white.png"

const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

export default function Login() {

  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {

    try {
      const response2 = await axios.post("http://localhost:8080/login", {
        "EmailAddress": email,
        "Password": password
      })
      const d = await response2.data.token
      localStorage.setItem("jwt", d)

      setLoading(false)
      navigate("/")
    } catch (err) {
      console.log(err)
      setLoading(false)
      setMsg("Invalid email or password.")
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
           backgroundImage: "url(https://images.unsplash.com/photo-1483653085484-eb63c9f02547?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80)",
           // backgroundSize: "contain",
           backgroundRepeat: "no-repeat",
           backgroundPosition: "center",
           backgroundAttachment: "fixed"

         }}
    >
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl">
        <div>
          <img style={{margin: "auto", borderRadius: "1%"}} src={spng} width={90}/>
          <h2 className="mt-6 text-center text-3xl font-extrabold">Sign in to SafeTracker</h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className={"pb-4"}>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            {msg !== "" &&
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">Uh oh!</p>
                <p>{msg}</p>
              </div>}
          </div>

          <div>
            <button
              onClick={
                () => {

                  if (email === "") {
                    setMsg("Please enter your email address.")
                  }

                  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if (!re.test(String(email).toLowerCase())) {
                    setMsg("Please enter a valid email address.")
                    return
                  }

                  if (password === "") {
                    setMsg("Please enter your password.")
                  }

                  setLoading(true)
                  loginUser()
                }
              }
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ?  <Spinner size={24} thickness={3} gap={0.9} /> : "Sign in"}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Don't have an account? Sign up here
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>

  )
}