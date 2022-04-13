import React from "react";

import "./logo.scss";

export const Logo = ({ ...props }) => {
      const client: {
            url: string;
            alt: string;
            href: string;
      } = {
            url: "",
            alt: "",
            href: ""
      };
      if (Object.values(props).includes("tz")) {
            client.url = "./logos/tz-logo.png";
            client.alt = "tz.de";
      } else {
            client.url = "./logos/merkur.png";
            client.alt = "merkur.de";
      }
      client.href = `https://www.${client.alt}/`;
      return (
            <a className="logo" href={client.href}>
                  <img
                        src={require(`${client.url}`)}
                        // width="30"
                        // height="30"
                        alt={client.alt}
                  />
            </a>
      );
};
