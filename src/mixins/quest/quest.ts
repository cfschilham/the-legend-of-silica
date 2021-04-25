import { Campaign } from "@/mixins/campaign";

export class Quest {
  public type: string;
  public title: string;
  public description: string;
  public id: string;
  public duration: number;

  // Functions to determine whether or not this quest is available with the state
  // of the current campaign.
  public prerequisites: Array<{ title: string; secret: boolean; isFulfilled: (campaign: Campaign) => boolean }>;

  // If true, this quest will not be displayed if its prerequisites are not
  // fulfilled.
  public secret: boolean;

  constructor(
    props: {
      title: string;
      description: string;
      id: string;
      prerequisites?: Array<{ title: string; secret: boolean; isFulfilled: (campaign: Campaign) => boolean }>;
      secret?: boolean;
      baseDuration: number;
    },
    type: string,
  ) {
    this.type = type;

    this.title = props.title;
    this.description = props.description;
    this.id = props.id;
    // eslint-disable-next-line
    this.prerequisites = [];
    if (props.prerequisites?.length) {
      this.prerequisites = props.prerequisites;
    }
    this.secret = false;
    // eslint-disable-next-line eqeqeq
    if (props.secret != undefined) {
      this.secret = props.secret;
    }
    this.duration = props.baseDuration;
  }

  fulfillsPrerequisites(campaign: Campaign): boolean {
    for (let i = 0; i < this.prerequisites.length; i++) {
      if (!this.prerequisites[i].isFulfilled(campaign)) {
        return false;
      }
    }
    return true;
  }
}

export class OpenQuestion extends Quest {
  public question: string;
  public elaboration: string | undefined;
  public answer: string;
  public selfGraded: boolean;

  constructor(props: {
    question: string;
    elaboration?: string;
    title: string;
    description: string;
    id: string;
    prerequisites?: Array<{ title: string; secret: boolean; isFulfilled: (campaign: Campaign) => boolean }>;
    secret?: boolean;
    answer: string;
    baseDuration: number;
    selfGraded: boolean;
  }) {
    super(props, "open");
    this.question = props.question;
    this.elaboration = props.elaboration;
    this.answer = props.answer;
    this.selfGraded = props.selfGraded;
  }
}

export class MultipleChoiceQuestion extends Quest {
  public question: string;
  public answer: string;
  public incorrectAnswers: Array<string>;
  public options: Array<string>;

  constructor(props: {
    question: string;
    answer: string;
    incorrectAnswers: Array<string>;
    title: string;
    description: string;
    id: string;
    prerequisites?: Array<{ title: string; secret: boolean; isFulfilled: (campaign: Campaign) => boolean }>;
    secret?: boolean;
    baseDuration: number;
  }) {
    super(props, "multi");
    this.question = props.question;
    this.answer = props.answer;
    this.incorrectAnswers = props.incorrectAnswers;
    this.options = this.incorrectAnswers;
    this.options.push(this.answer);
  }
}

export const quests: Quest[] = [
  new MultipleChoiceQuestion({
    id: "0",
    title: "Development quest",
    description: "This is a development quest.",
    question: "What is the only true superfood?",
    answer: "Frikandelbroodje",
    incorrectAnswers: ["Kale", "Worstenbroodje", "Cauliflower"],
    baseDuration: 120000,
  }),
  new OpenQuestion({
    id: "1",
    title: "Development quest open",
    description: "This is a development quest.",
    question: "What is the only true superfood?",
    answer: "Frikandelbroodje",
    prerequisites: [{ title: "Always true", secret: false, isFulfilled: () => true }],
    selfGraded: true,
    elaboration: "please explain in great detail why your answer is correct",
    baseDuration: 60000,
  }),
];

export function getQuest(id: string): Quest | undefined {
  for (let i = 0; i < quests.length; i++) {
    if (quests[i].id === id) {
      return quests[i];
    }
  }
  return undefined;
}
