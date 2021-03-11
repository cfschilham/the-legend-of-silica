import { Quest } from "@/mixins/quest/quest.ts";

export class Item {
  public id: string
  public name: string
  public description: string
  public icon: string
  public sellValue: number
  public buyValue: number

  constructor(props: { id: string; name: string; description: string; icon: string; sellValue: number; buyValue: number }) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.icon = props.icon;
    this.sellValue = props.sellValue;
    this.buyValue = props.buyValue;
  }
}

export class QuestModifierItem extends Item {
  public questModifier: (quest: Quest) => Quest
  constructor(props: { questModifier: (quest: Quest) => Quest; id: string; name: string; description: string; icon: string; sellValue: number; buyValue: number; }) {
    super(props);
    this.questModifier = props.questModifier;
  }
}

const items = Array<Item>(
  // Development testing item.
  new Item({
    id: "0",
    name: "Frikandelbroodje",
    description:
      "A delightful meal. The only true super-food, suitable for consumption at any time, at any place.",
    icon: require("@/assets/items/frikandelbroodje.png"),
    sellValue: 5000,
    buyValue: -1,
  }),
);

// getItem looks for the item with the specified id in all known items.
export function getItem(id: string): Item | undefined {
  console.log(`getting item id: ${id}`);
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }
  return undefined;
}

export class Inventory {
  private readonly items: Array<{ id: string; amount: number }>

  constructor(props?: { items: Array<{ id: string; amount: number }> }) {
    if (props) {
      this.items = props.items;
      return;
    }
    // eslint-disable-next-line no-array-constructor
    this.items = Array<{ id: string; amount: number }>();
  }

  add(id: string, amount: number) {
    if (!(id in items)) {
      throw new Error("item id doesn't exist");
    }
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id !== id) {
        continue;
      }
      if (this.items[i].amount - amount < 0) {
        throw new Error("operation would cause negative amount of items");
      }
      this.items[i].amount += amount;
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

  getItemAmount(id: string): number {
    if (!(id in items)) {
      throw new Error("item id doesn't exist");
    }
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return this.items[i].amount;
      }
    }
    this.items.push({ id: id, amount: 0 });
    return 0;
  }

  getItems(): Array<{ id: string; amount: number }> {
    return this.items;
  }

  increment(id: string) {
    this.add(id, 1);
  }

  decrement(id: string) {
    this.add(id, -1);
  }

  // TODO: add validation method
}
