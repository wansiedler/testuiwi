export const hideLogs =
      typeof window !== "undefined" &&
      new URL(window.location.href).hostname !== "localhost" &&
      new URL(window.location.href).hostname !== "0.0.0.0" &&
      !new URL(window.location.href).hostname.endsWith("web.app") &&
      window.location.href !== "https://uiwiwidget.staging.ippen.space/" &&
      window.location.href !== "https://www.merkur.de/lokales/muenchen-lk/lassen-nicht-verrueckt-machen-2481887.html" &&
      window.location.href !== "https://www.merkur.de/leben/genuss/armin-stadler-kochende-kuenstler-76379.html" &&
      window.location.href !==
            "https://www.webnachrichten.de/sport/fusball/gruendung-eigener-beraterfirma-rangnick-kein-trainer-mehr-zr-90843715.html" &&
      window.location.href !==
            "https://merkur.idstg.de/west/west-teststory-zum-testen-von-internen-verlinkungen-90105811.html";

const env = `${process?.env?.ENVIRONMENT}`;
export const isProduction = `${env}` === "production";

export const IMAGE_LINK = `https://uiwiwidget.${isProduction ? "production" : "staging"}.ippen.space`;
export const getAxCoreQueryAPI = (experimentId) => {
      return `https://public-ax-core-api.${
            isProduction ? "production" : "staging"
      }.ippen.space/v1/experiments/${experimentId}/query`;
};
export type AppProps = {
      quizType?: quizTypes;
      variant?: string;
      slideID?: number | null;
      size?: size;
} & data;

export enum limbicTypes {
      traditionalist = "traditionalist",
      harmoniser = "harmoniser",
      offener = "offener",
      hedonist = "hedonist",
      abenteurer = "abenteurer",
      performer = "performer",
      disziplinierter = "disziplinierter",
      none = "none"
}

export enum themes {
      grill = "grill",
      politik = "politik",
      unset = "unset"
}

//quiz types
export enum quizTypes {
      age = "age",
      ageNew = "ageNew",
      interest = "interest",
      gender = "gender",
      squidGame = "squid-game",
      newsletter = "newsletterType",
      income = "income"
}

// export enum quizTypes {
// 	age,
// 	interest,
// 	gender,
// 	squidGame,
// 	newsletter,
// 	income
// };

export enum variants {
      "variant-1" = "variant-1",
      "variant-2" = "variant-2",
      "variant-3" = "variant-3"
}

export type size = {
      width: number;
      height: number;
      size: string;
};

//sizes
export const sizes: { [key: string]: size } = {
      small: {
            size: "small",
            width: 400,
            height: 343
      },
      age: {
            size: "small",
            width: 400,
            height: 343
      },
      gender: {
            size: "small",
            width: 400,
            height: 343
      },
      medium: {
            size: "medium",
            width: 400,
            height: 425
      },
      big: {
            size: "big",
            width: 400,
            height: 640
      },
      rectangular: {
            size: "rectangular",
            width: 540,
            height: 370
      },
      newsletterSize: {
            size: "newsletterSize",
            width: 692,
            height: 216
      }
};

//quiz types
export const slideTypes = {
      ageStart: "ageStart",
      ageVote: "ageVote",
      ageGroup: "ageGroup",
      ageResult: "ageResult",
      interestsSelect: "interestsSelect",
      interestsQuestion: "interestsQuestion",
      interestsResult: "interestsResult",
      genderStart: "genderStart",
      genderPicture: "genderPicture",
      genderQuestion: "genderQuestion",
      genderConfirm: "genderConfirm",
      genderResults: "genderResults",
      newsletter: "newsletter",
      newsletterSeparate: "newsletterSeparate",
      idle: "idle",
      idleGender: "idleGender",
      squidGameStart: "squidGameStart",
      squidGameQuestion: "squidGameQuestion",
      squidGameResult: "squidGameResult",
      incomeStart: "incomeStart",
      incomeResult: "incomeResult"
};

export type PayloadBody = {
      metadata: {
            key: string;
            timestamp: string;
      };
      origin: {
            system: string;
            useCase: string;
      };
      cmsClientId: number;
      pageViewId: string;
      ip: string;
      userAgent: string;
      payload: Payload;
};

export enum eventTypes {
      CLICK = "CLICK",
      ACTIVE_VIEW = "ACTIVE_VIEW",
      FALLBACK = "FALLBACK",
      USER_IS_IDLE_WITHOUT_REACTION = "userIsIdleWithoutReaction",
      USER_IS_IDLE_AFTER_REACTION = "userIsIdleAfterReaction",
      CHOICE_SELECTED = "choiceSelected"
      // USER_IS_IDLE_WITHOUT_REACTION = "USER_IS_IDLE_WITHOUT_REACTION",
      // USER_IS_IDLE_AFTER_REACTION = "USER_IS_IDLE_AFTER_REACTION",
      // CHOICE_SELECTED = "CHOICE_SELECTED",
}

export type data = {
      clientId?: number;
      categoryName?: string;
      pageViewId?: string;
      uid?: string;
      experimentIdProp?: string;
};
export type EventProps = {
      eventType: eventTypes;
      valueName?: string | null;
      value?: string | null;
};
export type Payload = EventProps & {
      experimentId: string;
      variantId: string;
      device: string;

      transientId: string;
      slideId: string;
      componentName: string;

      location: string | { [k: string]: any };
      time: string;
      category: string;
      client: string;
      userId: string;

      totalSlides: string;
      quizType: quizTypes | "unset";
} & data;
