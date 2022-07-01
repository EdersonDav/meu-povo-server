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
      const addressExists = await AddressModel.findOne({
        ...existisCommerce.address,
      });

      if (addressExists?.street === commerce.address.street) {
        return true;
      }
    }
    return false;
  }

  public async create(commerce: FullCommerce) {
    const existsCommerce = await this.verifyExistsCommerce(commerce);
    if (existsCommerce) {
      throw new AppError(400, "This commerce already exists");
    }

    const category = await CategoryModel.findOne({
      code: commerce.categoryCode,
    });

    if (!category?.code) {
      throw new AppError(404, "This category not found");
    }

    const newAddress = new AddressModel({ ...commerce.address });

    const newCommerce = new CommercialEstablishmentsModel({
      ...commerce,
      category,
      address: newAddress,
    });

    await newCommerce.save();

    return newCommerce;
  }

  public async getAll() {
    const commerces = await CommercialEstablishmentsModel.find()
      .populate("address")
      .populate("category");

    if (!commerces?.length) {
      throw new AppError(404, "Commerces not found");
    }

    return commerces;
  }

  public async getByID(id: string) {
    const commerce = await CommercialEstablishmentsModel.findById(id)
      .populate("address")
      .populate("category");
    if (!commerce) {
      throw new AppError(404, "Commerce not found");
    }

    return commerce;
  }

  public async update(id: string, commerce: FullCommerce) {
    const commerceUp = await this.getByID(id);

    const category = await CategoryModel.findOne({
      code: commerce.categoryCode,
    });

    if (!category?.code) {
      throw new AppError(404, "This category not found");
    }

    const addressUp = await AddressModel.updateOne(
      { id: commerceUp.address },
      {
        ...commerce.address,
      }
    );

    const updatedCommerce = await CommercialEstablishmentsModel.updateOne(
      { id: commerceUp.id },
      { ...commerceUp, category: category.id, address: addressUp.upsertedId }
    );

    return updatedCommerce.upsertedId;
  }

  public async delete(id: string) {
    const commerce = await this.getByID(id);
    await AddressModel.deleteOne({ id: commerce.address });
    await CommercialEstablishmentsModel.deleteOne({ _id: commerce.id });
    return true;
  }
}
