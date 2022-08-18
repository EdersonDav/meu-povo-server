import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

import { Category } from "./Category";

class SelfEmployed {
  @prop({ require: true })
  public name?: string;

  @prop()
  public descripition?: string;

  @prop({ require: true })
  public phone?: number;

  @prop({ ref: () => Category, type: () => String, required: true })
  public category?: Ref<Category, string>;

  @prop()
  public nationality?: string;

  @prop()
  public email?: string;
}

const SelfEmployedModel = getModelForClass(SelfEmployed);

export { SelfEmployed, SelfEmployedModel };
