import { promises as fs } from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import { INVOICE_IMAGES_PATH } from './invoice-images';

@Injectable()
export class InvoiceImagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createInvoiceImageEntity(userId: number) {
    return this.prismaService.invoiceImage.create({
      data: { userId },
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
}
