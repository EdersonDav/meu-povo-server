import { AppError } from "../middlewares/Errors/AppError";
import { CategoryModel } from "../models/Category";
import { SelfEmployed, SelfEmployedModel } from "../models/SelfEmployed";

interface IFullSelfEmployed extends SelfEmployed {
  categoryCode: number;
}

export class SelfEmployedServices {
  private async verifyExistsSelfEmployed(selfEmployed: IFullSelfEmployed) {
    const existisSelfEmployed = await SelfEmployedModel.findOne({
      phone: selfEmployed.phone,
    });

    if (existisSelfEmployed && existisSelfEmployed.phone) {
      return true;
    }
    return false;
  }

  public async create(selfEmployed: IFullSelfEmployed) {
    const existsSelfEmployed = await this.verifyExistsSelfEmployed(
      selfEmployed
    );
    if (existsSelfEmployed) {
      throw new AppError(400, "This SelfEmployed already exists");
    }

    const category = await CategoryModel.findOne({
      code: selfEmployed.categoryCode,
    });

    if (!category?.code) {
      throw new AppError(404, "This category not found");
    }

    const newSelfEmployed = new SelfEmployedModel({
      ...selfEmployed,
      category: category.id,
    });

    await newSelfEmployed.save();

    return newSelfEmployed;
  }

  public async getAll() {
    const selfEmployeds = await SelfEmployedModel.find().populate("category");

    if (!selfEmployeds?.length) {
      throw new AppError(404, "SelfEmployeds not found");
    }

    return selfEmployeds;
  }

  public async getByID(id: string) {
    const selfEmployed = await SelfEmployedModel.findById(id).populate(
      "category"
    );
    if (!selfEmployed) {
      throw new AppError(404, "SelfEmployed not found");
    }

    return selfEmployed;
  }

  public async update(id: string, selfEmployed: IFullSelfEmployed) {
    const selfEmployedUp = await this.getByID(id);

    const category = await CategoryModel.findOne({
      code: selfEmployed.categoryCode,
    });

    if (!category?.code) {
      throw new AppError(404, "This category not found");
    }

    const updatedSelfEmployed = await SelfEmployedModel.updateOne(
      { id: selfEmployedUp.id },
      {
        ...selfEmployed,
        category: category.id,
      }
    );

    return updatedSelfEmployed.upsertedId;
  }

  public async delete(id: string) {
    const selfEmployed = await this.getByID(id);
    await SelfEmployedModel.deleteOne({ _id: selfEmployed.id });
    return true;
  }

  public async getCountriesSelfEmployeds(): Promise<string[]> {
    const selfEmployeds = await SelfEmployedModel.find();
    if (!selfEmployeds?.length) {
      return [];
    }
    const countries: string[] = selfEmployeds.map(
      (self) => self?.nationality?.toLocaleLowerCase() || ""
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
    const selfEmployeds = await SelfEmployedModel.find(where).populate(
      "category"
    );
    if (!selfEmployeds?.length) {
      throw new AppError(404, "SelfEmployeds not found");
    }
    return selfEmployeds;
  }
}
