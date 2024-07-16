import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OcrService } from 'src/ocr/ocr.service';
import { HuggingFaceService } from 'src/hugging-face/hugging-face.service';
import { TokenPayload } from 'utils/interfaces/token-payload.interface';

@Injectable()
export class InvoiceImagesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly ocrService: OcrService,
    private readonly huggingFaceService: HuggingFaceService,
  ) {}

  async createInvoiceImage(userId: number, file: Express.Multer.File) {
    const extractedText = await this.ocrService.extractText(
      `${file.destination}\\${file.filename}`,
    );

    const summarizedText =
      await this.huggingFaceService.summarizeText(extractedText);

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

  async getInvoiceImages(user: TokenPayload) {
    const invoiceImages = await this.prismaService.invoiceImage.findMany({
      where: { userId: user.userId },
    });
    return Promise.all(
      invoiceImages.map(async (invoiceImage) => ({
        ...invoiceImage,
      })),
    );
  }

  async getInvoiceImage(invoiceImageId: number) {
    try {
      return {
        ...(await this.prismaService.invoiceImage.findUniqueOrThrow({
          where: { id: invoiceImageId },
        })),
      };
    } catch (err) {
      throw new NotFoundException(`Image not found with ID ${invoiceImageId}`);
    }
  }
}
