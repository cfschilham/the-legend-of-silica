export class Quest {
  constructor(props) {
    this.title = props.title;
    this.description = props.description;
    this.fulfillsPrerequisites = props.fulfillsPrerequisites;
  }
}

export class OpenQuestion extends Quest {
  constructor(props) {
    super(props);
    this.question = props.question;
    this.elaboration = props.elaboration;
  }
}

export class MultipleChoiceQuestion extends Quest {

}
