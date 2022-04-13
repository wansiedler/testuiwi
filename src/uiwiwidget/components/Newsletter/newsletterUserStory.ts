import { guid } from "../../util";
import { slideTypes } from "../../types";
import { Story } from "../Stories/types";

export const newsletterUserStory: Story[] = [
      {
            id: guid(),
            type: slideTypes?.newsletterSeparate
      }
];
