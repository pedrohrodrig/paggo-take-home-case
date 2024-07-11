import { promises as fs } from 'fs';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';

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
          `public/invoice-images/${invoiceImageId}.jpg`,
        ),
        fs.constants.F_OK,
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
