import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({
  options: {
    customName: "categories",
  },
})
class Category {
  @prop({ unique: true, required: true })
  public name?: string;

  @prop({ index: true, required: true })
  public code?: number;
}

const CategoryModel = getModelForClass(Category);

export { Category, CategoryModel };
