import { getModelForClass, prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({
  options: {
    customName: "address",
  },
})
class Address {
  @prop()
  public country?: string;

  @prop()
  public street?: string;

  @prop()
  public township?: string;

  @prop()
  public postalCode?: number;

  @prop()
  public city?: string;

  @prop()
  public latitude?: number;

  @prop()
  public longitude?: number;
}

const AddressModel = getModelForClass(Address);

export { Address, AddressModel };
