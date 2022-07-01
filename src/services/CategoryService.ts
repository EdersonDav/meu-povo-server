import { AppError } from "../middlewares/Errors/AppError";
import { CategoryModel, Category } from "../models/Category";

export class CategoryServices {
  private async verifyExistsCategory(category: Category) {
    const existisCategory = await CategoryModel.findOne({
      code: category.code,
    });

    if (existisCategory) {
      return true;
    }
    return false;
  }

  public async create(category: Category) {
    const existsCategory = await this.verifyExistsCategory(category);
    if (existsCategory) {
      throw new AppError(400, "This category already exists");
    }
    const newCategory = new CategoryModel({ ...category });

    await newCategory.save();

    return this.getByID(String(newCategory._id));
  }

  public async getAll() {
    const categories = await CategoryModel.find();

    if (!categories?.length) {
      throw new AppError(404, "Categories not found");
    }

    return categories;
  }

  public async getByID(id: string) {
    const category = await CategoryModel.findById(id);

    if (!category) {
      throw new AppError(404, "Category not found");
    }

    return category;
  }

  public async update(id: string, category: Category) {
    const categoryUp = await CategoryModel.updateOne(
      { id },
      { name: category.name }
    );

    return categoryUp.upsertedId;
  }

  public async delete(id: string) {
    const category = await this.getByID(id);
    await CategoryModel.deleteOne({ _id: category.id });
    return true;
  }
}
