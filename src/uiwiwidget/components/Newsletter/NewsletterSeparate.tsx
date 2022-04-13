import React, { useEffect, useRef, useState } from "react";
import "./newsletterSeparate.scss";
import { eventTypes, getAxCoreQueryAPI, isProduction } from "../../types";
import { randomize } from "../../util";
import { Icon } from "./icon";

enum clients {
	ruhr24 = "ruhr24",
	frankfurter = "frankfurter",
	hna = "hna"
}

type varintType = {
	title: string;
	subtext: string;
	button?: string;
	titleConfirmed?: string;
	subtextConfirmed?: string;
	imageCopyright?: string;
	emailPlaceholder?: string;
};
export type NewsletterSeparateProps = {
	buttonText?: string;
	titleConfirmedDefault?: string;
	subtextConfirmedDefault?: string;
	emailPlaceholderDefault?: string;
	API?: string;
	propCompleted?: boolean;
	propDevice?: string;
	propVariant?: string;
	emailPlaceholder?: string;
	clientID: number;
	experimentID: string | string[];
	client: string;
	recipientList: string[];
	classProp: "ruhr24" | "frankfurter" | "hna";
	variants: {
		[key: string]: varintType;
	};
};
export const NewsletterSeparate = ({
	                                   API = "https://newsletter.production.ippen.space/api/subscribe",
	                                   buttonText = "Zum Newsletter anmelden ➞",
	                                   emailPlaceholderDefault = "Deine E-Mail Adresse",
	                                   titleConfirmedDefault = "Danke für Ihre Newsletter-Anmeldung.",
	                                   subtextConfirmedDefault = "Wir haben Ihnen eine E-Mail mit einem Bestätigungslink gesendet " +
	                                   "– bitte schauen Sie jetzt in Ihr Postfach!",
	                                   propDevice = "unset",
	                                   propVariant = "variant-1",
	                                   experimentID = "unset",
	                                   client = "unset",
	                                   propCompleted = false,
	                                   classProp,
	                                   clientID,
	                                   variants,
	                                   recipientList
                                   }: NewsletterSeparateProps) => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(false);
	const [completed, setCompleted] = useState(propCompleted);

	const [variant, setVariant] = useState(propVariant);
	const [variantText, setVariantText] = useState<varintType>(
		variants[propVariant] ?? {
			title: "unset",
			subtext: "unset"
		}
	);

	experimentID = Array.isArray(experimentID) ? randomize(experimentID) : experimentID;

	const [experiment, setExperiment] = useState<string>(experimentID);
	const [device, setDevice] = useState(propDevice);
	const [isValid, setIsValid] = useState(false);
	const [message, setMessage] = useState("");

	const getDeviceType = async (link = document.location.toString()): Promise<string> => {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();
			request.open("GET", `${link}?site-currentness-measurement-header=true`, true);
			request.onreadystatechange = function () {
				if (this.readyState === this.HEADERS_RECEIVED) {
					const header = request.getResponseHeader("x-ua-device");
					return header ? resolve(header.replace("-", "_").toUpperCase()) : resolve("unset");
				}
			};
			request.onerror = function () {
				reject(`Error getting the device: ${request.status}: ${request.statusText}`);
			};
			request.send();
		});
	};
	type axCoreAnswer = {
		result: {
			parameters: {
				type: string;
			};
			variant: string;
		};
	};
	const askAXCore = async (): Promise<axCoreAnswer> => {
		return new Promise((resolve, reject) => {
			const link = getAxCoreQueryAPI(experimentID);
			const userId =
				document.cookie
					.split(";")
					.find((item) => item.trim().startsWith("cua_uuid="))
					?.split("=")[1] ?? "unset";
			const body = {
				return_parametrization: true,
				context: {
					user_agent: navigator?.userAgent
				}
			};
			let url = new URL(link);
			const urlParams = new URLSearchParams(url.search);
			urlParams.set("user_id", userId);
			url.search = urlParams.toString();
			// fetch(`${link}`, {
			fetch(url.toString(), {
				headers: {
					"Content-Type": "application/json",
					accept: "application/json"
				},
				method: "POST",
				body: JSON.stringify(body)
			})
				.then(async (response) => {
					const result = await response.json();
					result === "" ? reject() : resolve(result);
				})
				.catch((error) => {
					reject(error);
				});
		});
	};

	useEffect(() => {
		if (device === "unset") {
			askAXCore()
				.then(({ result }) => {
					setVariant(result.variant);
					setVariantText(variants[result.variant]);

					getDeviceType()
						.then((gadget) => {
							setDevice(gadget);
						})
						.catch(() => {
						});
				})
				.catch((error) => {
				});
		}
	}, []);
	useEffect(() => {
		device !== "unset" ? sendEvent({ eventType: eventTypes.ACTIVE_VIEW }) : null;
	}, [device]);
	const sendEvent = async ({ eventType }: { eventType: string }) => {
		const url = `https://idat.${isProduction ? "production" : "staging"}.ippen.space/dev`;
		try {
			let userId =
				document?.cookie?.split(";").find((item) => item.trim().startsWith("cua_uuid="))?.split("=")[1] ?? "unset";

			const payload: {
				eventType: string;
				experimentId: string;
				variantId: string;
				device: string;
				transientId: string;
			} = {
				eventType,
				experimentId: experiment,
				variantId: variant,
				device,
				transientId: userId
			};

			const body = {
				metadata: {
					key: "cxo-key"
				},
				origin: {
					system: "cxo-quiz",
					useCase: "cxo-quiz-dev"
				},
				cmsClientId: "381",
				pageViewId: "dummy",
				userAgent: navigator.userAgent,
				payload
			};
			const settings = {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				method: "POST",
				body: JSON.stringify(body)
			};

			fetch(url, settings).then().catch();
		} catch (e) {
			console.error(error);
		}
	};
	const form = useRef(null);
	const handleChange = (event) => {
		// console.log(event)
		const email = event?.target.value;
		setEmail(email);
		const pattern = new RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
		);
		if (!pattern.test(email)) {
			setIsValid(false);
		} else {
			setIsValid(true);
		}
		event?.preventDefault();
	};

	const newsletterSubscribe = async () => {
		const headers = new Headers();
		headers.append("Accept", "application/json");
		headers.append("Content-Type", "application/json");

		const uid = document.cookie.split(";").find((item) => item.trim().startsWith("cua_uuid="));

		const body = {
			client,
			clientId: clientID,
			recipientList: recipientList.join(","), //: "wohnen", // needs to be requested from us. required (name of the mailing list the user is subscribing to)
			email,
			campaign: "test", // optional campaign name
			doiEmailContent: "test",
			provider: "uiwi", //needs to be requested from us. required (provider identifier – e.g. pinpoll, fanmatics etc.)

			userId: uid, // optional, set if available
			created: new Date().toISOString(), // format iso 8601
			userAgent: window.navigator.userAgent, // you provide the useragent
			referer: window.location.href, //the url where the wiged is embedded in e.g www.merkur.de./wohnen/...
			sendDoiEmail: true,
			agbAccepted: true
		};

		fetch(API, {
			method: "POST",
			headers,
			body: JSON.stringify(body)
		})
			.then((response) => {
				if (response.ok) {
					device !== "unset"
						? sendEvent({
							eventType: eventTypes.CLICK
						})
						: null;
					setCompleted(true);
					setError(false);
					return response.json();
				}
				setError(true);
				setMessage("Error");
			})
			.catch((err) => {
				setError(true);
				setMessage("Error");
			});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!isValid) {
			setError(true);
			setMessage("E-Mail Adresse ungültig.");
			return;
		}
		setError(false);
		await newsletterSubscribe();
	};

	const { button, title, subtext, titleConfirmed, subtextConfirmed, imageCopyright, emailPlaceholder } =
		variantText;

	const showImageCopyright = () => {
		if (imageCopyright === "unsplash") {
			return <div className={"image-copyright"}>© Unsplash</div>;
		}
		return null;
	};

	const render = () => {
		return !completed ? (
			<>
				<div className={"text-container"}>
					<div className="title">{title}</div>
					<div className="description">{subtext}</div>
					<div>
						<form onSubmit={handleSubmit} ref={form}>
							<div className="email-form">
								{error && message && <div className={"error"}>{message}</div>}
								<input
									type="text"
									value={email}
									name="email"
									onChange={handleChange}

									id="email-input"
									placeholder={emailPlaceholder ?? emailPlaceholderDefault}
								/>
								<button className="id-uiwi-button newsletter-button" type={"submit"}>
									{button ?? buttonText}
								</button>
							</div>
						</form>
						<div className={"tip"}>
							Mit Klick auf den Button "Zum Newsletter anmelden" stimme ich den{" "}
							<a
								href={`https://${
									new URL(window.location.href).hostname
								}/ueber-uns/datenschutz/`}
							>
								Datenschutzbestimmungen
							</a>{" "}
							zu.
						</div>
					</div>
				</div>
			</>
		) : (
			<>
				<div className="newsletter-danke">
					<div className="newsletter-icon-wrapper"/>
					<div className="text">
						<div className="title">{titleConfirmed ?? titleConfirmedDefault}</div>
						<div>{subtextConfirmed ?? subtextConfirmedDefault}</div>
					</div>
					{showImageCopyright()}
				</div>
			</>
		);
	};

	return (
		<div className={"newsletterSeparate"}>
			<div className={classProp}>
				<div className={variant}>
					<div className={"newsletter-container"}>
						<div id={"logo"}/>

						{/*<img id={"logo"} alt={"logo"} />*/}
						{render()}
						{showImageCopyright()}
					</div>
				</div>
			</div>
		</div>
	);
};
