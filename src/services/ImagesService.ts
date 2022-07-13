/* eslint-disable prettier/prettier */
import S3Storage from "../aws_utils/S3Storage";

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

	public async delete(filename: string) {
		await this.s3.deleteFile(filename);
	}
}
