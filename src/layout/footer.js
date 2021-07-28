import React from "react";
import { Image } from "../ui-components/ui_components";
import conf from "./conf/footer.conf.json";
import { Schema, ImageObject } from "../conf/schemas/schemas";

const logos = conf.logos;
const links = conf.links;
const description = conf.description;

const Footer = ({ urlPage }) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ backgroundColor: "#1F3D4E" }}></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <table>
              <tbody>
                <tr>
                  {logos.map((img) => {
                    return (
                      <td
                        key={img.id}
                        style={{
                          verticalAlign: "middle",
                          borderRight: "1px solid #D5D5D7"
                        }}
                      >
                        <Image
                          id={img.id}
                          imgTitle={img.title}
                          imgAlt={img.description}
                          urlImage={`${urlPage}${img.url}`}
                          imgStyle={{ maxWidth: "159px", maxHeight: "32px" }}
                        />
                        <Schema
                          jsonLd={ImageObject({
                            name: img.title,
                            description: img.description,
                            url: `${urlPage}${img.url}`
                          })}
                        />
                      </td>
                    );
                  })}
                  <td></td>
                  <td style={{ textAlign: "right", color: "#666666" }}>
                    {links.map((link, index) => {
                      return (
                        <a
                          key={`footer_links_${index}-${link}`}
                          href={link.url}
                          style={{ paddingLeft: "10px" }}
                        >
                          {link.name}
                        </a>
                      );
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: "12px",
                marginLeft: "10%",
                marginRight: "10%"
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <br />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

/*
<div>
            <br />
            <div style={{ borderTop: "5px solid var(--color-blue1)", width: "100%" }} />
            <div>

            </div>
            <div style={StyleSide}>
                <br/>
                
            </div>
            <div>

            </div>
        </div>
*/

export default Footer;
