import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({
  options: {
    customName: "categories",
  },
})
class Category {
  @prop()
  public name?: string;
}

const CategoryModel = getModelForClass(Category);

export { Category, CategoryModel };
