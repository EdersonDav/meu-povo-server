/* eslint-disable prettier/prettier */
import S3Storage from "../aws_utils/S3Storage";
import { AppError } from "../middlewares/Errors/AppError";
import { CommerceServices } from "./CommerceServices";

export class ImagesService {
	private s3 = new S3Storage();

	public async create(file: Express.Multer.File) {
		try {
			const fileCreatedUrl = await this.s3.saveFile(file.filename);

			return fileCreatedUrl;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	public async delete(id: string) {
		const commerceServices = new CommerceServices();
		const commerce = await commerceServices.getByID(id);
		if (!commerce) {
			throw new AppError(404, "Commerce not found");
		}
		const imageExists = commerce.image;
		if (!imageExists) {
			throw new AppError(404, "Image not found");
		}

		const filename =
			imageExists.split("/")[imageExists.split("/").length - 1];
		await this.s3.deleteFile(filename);
	}
}
