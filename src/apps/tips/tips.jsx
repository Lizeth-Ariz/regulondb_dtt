import React from "react";
import { Cover, Tabs } from "../../ui-components/ui_components";
import E404 from "./error/e404";

const Tips = ({ error }) => {
  if (error === "404") {
    return <E404 />;
  }
  return (
    <>
      <Cover>
        <h1>Tips de Desarrollo</h1>
      </Cover>
      <Tabs />
      <article>
        <h2>Iniciando...</h2>
      </article>
    </>
  );
};

export default Tips;
