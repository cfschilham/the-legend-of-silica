import { Inventory } from "@/mixins/inventory";

export class Campaign {
  public characterName: string
  public difficulty: number
  public characterClass: string
  public isoStartTime: string
  public balance: number
  public inventory: Inventory

  constructor(props: { characterName: string; difficulty: number; characterClass: string; isoStartTime: string; inventory?: Inventory; balance?: number }) {
    this.characterName = props.characterName;
    this.difficulty = props.difficulty;
    this.characterClass = props.characterClass;
    this.isoStartTime = props.isoStartTime;
    this.inventory = new Inventory();
    switch (this.difficulty) {
      case 0:
        this.balance = 2000;
        break;
      case 1:
        this.balance = 1500;
        break;
      case 2:
        this.balance = 1000;
        break;
      case 3:
        this.balance = 500;
        break;
      case 4:
        this.balance = 0;
        break;
      default:
        throw new Error("invalid difficulty");
    }
    if (props.inventory) {
      this.inventory = props.inventory;
    }
    if (props.balance) {
      this.balance = props.balance;
    }
  }

  // TODO: add validation method
}
