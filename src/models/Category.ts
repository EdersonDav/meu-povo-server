import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";
import AutoIncrementFactory from "mongoose-sequence";

import { connection } from "../database";

// const AutoIncrement = AutoIncrementFactory(connection);
@modelOptions({
  options: {
    customName: "categories",
  },
})
class Category {
  @prop()
  public name?: string;

  @prop()
  public code?: number;
}

const CategoryModel = getModelForClass(Category);

export { Category, CategoryModel };
