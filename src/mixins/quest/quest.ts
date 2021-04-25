import { Campaign } from "@/mixins/campaign";

export class Quest {
  public type: string;
  public title: string;
  public description: string;
  public id: string;
  public duration: number;
  public reward: number;
  public image: string | undefined;
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
      reward: number;
      image?: string;
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
    this.reward = props.reward;
    this.image = props.image;
  }

  fulfillsPrerequisites(campaign: Campaign): boolean {
    for (let i = 0; i < this.prerequisites.length; i++) {
      if (!this.prerequisites[i].isFulfilled(campaign)) {
        return false;
      }
    }
    return true;
  }

  rewardFormatHTML(): string {
    return `Beloning: ${Campaign.balanceNumberFormatter.format(this.reward)} ${Campaign.currencyHTML}`;
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
    reward: number;
    image?: string;
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
    randomiseOrder?: boolean;
    reward: number;
    image?: string;
  }) {
    super(props, "multi");
    this.question = props.question;
    this.answer = props.answer;
    this.incorrectAnswers = props.incorrectAnswers;
    this.options = this.incorrectAnswers;
    this.options.push(this.answer);
    if (props.randomiseOrder) {
      this.options = this.options.sort(() => Math.random() - 0.5);
    }
  }
}

export const quests: Quest[] = [
  new MultipleChoiceQuestion({
    id: "0",
    title: "Starter quest",
    description: "This is a development quest.",
    question: "In welke 2 vormen komt silica voor?",
    answer: "Kwarts en Opaal",
    incorrectAnswers: ["Phylliet en leisteen", "Basalt en graniet", "Helleflint en amfiboliet"],
    randomiseOrder: true,
    baseDuration: 20000,
    reward: 20,
  }),
  new MultipleChoiceQuestion({
    // hier moet nog een foto bij
    id: "1",
    title: "Silica op micro niveau",
    description: "This is a development quest.",
    question: "Welke letter behoort tot opaal",
    answer: "B",
    incorrectAnswers: ["A"],
    prerequisites: [
      {
        title: "Bezit een microscoop",
        secret: false,
        isFulfilled: (campaign: Campaign) => {
          return campaign.inventory.hasItem("1");
        },
      },
    ],
    baseDuration: 20000,
    reward: 500,
    image: require("@/assets/question1.png"),
  }),
  new MultipleChoiceQuestion({
    id: "2",
    title: "Silica tekenen",
    description: "This is a development quest.",
    question: "Teken de structuurformule van Silicium met zuurstof op papier en beredeneer de ruimtelijke bouw.",
    answer: "Tetraëder",
    incorrectAnswers: ["plat vlak", "lineair"],
    randomiseOrder: true,
    baseDuration: 120000,
    reward: 200,
  }),
  new OpenQuestion({
    id: "3",
    title: "Fytolieten",
    description: "This is a development quest.",
    question: "Wat is de functie van fytolieten",
    elaboration: "Beschrijf de functie van fytolieten in planten en geef ook aan hoe de vorm kan verschillen.",
    answer:
      "Fytolieten zijn biomineralen die een plant stugger en harder maken. \n" +
      "Ook vormen ze zich aan de omgeving waarin ze zich bevinden waardoor de vorm per plantensoort kan verschillen.",
    selfGraded: true,
    baseDuration: 60000,
    reward: 400,
  }),
  new OpenQuestion({
    id: "4",
    title: "Diatomeeënen in de Silicakringloop",
    description: "",
    question: "Leg uit welke rol diatomeeën in de silicakringloop spelen.",
    answer:
      "Diatomeeën maken van opaal in het water een skelet wat als ze doodgaan weer oplost en wordt hergebruikt of op de zeebodem blijft. ",
    selfGraded: true,
    baseDuration: 60000,
    reward: 300,
  }),
  new OpenQuestion({
    id: "5",
    title: "De rol van de Grand Canyon",
    description: "Een erg GROTE rol :).",
    question: "Leg uit hoe de grand canyon rivier een belangrijke rol heeft gespeelt in de silicakringloop.",
    answer:
      "Een belangrijk onderdeel van de kringloop is verwering van steen op het land en deze rivier heeft over de koers van miljoenen jaren de grand canyon uit steen gesneden.",
    selfGraded: true,
    prerequisites: [
      {
        title: "Een vliegtuig ticket",
        secret: false,
        isFulfilled: (campaign: Campaign) => {
          return campaign.inventory.hasItem("2");
        },
      },
    ],
    baseDuration: 120000,
    reward: 350,
  }),
  new OpenQuestion({
    id: "6",
    title: "Iew er zitten fytolieten onder mijn schoen",
    description: "Waar komen die nou vandaan.",
    question: "Waarom is het zeer waarschijnlijk dat je in de herfst fytolieten onder je schoenen kunt vinden?",
    answer:
      "Omdat de bladeren en naalden van bomen in de herfst loslaten en deze worden afgebroken door bacteriën blijven de fytolieten liggen.",
    selfGraded: true,
    baseDuration: 60000,
    reward: 325,
    prerequisites: [
      {
        title: "Een borstel",
        secret: false,
        isFulfilled: (campaign: Campaign) => {
          return campaign.inventory.hasItem("5");
        },
      },
    ],
  }),
  new OpenQuestion({
    id: "7",
    title: "Biologen ook altijd",
    description: "Deze vraag is speciaal voor meneer Soetens.",
    question: "Waarom zou meneer Soetens de nieuwe silicakringloop leuker vinden om te bestuderen?",
    answer: "Omdat in de oude kringloop “dood” was en geen biologische processen bevatte.",
    selfGraded: true,
    baseDuration: 60000,
    reward: 275,
  }),
  new OpenQuestion({
    id: "8",
    title: "Wie heeft er gelijk",
    description: "Een titanenstrijd van een vraag.",
    question:
      "Mevrouw Fallet zegt als geoloog dat stenen de belangrijkste rol vervullen in de nieuwe silicakringloop. \n" +
      "Meneer Soetens echter als bioloog is van mening dat er in de biologische kringloop meer silica omgaat. \n" +
      "Wie heeft er gelijk?",
    answer: "Meneer Soetens heeft gelijk in de biologische kringloop wordt geschat 10x zoveel silica te zijn.",
    selfGraded: true,
    baseDuration: 120000,
    reward: 500,
  }),
  new OpenQuestion({
    id: "9",
    title: "Silica in bomen?",
    description: "Eindelijk een rekenvraag.",
    question:
      "Er is een gigantische boom aangetroffen in het midden van het regenwoud met 0,5 Tmol silica erin. \n" +
      "De begraving tijd is 150 Mmol wat is de verblijftijd van deze boom?",
    answer: "500.000 / 150 = 3333 jaar",
    selfGraded: true,
    prerequisites: [
      {
        title: "Een bijl",
        secret: false,
        isFulfilled: (campaign: Campaign) => {
          return campaign.inventory.hasItem("3");
        },
      },
    ],
    baseDuration: 120000,
    reward: 120,
  }),
  new MultipleChoiceQuestion({
    id: "10",
    title: "De reiziger",
    description: "This is a development quest.",
    question: "Zou iemand die veel van rondreizen houd liever silica zijn in de nieuw of de oude silicakringloop?",
    answer: "De oude kringloop",
    incorrectAnswers: ["De nieuwe kringloop"],
    randomiseOrder: true,
    baseDuration: 40000,
    prerequisites: [
      {
        title: "Een kompas",
        secret: false,
        isFulfilled: (campaign: Campaign) => {
          return campaign.inventory.hasItem("4");
        },
      },
    ],
    reward: 100,
  }),
  new MultipleChoiceQuestion({
    id: "11",
    title: "BIFs",
    description: "BIFs?",
    question: "Waar bestaan BIFs uit?",
    answer: "Allemaal",
    incorrectAnswers: [
      "magnetite = Fe3O4",
      "hematite = Fe2O3",
      "siderite = Fe(CO)2)",
      "silicate minerals like chert (SiO2).",
      "Geen van allen",
    ],
    baseDuration: 50000,
    reward: 50,
  }),
  new MultipleChoiceQuestion({
    id: "12",
    title: "Hoe zien BIFs er uit",
    description: "Niemand weet het",
    question: "Waar zie je een BIF?",
    answer: "C",
    incorrectAnswers: ["A", "B"],
    baseDuration: 30000,
    reward: 320,
    image: require("@/assets/question12.png"),
  }),
  new MultipleChoiceQuestion({
    id: "13",
    title: "BIFsteen",
    description: "Stenen.",
    question: "Wat voor soort steen is een BIF?",
    answer: "Sedimentary",
    incorrectAnswers: ["Metamorphic", "Igneous"],
    randomiseOrder: true,
    baseDuration: 30000,
    reward: 125,
  }),
  new MultipleChoiceQuestion({
    id: "14",
    title: "Silica en BIFs",
    description: "?.",
    question: "Welke rol speelt silica in BIFs?",
    answer: "Silica vormt de kaart van BIFs",
    incorrectAnswers: [
      "Silica heeft samen met aluminium een korte affaire gehad en daardoor zijn BIFs ontstaan.",
      "Silica buigt ijzer om BIFs te vormen",
    ],
    randomiseOrder: true,
    baseDuration: 50000,
    reward: 215,
  }),
  new MultipleChoiceQuestion({
    id: "15",
    title: "Global warming positive?",
    description: "",
    question: "Waarom is voor planten een verhoogde concentratie CO2 niet per se erg?",
    answer: "Meer voedsel yummy",
    incorrectAnswers: [
      "Een verhoogde CO2-concentratie brengt silica naar boven uit de grond waardoor planten harder worden.",
      "CO2 reageert in zeer kleine met SO2 tot een zeer vruchtbare ondergrond voor planten.",
    ],
    randomiseOrder: true,
    baseDuration: 50000,
    reward: 225,
  }),
  new OpenQuestion({
    id: "16",
    title: "Huh hoe heette je ook alweer?",
    description: "",
    question: "Waar halen de C3 en C4 fotosynthese systemen hun naam vandaan?",
    answer: "Deze namen komen van het aantal koolstof dat ontstaat.",
    selfGraded: true,
    baseDuration: 60000,
    reward: 215,
  }),
  new OpenQuestion({
    id: "17",
    title: "Nog steeds onduidelijk",
    description: "",
    question:
      "Geef 2 mogelijke redenen waarom de dominante vorm van fotosynthese overging van C3 naar C4 en weerleg deze redenen ook.",
    answer:
      "Reden 1 is dat de CO2 concentratie afnam waardoor C4 fotosynthese gunstiger was voor de planten echter is er geen bewijs gevonden voor een afname in CO2 maar wel voor een constante waarde.\n" +
      "Reden 2 is dat de moesson sterker werd wat gunstig zou zijn voor C4 grassen, maar in de amerika’s zijn helemaal geen moessons en ook hier zijn C4 grassen geëvolueerd.\n",
    selfGraded: true,
    baseDuration: 180000,
    reward: 150,
  }),
  new MultipleChoiceQuestion({
    id: "18",
    title: "Grassen zijn supersnel",
    description: "",
    question: "Waarom zijn grassen toen ze eenmaal geëvolueerd waren zo snel verspreid?",
    answer: "Omdat grassen veel sneller nieuw gevormde grond kunnen begroeien.",
    incorrectAnswers: [
      "Omdat eikels van een boom maar een bepaalde afstand kunnen vallen.",
      "Omdat grassen in veel slechtere omstandigheden kunnen groeien.",
    ],
    randomiseOrder: true,
    baseDuration: 50000,
    reward: 130,
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
