import { AppError } from "../middlewares/Errors/AppError";
import { AddressModel, Address } from "../models/Address";
import { CategoryModel } from "../models/Category";
import {
  CommercialEstablishmentsModel,
  CommercialEstablishments,
} from "../models/CommercialEstablishments";
import { ImagesService } from "./ImagesService";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface FullCommerce extends CommercialEstablishments {
  address: Address;
  categoryCode: number;
}

export class CommerceServices {
  private async verifyExistsCommerce(commerce: FullCommerce) {
    const existisCommerce = await CommercialEstablishmentsModel.findOne({
      name: commerce.name,
    }).populate("address");

    if (existisCommerce && existisCommerce.address) {
      const addressExists = await AddressModel.findById(
        existisCommerce.address
      );

      if (addressExists?.postalCode === commerce.address.postalCode) {
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

    await newAddress.save();

    const newCommerce = new CommercialEstablishmentsModel({
      ...commerce,
      category: category.id,
      address: newAddress.id,
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
      { ...commerce, category: category.id, address: addressUp.upsertedId }
    );

    return updatedCommerce.upsertedId;
  }

  public async delete(id: string) {
    const commerce = await this.getByID(id);
    if (commerce?.image && commerce?.image?.split("/")?.length) {
      const imagesService = new ImagesService();
      const filename =
        commerce?.image.split("/")[commerce.image.split("/").length - 1];
      await imagesService.delete(filename);
    }
    await AddressModel.deleteOne({ id: commerce.address });
    await CommercialEstablishmentsModel.deleteOne({ _id: commerce.id });
    return true;
  }

  public async getCountriesCommerces(): Promise<string[]> {
    const commerces = await this.getAll();
    if (!commerces?.length) {
      return [];
    }
    const countries: string[] = commerces.map(
      (com) => com?.nationality?.toLocaleLowerCase() || ""
    );
    return countries;
  }

  public async search(nationality: string, categoryCode?: string) {
    const where: { nationality: string; category?: string } = { nationality };
    if (categoryCode) {
      const categoryDB = await CategoryModel.findOne({
        code: Number(categoryCode),
      });
      if (categoryDB) {
        where.category = categoryDB._id;
      }
    }
    const commerces = await CommercialEstablishmentsModel.find(where)
      .populate("address")
      .populate("category");
    if (!commerces?.length) {
      throw new AppError(404, "Commerces not found");
    }
    return commerces;
  }
}
