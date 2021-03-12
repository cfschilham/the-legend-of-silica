import { Inventory } from "@/mixins/inventory";

export class Campaign {
  public characterName: string;
  public difficulty: number;
  public characterClass: string;
  public isoStartTime: string;
  public balance: number;
  public inventory: Inventory;

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
        this.balance = 0;
        break;
    }
    if (props.inventory) {
      this.inventory = props.inventory;
    }
    if (props.balance) {
      this.balance = props.balance;
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
    if (!this.inventory.validate()) {
      return false;
    }
    return true;
  }
}
