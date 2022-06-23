import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

import { Address } from "./Address";
import { Category } from "./Category";

class CommercialEstablishments {
  @prop()
  public name?: string;

  @prop()
  public descripition?: string;

  @prop()
  public image?: string;

  @prop()
  public phone?: number;

  @prop()
  public site?: string;

  @prop({ ref: Category, type: String })
  public category?: Ref<Category>;

  @prop()
  public working_time?: string[];

  @prop({ ref: Address, type: String })
  public address: Ref<Address>;
}

export const CommercialEstablishmentsModel = getModelForClass(
  CommercialEstablishments
);
