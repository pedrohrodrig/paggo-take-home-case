import { Module } from '@nestjs/common';
import { InvoiceImagesController } from './invoice-images.controller';
import { InvoiceImagesService } from './invoice-images.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OcrModule } from 'src/ocr/ocr.module';

@Module({
  imports: [PrismaModule, OcrModule],
  controllers: [InvoiceImagesController],
  providers: [InvoiceImagesService],
})
export class InvoiceImagesModule {}
