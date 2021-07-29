import React from "react";
import Style from "./cover.module.css";
import Spinner from "../components/loading/Spinner";
import SpinnerError from "../components/loading/SpinnerError";
import { useEffect, useState } from "react";

export function Cover({ children, state, id = "AC0ver023" }) {
  const styleCover = {
    width: "100%"
  };

  switch (state) {
    case "loading":
      return (
        <div style={styleCover}>
          <Spinner />
          <div id={id} className={Style.cover}>
            {children}
          </div>
        </div>
      );
    case "error":
      return (
        <div style={styleCover}>
          <SpinnerError />
          <div id={id} className={Style.cover + " " + Style.error}>
            {children}
          </div>
        </div>
      );
    default:
      return (
        <div style={styleCover}>
          <div id={id} className={Style.cover}>
            {children}
          </div>
        </div>
      );
  }
}
