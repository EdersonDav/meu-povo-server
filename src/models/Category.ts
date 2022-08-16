import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

export interface ICategoryName {
  en: string;
  pt: string;
}

@modelOptions({
  options: {
    customName: "categories",
  },
})
class Category {
  @prop({ unique: true, required: true })
  public name?: ICategoryName;

  @prop({ index: true, required: true })
  public code?: number;
}

const CategoryModel = getModelForClass(Category);

export { Category, CategoryModel };
