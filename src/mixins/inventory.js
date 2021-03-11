export class Item {
  constructor(props) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.icon = props.icon;
    this.sellValue = props.sellValue;
    this.buyValue = props.buyValue;
  }
}

export class QuestModifierItem extends Item {
  constructor(props) {
    super(props);
    this.questModifier = props.questModifier;
  }
}

const items = {
  // Development testing item.
  0: new Item({
    id: 0,
    name: "Frikandelbroodje",
    description: "A delightful meal. The only true super-food, suitable for consumption at any time, at any place.",
    icon: require("@/assets/items/frikandelbroodje.png"),
    sellValue: 5000,
    buyValue: -1,
  }),
};

function itemExists(id) {
  for (const key in items) {
    if (key === id) {
      return true;
    }
  }
  return false;
}

export class Inventory {
  constructor(props) {
    this._items = props.items;
  }

  getItem(id) {
    if (!itemExists(id)) {
      throw new Error("item id doesn't exist");
    }
    for (let i = 0; i < this._items.length; i++) {
      if (this._items.id === id) {
        return this._items;
      }
    }
    // TODO: create item, if this is reached it doesn't exist in the inventory yet.
  }

  add(id, amount) {
    if (!itemExists(id)) {
      throw new Error("item id doesn't exist");
    }
    for (let i = 0; i < this._items.length; i++) {
      if (this._items[i] !== id) {
        continue;
      }
      if (this._items[i].amount - amount < 0) {
        throw new Error("operation would cause negative amount of items");
      }
      this._items[i].amount += amount;
      return;
    }

    // Item is not yet defined in the _items array, so it is created.
    if (amount < 0) {
      throw new Error("operation would cause negative amount of items");
    }
    this._items.push(new InventoryItem(items.id), amount);
  }

  increment(id) {
    this.add(id, 1);
  }

  decrement(id) {
    this.add(id, -1);
  }
}

class InventoryItem {
  constructor(item, amount) {
    this.item = item;
    this.amount = amount;
  }
}
