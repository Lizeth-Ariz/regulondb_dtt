import React from "react";
import Style from "./cover.module.css";
import Spinner from "../components/loading/Spinner";
import SpinnerError from "../components/loading/SpinnerError";

export function Cover({ children, state, id = "AC0ver023", menssage }) {
  const styleCover = {
    width: "100%"
  };

  switch (state) {
    case "loading":
      if (!menssage) {
        menssage = "loading ...";
      }
      return (
        <div style={styleCover}>
          <Spinner key={id} />
          <div id={id} className={Style.cover + " " + Style.anm}>
            {menssage}
            {children}
          </div>
        </div>
      );
    case "error":
      if (!menssage) {
        menssage = "oops... an error has occurred";
      }
      return (
        <div style={styleCover}>
          <SpinnerError key={id} />
          <div id={id} className={Style.cover + " " + Style.error}>
            {menssage}
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
