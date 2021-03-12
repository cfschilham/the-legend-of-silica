export class Quest {
  public title: string;
  public description: string;
  public fulfillsPrerequisites: () => boolean;

  constructor(props: { title: string; description: string; fulfillsPrerequisites: () => boolean; }) {
    this.title = props.title;
    this.description = props.description;
    this.fulfillsPrerequisites = props.fulfillsPrerequisites;
  }
}

export class OpenQuestion extends Quest {
  public question: string;
  public elaboration: string | undefined;

  constructor(props: { question: string; elaboration?: string; title: string; description: string; fulfillsPrerequisites: () => boolean; }) {
    super(props);
    this.question = props.question;
    this.elaboration = props.elaboration;
  }
}

export class MultipleChoiceQuestion extends Quest {
  public question: string;
  public options: Array<string>;
  public correctIndex: number;

  constructor(props: { question: string; options: Array<string>; correctIndex: number; title: string; description: string; fulfillsPrerequisites: () => boolean; }) {
    super(props);
    this.question = props.question;
    this.options = props.options;
    this.correctIndex = props.correctIndex;
  }
}
