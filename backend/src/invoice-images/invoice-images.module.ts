import { Module } from '@nestjs/common';
import { InvoiceImagesController } from './invoice-images.controller';
import { InvoiceImagesService } from './invoice-images.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InvoiceImagesController],
  providers: [InvoiceImagesService],
})
export class InvoiceImagesModule {}
