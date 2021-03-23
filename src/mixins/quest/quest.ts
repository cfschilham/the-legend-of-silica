import { Campaign } from "@/mixins/campaign";

export class Quest {
  public title: string;
  public description: string;
  public id: string;

  // Functions to determine whether or not this quest is available with the state
  // of the current campaign.
  public prerequisites: Array<{ title: string; secret: boolean; isFulfilled: (campaign: Campaign) => boolean }>;

  // If true, this quest will not be displayed if its prerequisites are not
  // fulfilled.
  public secret: boolean;

  constructor(props: {
    title: string;
    description: string;
    id: string;
    prerequisites?: Array<{ title: string; secret: boolean; isFulfilled: (campaign: Campaign) => boolean }>;
    secret?: boolean;
  }) {
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

  constructor(props: {
    question: string;
    elaboration?: string;
    title: string;
    description: string;
    id: string;
    prerequisites?: Array<{ title: string; secret: boolean; fn: (campaign: Campaign) => boolean }>;
    secret?: boolean;
  }) {
    super(props);
    this.question = props.question;
    this.elaboration = props.elaboration;
  }
}

export class MultipleChoiceQuestion extends Quest {
  public question: string;
  public answer: string;
  public incorrectAnswers: Array<string>;

  constructor(props: {
    question: string;
    incorrectAnswers: Array<string>;
    answer: string;
    title: string;
    id: string;
    description: string;
    prerequisites?: Array<{ title: string; secret: boolean; fn: (campaign: Campaign) => boolean }>;
    secret?: boolean;
  }) {
    super(props);
    this.question = props.question;
    this.answer = props.answer;
    this.incorrectAnswers = props.incorrectAnswers;
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
  }),
  new MultipleChoiceQuestion({
    id: "0",
    title: "Development quest",
    description: "This is a development quest.",
    question: "What is the only true superfood?",
    answer: "Frikandelbroodje",
    incorrectAnswers: ["Kale", "Worstenbroodje", "Cauliflower"],
    prerequisites: [
      { title: "Always false", secret: false, fn: () => false },
      { title: "Always true", secret: false, fn: () => true },
    ],
  }),
  new MultipleChoiceQuestion({
    id: "0",
    title: "Development quest",
    description: "This is a development quest.",
    question: "What is the only true superfood?",
    answer: "Frikandelbroodje",
    incorrectAnswers: ["Kale", "Worstenbroodje", "Cauliflower"],
  }),
  new MultipleChoiceQuestion({
    id: "0",
    title: "Development quest",
    description: "This is a development quest.",
    question: "What is the only true superfood?",
    answer: "Frikandelbroodje",
    incorrectAnswers: ["Kale", "Worstenbroodje", "Cauliflower"],
  }),
  new MultipleChoiceQuestion({
    id: "0",
    title: "Development quest",
    description: "This is a development quest.",
    question: "What is the only true superfood?",
    answer: "Frikandelbroodje",
    incorrectAnswers: ["Kale", "Worstenbroodje", "Cauliflower"],
  }),
  new MultipleChoiceQuestion({
    id: "0",
    title: "Development quest",
    description: "This is a development quest.",
    question: "What is the only true superfood?",
    answer: "Frikandelbroodje",
    incorrectAnswers: ["Kale", "Worstenbroodje", "Cauliflower"],
  }),
  new MultipleChoiceQuestion({
    id: "0",
    title: "Development quest",
    description: "This is a development quest.",
    question: "What is the only true superfood?",
    answer: "Frikandelbroodje",
    incorrectAnswers: ["Kale", "Worstenbroodje", "Cauliflower"],
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
