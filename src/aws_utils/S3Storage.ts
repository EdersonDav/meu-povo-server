/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import { getType } from "mime";
import path from "path";

class S3Storage {
  private client: S3Client = new S3Client({
    region: "us-east-1",
  });
  private bucketName: string = process.env.AWS_BUCKET || "";

  async saveFile(fileName: string): Promise<string> {
    try {
      const originalPath = path.resolve(
        __dirname,
        "..",
        "tmp",
        "uploads",
        fileName
      );
      const ContentType = getType(originalPath);

      if (!ContentType || !originalPath) {
        throw new Error("Arquivo não encontrado");
      }

      const fileContent = fs.createReadStream(originalPath);

      // Fazendo upload para o S3
      await this.client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: `${fileName}`,
          Body: fileContent,
          ContentType,
          ACL: "public-read",
        })
      );

      // Excluindo arquivo local
      await fs.promises.unlink(originalPath);

      const fileS3Url = await this.getUrl(fileName);

      return fileS3Url.split("?")[0];
    } catch (error: any) {
      throw new Error(
        `Erro ${error.message} ao fazer upload da imagem ${fileName} no S3`
      );
    }
  }

  async deleteFile(fileName: string) {
    try {
      const fileS3Url = await this.getUrl(fileName);

      // Excluindo arquivo no S3
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: `${fileName}`,
        })
      );

      return fileS3Url.split("?")[0];
    } catch (error: any) {
      throw new Error(
        `Erro ${error.message} ao deletar imagem ${fileName} no S3`
      );
    }
  }

  async getUrl(fileName: string) {
    // eslint-disable-next-line no-return-await
    return await getSignedUrl(
      this.client,
      new GetObjectCommand({
        Bucket: this.bucketName,
        Key: `${fileName}`,
      })
    );
  }
}

export default S3Storage;
