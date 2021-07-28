import React from "react";
import { Image } from "../ui-components/ui_components";
import { Schema, ImageObject } from "../conf/schemas/schemas";

const urlLogo = "media/img/logos/regulonDB.png";

const Header = ({ isHome, urlPage }) => {
  return (
    <header style={StyleHeader}>
      <div style={StyleSide}>
        <Image
          id={"logoRegulon"}
          imgTitle="RegulonDB logo"
          imgAlt="Logo of RegulonDB"
          urlImage={`${urlPage}${urlLogo}`}
          imgStyle={{ maxWidth: "239px", maxHeight: "48px" }}
        />
        <Schema
          jsonLd={ImageObject({
            name: "RegulonDB logo",
            description: "Logo of RegulonDB",
            url: `${urlPage}${urlLogo}`,
            representativeOfPage: "true"
          })}
        />
      </div>
      <div style={StyleSideB}>
        {!isHome ? (
          <div />
        ) : (
          <>
            <a className="aAccent" href="/TermsConditions">
              Terms and conditions
            </a>
            <a
              className="aAccent"
              href="/Contact"
              style={{ paddingLeft: "10px" }}
            >
              Contact US
            </a>
            <a
              className="aAccent"
              href="/Funding"
              style={{ paddingLeft: "10px" }}
            >
              Funding
            </a>
          </>
        )}
      </div>
    </header>
  );
};

const StyleHeader = {
  content: "",
  display: "flex",
  clear: "both",
  marginLeft: "10%"
};

const StyleSide = {
  width: "60%",
  float: "left"
};
const StyleSideB = {
  width: "40%",
  float: "left"
};

export default Header;
