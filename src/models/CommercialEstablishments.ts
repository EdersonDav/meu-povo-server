import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

import { Address } from "./Address";
import { Category } from "./Category";

class CommercialEstablishments {
  @prop({ require: true })
  public name?: string;

  @prop()
  public descripition?: string;

  @prop()
  public image?: string;

  @prop({ require: true })
  public phone?: number;

  @prop()
  public site?: string;

  @prop({ ref: () => Category, type: () => String, required: true })
  public category?: Ref<Category, string>;

  @prop({ allowMixed: true, required: true })
  public working_time?: string[];

  @prop({ ref: () => Address, type: () => String, required: true })
  public address?: Ref<Address, string>;
}

const CommercialEstablishmentsModel = getModelForClass(
  CommercialEstablishments
);

export { CommercialEstablishments, CommercialEstablishmentsModel };
