import React, {useEffect, useState} from 'react'
import "../assets/_sidebar.scss"
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import jwtDecode from 'jwt-decode';
import {useNavigate} from "react-router";
import logo from "../assets/favicon.png"

const isMobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

// for active class
var x = false
var x1 = false
var x2 = false
var x3 = false
var x4 = false


export default function Sidebar() {

  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      return navigate("/login")
    } else {
      const token = localStorage.getItem("jwt")
      try {
        const parsed = jwtDecode(token)
      } catch (e) {
        localStorage.removeItem("jwt")

        return navigate("/login")
      }
    }
  }, [localStorage])

  if (isMobile) {
    return (
      <h1>This web application is not available on mobile devices.</h1>
    )
  }
  return (
    <>
      <div className="main-sidebar">
        <div className="sidebar-brand">
          <Link to="/">
            <img src={logo} width={40} height={40} />
          </Link>
        </div>
        <div className="sidebar-inner">
          <div className="naver"></div>

          <ul className="icon-menu">
            <li
            >
                <Link
                  className={x ? "active" : ""}
                  onClick={() => {
                    x1 = x2 = x3 = x4 = false
                    x = true
                  }}
                  id="home-sidebar-menu"
                  to="/"
                  data-content="Dashboards"
                >
                  <Icon icon="bxs:dashboard" width={20} />
              </Link>
            </li>
            <li>
              <Link
                className={x3 ? "active" : ""}
                onClick={() => {
                  x = x1 = x2 = x4 = false
                  x3 = true
                }}
                id="home-sidebar-menu"
                to="/feed"
                data-content="Dashboards"
              >
                <Icon icon="ant-design:camera-filled" width={20} />
              </Link>
            </li>
            <li>
              <Link
                className={x1 ? "active" : ""}
                onClick={() => {
                  x = x2 = x3 = x4 = false
                  x1 = true
                }}
                id="home-sidebar-menu"
                to="/discord"
                data-content="Dashboards"
              >
                <Icon icon="akar-icons:discord-fill" width={20} />
              </Link>
            </li>
            <li>
              <Link
                className={x2 ? "active" : ""}
                onClick={() => {
                  x = x1 = x3 = x4 = false
                 x2 = true
                }}
                id="home-sidebar-menu"
                to="/twitter"
                data-content="Dashboards"
              >
                <Icon icon="akar-icons:twitter-fill" width={20} />
              </Link>
            </li>

          </ul>

          <ul className="bottom-menu">
            <li>
              <Link
                className={x4 ? "active" : ""}
                onClick={() => {
                  x = x1 = x2 = x3 = false
                  x4 = true
                }}
                id="home-sidebar-menu"
                to="/settings"
                data-content="Dashboards"
              >
                <Icon icon="ci:settings" width={20} />
              </Link>
            </li>
            <li>
              <Link
                id="home-sidebar-menu"
                to="/login"
                onClick={() => {
                  localStorage.removeItem("jwt");
                }}
                data-content="Dashboards"
              >
                <Icon icon="akar-icons:sign-out" width={20} />
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </>
  )
}