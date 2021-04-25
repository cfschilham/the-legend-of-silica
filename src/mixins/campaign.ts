import { Inventory } from "@/mixins/inventory";

export class Campaign {
  public characterName: string;
  public difficulty: number;
  public characterClass: string;
  public isoStartTime: string;
  public balance: number;
  public inventory: Inventory;
  public currentHealth: number;
  public currentQuestProgress:
    | {
        id: string;
        startTime: Date;
      }
    | undefined;

  public completedQuestIds: Array<string>;
  public readonly totalHealth: number;

  public static readonly balanceNumberFormatter = new Intl.NumberFormat("en", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  public static readonly currencyHTML = "mol SiO<sub>2</sub>";

  constructor(props: {
    characterName: string;
    difficulty: number;
    characterClass: string;
    isoStartTime: string;
    inventory?: Inventory;
    balance?: number;
    currentHealth?: number;
    completedQuestIds?: Array<string>;
    currentQuestProgress?: { id: string; startTime: Date };
  }) {
    if (props.difficulty > 4 || props.difficulty < 0) {
      throw new Error(`invalid difficulty: ${props.difficulty}`);
    }
    this.characterName = props.characterName;
    this.difficulty = props.difficulty;
    this.characterClass = props.characterClass;
    this.isoStartTime = props.isoStartTime;
    this.inventory = new Inventory();
    this.totalHealth = 5 - this.difficulty;
    this.currentHealth = this.totalHealth;
    // eslint-disable-next-line no-array-constructor
    this.completedQuestIds = new Array<string>();
    if (props.completedQuestIds) {
      this.completedQuestIds = props.completedQuestIds;
    }
    // eslint-disable-next-line eqeqeq
    if (props.currentHealth != undefined) {
      this.currentHealth = props.currentHealth;
    }
    this.balance = 2000 - 500 * this.difficulty;
    // eslint-disable-next-line eqeqeq
    if (props.balance != undefined) {
      this.balance = props.balance;
    }
    if (props.inventory) {
      this.inventory = props.inventory;
    }
    if (props.balance) {
      this.balance = props.balance;
    }
    if (props.currentQuestProgress) {
      this.currentQuestProgress = props.currentQuestProgress;
    }
  }

  public validate(): boolean {
    if (this.characterName.length === 0 || this.characterName.length > 20) {
      return false;
    }
    if (this.balance < 0) {
      return false;
    }
    if (["primate", "berserker", "shaman"].indexOf(this.characterClass) === -1) {
      return false;
    }
    if (this.difficulty < 0 || this.difficulty > 5) {
      return false;
    }
    if (this.isoStartTime.length === 0) {
      return false;
    }
    if (this.inventory === undefined) {
      return false;
    }
    return this.inventory.validate();
  }

  public balanceFormatHTML(): string {
    return `${Campaign.balanceNumberFormatter.format(this.balance)} ${Campaign.currencyHTML}`;
  }
}
