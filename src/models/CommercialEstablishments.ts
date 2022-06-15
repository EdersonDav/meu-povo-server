import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

import { Address } from "./Address";

class CommercialEstablishments {
  @prop()
  public name?: string;

  @prop()
  public descripition?: string;

  @prop()
  public image?: string;

  @prop({ ref: Address, type: String })
  public type: Ref<Address>;
}

export const CommercialEstablishmentsModel = getModelForClass(
  CommercialEstablishments
);
