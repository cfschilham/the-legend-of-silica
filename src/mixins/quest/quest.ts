export class Quest {
  public title: string
  public description: string
  public fulfillsPrerequisites: () => boolean

  constructor(props: { title: string; description: string; fulfillsPrerequisites: () => boolean; }) {
    this.title = props.title;
    this.description = props.description;
    this.fulfillsPrerequisites = props.fulfillsPrerequisites;
  }
}

export class OpenQuestion extends Quest {
  public question: string
  public elaboration: string | undefined

  constructor(props: { question: string; elaboration?: string; title: string; description: string; fulfillsPrerequisites: () => boolean; }) {
    super(props);
    this.question = props.question;
    this.elaboration = props.elaboration;
  }
}

export class MultipleChoiceQuestion extends Quest {

}
