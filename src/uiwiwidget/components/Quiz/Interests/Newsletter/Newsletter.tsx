import React, { useEffect, useRef, useState } from "react";
// import {Logo} from "../Logo/Logo";

export const Newsletter = ({ text = "", buttonText = "Zum Newsletter anmelden ➞", subtext = "", ...props }) => {
      // console.log(props.setBufferAction)
      const [email, setEmail] = useState("");
      const [completed, setCompleted] = useState(false);

      const [isValid, setIsValid] = useState(false);
      const [message, setMessage] = useState("");

      const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

      // const dispatch = useAppDispatch();
      useEffect(() => {
            // dispatch(setFinished());
      }, []);

      const form = useRef(null);
      const handleChange = (event) => {
            // console.log(event)
            const email = event.target.value;
            setEmail(email);
            const pattern = new RegExp(
                  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(email)) {
                  setIsValid(false);
            } else {
                  setIsValid(true);
            }
            event.preventDefault();
      };

      const ip = fetch("https://www.cloudflare.com/cdn-cgi/trace")
            .then((res) => res.text())
            .then((data) => {
                  const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
                  return data.match(ipRegex)[0];
            });

      const API = "https://newsletter.production.ippen.space/api/subscribe";
      // const API = "https://newsletter.staging.ippen.space/api/subscribe";

      const newsletterSubscribe = async () => {
            const headers = new Headers();
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            // headers.append("Authorization", "Basic " + window.btoa("idapi:gZjs2F03"));

            const uid = document.cookie.split(";").find((item) => item.trim().startsWith("cua_uuid="));

            const t = {
                  client: "merkur-de",
                  clientId: "123",
                  recipientList: "daily",
                  email: "wesb@wansiedler.com",
                  provider: "intern",
                  created: "2021-01-01T13:37:00.000",
                  campaign: "test",
                  ipAddress: "127.0.0.1",
                  userAgent: "Firefox",
                  referer: "test",
                  doiEmailContent: "test",
                  userId: "",
                  agbAccepted: true,
                  sendDoiEmail: true
            };

            const body = {
                  client: "merkur-de", // client needs to be requested from us. required if clientId is missing (client alias from cms)
                  clientId: 268, // client id needs to be requested from us. this is the preferred parameter to define the brand. Optional when client is defined.
                  recipientList: "wohnen", // needs to be requested from us. required (name of the mailing list the user is subscribing to)
                  campaign: "test", // optional campaign name
                  doiEmailContent: "test",
                  provider: "uiwi", //needs to be requested from us. required (provider identifier – e.g. pinpoll, fanmatics etc.)

                  userId: uid, // optional, set if available
                  // ipAddress: await ip || "127.0.0.1",
                  ipAddress: "127.0.0.1",
                  created: new Date().toISOString(), // format iso 8601
                  userAgent: window.navigator.userAgent, // you provide the useragent
                  referer: window.location.href, //the url where the wiged is embedded in e.g www.merkur.de./wohnen/...
                  sendDoiEmail: true,
                  agbAccepted: true,
                  email
            };

            const req = new Request(API, {
                  method: "POST",
                  headers,
                  body: JSON.stringify(body)
                  // mode: "no-cors"
                  // credentials: "include",
            });

            fetch(req)
                  .then((response) => {
                        if (response.ok) {
                              return response.json();
                        }
                        console.info(headers);
                        console.info(body);
                        console.info(response);
                        throw new Error("BAD HTTP stuff");
                  })
                  .then((response) => {

                        setCompleted(true);
                  })
                  .catch((err) => {
                        console.info(headers);
                        console.info(body);
                        setMessage("err.message");

                  });
      };

      const data = {
            client: "fr",
            clientId: 317,
            recipientList: "zukunft",
            email: "James.hankon@gmail.com",
            provider: "cmf",
            created: "2021-09-20T12:30:00.000Z",
            campaign: "zukunft",
            sendDoiEmail: true,
            ipAddress: "127.0.0.1",
            userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/5",
            referer: "https://www.fr.de/zukunft/storys/klima/zukunft-klima-kniff-hannah-",
            userId: "123dsa-ztsd10sa-dsal565dsa",
            agbAccepted: true
      };

      const createSubscription = async () => {
            // await axios.post(API, data, {
            //     headers: {
            //         "Accept": "application/json",
            //         "Content-Type": "application/json"
            //     },
            //     auth: {
            //         username: "idapi",
            //         password: "f78hs2B9Yrdx"
            //     }
            // }).then(function (response) {


            // }).catch(function (error) {

            // });
      };

      const handleSubmit = async (event) => {
            event.preventDefault();
            if (!isValid) {
                  setMessage("Korrekte Email bitte");
                  return;
            }

            // await createSubscription();
            await newsletterSubscribe();
      };

      const render = () => {
            if (completed) {
                  return <div className="newsletter-danke">Danke!</div>;
            }
            return (
                  <form onSubmit={handleSubmit} ref={form}>
                        <div className={`message ${isValid ? "success" : "error"}`}>{message}</div>
                        <input
                              type="text"
                              value={email}
                              name="email"
                              onChange={handleChange}
                              ref={inputRef}
                              id="email-input"
                              placeholder="Ihre E-Mail-Adresse"
                        />
                        <button className="newsletter-button" type={"submit"}>
                              {buttonText}
                        </button>
                        {/*<input*/}
                        {/*    style={{*/}
                        {/*        display: "block",*/}
                        {/*        lineHeight: "40px",*/}
                        {/*        width: "135px",*/}
                        {/*        // padding:'0 30px',*/}
                        {/*        margin: "20px auto",*/}
                        {/*        borderRadius: 0,*/}
                        {/*        background: "transparent",*/}
                        {/*        border: "2px solid #168ACC",*/}
                        {/*        color: "black",*/}
                        {/*    }}*/}
                        {/*    type="submit"*/}
                        {/*    value="Nein, danke! ➞"*/}
                        {/*/>*/}
                  </form>
            );
      };

      return (
            <div className="newsletter-container">
                  <h4>{text}</h4>
                  <p>{subtext}</p>
                  {render()}
                  {/*<Logo/>*/}
            </div>
      );
};
