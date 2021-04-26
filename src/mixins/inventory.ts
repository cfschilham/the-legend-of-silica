import { Quest } from "@/mixins/quest";
import { Campaign } from "@/mixins/campaign";

export class Item {
  public id: string;
  public name: string;
  public description: string;
  public icon: string;
  public sellValue: number;
  public buyValue: number;
  public secret: boolean;
  public use: ((campaign: Campaign) => void) | undefined;
  public canUse: (campaign: Campaign) => boolean;

  constructor(props: {
    id: string;
    name: string;
    description: string;
    icon: string;
    sellValue?: number;
    buyValue?: number;
    canUse: (campaign: Campaign) => boolean;
    use?: (campaign: Campaign) => void;
    secret?: boolean;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.icon = props.icon;
    this.sellValue = props.sellValue || -1;
    this.buyValue = props.buyValue || -1;
    this.use = props.use;
    this.secret = props.secret || false;
    this.canUse = props.canUse;
  }
}

export const items: Item[] = [
  // Development testing item.
  new Item({
    id: "0",
    name: "Frikandelbroodje",
    description: "A delightful meal. The only true superfood, suitable for consumption at any time, at any place.",
    icon: require("@/assets/items/frikandelbroodje.png"),
    sellValue: 5000,
    buyValue: 10,
    use: (campaign: Campaign) => {
      if (campaign.currentHealth === campaign.totalHealth) {
        return;
      }
      campaign.currentHealth++;
      campaign.inventory.decrement("0");
    },
    secret: true,
    canUse: () => false,
  }),
  new Item({
    id: "1",
    name: "Microscoop",
    description: "Een microscoop is een instrument voor het bestuderen van objecten",
    icon: require("@/assets/items/microscope.svg"),
    sellValue: 300,
    buyValue: 500,
    canUse: () => false,
  }),
  new Item({
    id: "2",
    name: "Vliegtuig ticket",
    description: "Een ticket om naar de grand canyon te vliegen",
    icon: require("@/assets/items/ticket.svg"),
    sellValue: -1,
    buyValue: 200,
    canUse: () => false,
  }),
  new Item({
    id: "3",
    name: "Bijl",
    description: "Een bijl kan gebruikt worden voor het omhakken van bomen",
    icon: require("@/assets/items/axe.svg"),
    sellValue: 20,
    buyValue: 50,
    canUse: () => false,
  }),
  new Item({
    id: "4",
    name: "Kompas",
    description: "Kan gebruikt worden bij het navigeren van de wereld",
    icon: require("@/assets/items/compass.svg"),
    sellValue: 5,
    buyValue: 10,
    canUse: () => false,
  }),
  new Item({
    id: "5",
    name: "Borstel",
    description: "Kan gebruikt worden bij het schoonmaken van je schoenen",
    icon: require("@/assets/items/broom.svg"),
    sellValue: 5,
    buyValue: 120,
    canUse: () => false,
  }),
  new Item({
    id: "6",
    name: "Paracetamol",
    description: "Kan gebruikt worden om één leven te herstellen",
    icon: require("@/assets/items/paracetamol.svg"),
    sellValue: 200,
    buyValue: 800,
    canUse: (campaign: Campaign) => {
      return campaign.currentHealth < campaign.totalHealth;
    },
    use: (campaign: Campaign) => {
      campaign.currentHealth++;
    },
  }),
  new Item({
    id: "7",
    name: "EHBO-koffer",
    description: "Herstelt alle levens",
    icon: require("@/assets/items/first-aid-kit.svg"),
    sellValue: 1000,
    buyValue: 3500,
    canUse: (campaign: Campaign) => {
      return campaign.currentHealth < campaign.totalHealth;
    },
    use: (campaign: Campaign) => {
      campaign.currentHealth = campaign.totalHealth;
    },
  }),
];

// getItem looks for the item with the specified id in all known items.
export function getItem(id: string): Item | undefined {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }
  return undefined;
}

export class Inventory {
  private readonly items: Array<{ id: string; amount: number }>;

  constructor(props?: { items: Array<{ id: string; amount: number }> }) {
    if (props) {
      this.items = props.items;
      return;
    }
    // eslint-disable-next-line no-array-constructor
    this.items = new Array<{ id: string; amount: number }>();
  }

  public add(id: string, amount: number) {
    if (!(id in items)) {
      throw new Error("item id doesn't exist");
    }
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id !== id) {
        continue;
      }
      if (this.items[i].amount + amount < 0) {
        throw new Error("operation would cause negative amount of items");
      }
      this.items[i].amount += amount;
      if (this.items[i].amount === 0) {
        this.items.splice(i, 1);
      }
      return;
    }

    // Item is not yet defined in the items array, so it is created.
    if (amount < 0) {
      throw new Error("operation would cause negative amount of items");
    }

    this.items.push({
      id: id,
      amount: amount,
    });
  }

  public getItemAmount(id: string): number {
    if (!(id in items)) {
      throw new Error("item id doesn't exist");
    }
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return this.items[i].amount;
      }
    }
    return 0;
  }

  public hasItem(id: string): boolean {
    return this.getItemAmount(id) > 0;
  }

  public getItems(): Array<{ id: string; amount: number }> {
    return this.items;
  }

  public increment(id: string) {
    this.add(id, 1);
  }

  public decrement(id: string) {
    this.add(id, -1);
  }

  public validate(): boolean {
    // eslint-disable-next-line no-array-constructor
    const ids = new Array<string>();
    this.items.forEach(item => {
      ids.push(item.id);
    });
    if (new Set(ids).size < ids.length) {
      return false;
    }
    this.items.forEach(item => {
      if (item.amount < 0) {
        return false;
      }
    });
    return true;
  }
}
