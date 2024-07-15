import { promises as fs } from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import { INVOICE_IMAGES_PATH } from './invoice-images';
import { OcrService } from 'src/ocr/ocr.service';
import { OpenAiService } from 'src/openai/openai.service';

@Injectable()
export class InvoiceImagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ocrService: OcrService,
    private readonly openAiService: OpenAiService,
  ) {}

  async createInvoiceImage(userId: number, file: Express.Multer.File) {
    const extractedText = await this.ocrService.extractText(
      `${file.destination}\\${file.filename}`,
    );

    console.log(extractedText);

    const summarizedText =
      await this.openAiService.summarizeText(extractedText);

    console.log(summarizedText);

    return this.prismaService.invoiceImage.create({
      data: {
        filePath: file.destination,
        fileName: file.filename,
        fileOriginalName: file.originalname,
        transcription: extractedText,
        transcriptionSummary: summarizedText,
        userId,
      },
    });
  }

  async getInvoiceImages() {
    const invoiceImages = await this.prismaService.invoiceImage.findMany();
    return Promise.all(
      invoiceImages.map(async (invoiceImage) => ({
        ...invoiceImage,
        imageExists: await this.imageExists(invoiceImage.id),
      })),
    );
  }

  async getInvoiceImage(invoiceImageId: number) {
    try {
      return {
        ...(await this.prismaService.invoiceImage.findUniqueOrThrow({
          where: { id: invoiceImageId },
        })),
        imageExists: await this.imageExists(invoiceImageId),
      };
    } catch (err) {
      throw new NotFoundException(`Image not found with ID ${invoiceImageId}`);
    }
  }

  private async imageExists(invoiceImageId: number) {
    try {
      await fs.access(
        join(
          __dirname,
          '../../',
          `${INVOICE_IMAGES_PATH}/${invoiceImageId}.jpg`,
        ),
        fs.constants.F_OK,
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
