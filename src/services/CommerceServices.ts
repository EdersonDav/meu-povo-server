import { AppError } from "../middlewares/Errors/AppError";
import { AddressModel, Address } from "../models/Address";
import { CategoryModel } from "../models/Category";
import {
  CommercialEstablishmentsModel,
  CommercialEstablishments,
} from "../models/CommercialEstablishments";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface FullCommerce extends CommercialEstablishments {
  address: Address;
  categoryCode: number;
}

export class CommerceServices {
  private async verifyExistsCommerce(commerce: FullCommerce) {
    const existisCommerce = await CommercialEstablishmentsModel.findOne({
      name: commerce.name,
      phone: commerce.phone,
    });

    if (existisCommerce && existisCommerce.address) {
      const addressExists = await AddressModel.findOne(existisCommerce.address);

      if (addressExists?.street === commerce.address.street) {
        return true;
      }
    }
    return false;
  }

  public async createCommerce(commerce: FullCommerce) {
    if (await this.verifyExistsCommerce(commerce)) {
      throw new AppError(400, "This commerce already exists");
    }

    const category = await CategoryModel.findOne({
      code: commerce.categoryCode,
    });

    if (!category?.code) {
      throw new AppError(404, "This category not found");
    }

    const newAddress = new AddressModel(commerce.address);

    const newCommerce = new CommercialEstablishmentsModel({
      ...commerce,
      category,
      address: newAddress,
    });

    await newCommerce.save();

    return newCommerce;
  }
}
