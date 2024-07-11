import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'utils/decorators/current-user.decorator';
import { TokenPayload } from 'utils/interfaces/token-payload.interface';
import { InvoiceImagesService } from './invoice-images.service';

@Controller('invoice-images')
export class InvoiceImagesController {
  constructor(private readonly invoiceImagesService: InvoiceImagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createInvoiceImageEntity(@CurrentUser() user: TokenPayload) {
    return this.invoiceImagesService.createInvoiceImageEntity(user.userId);
  }

  @Post(':invoiceImageId')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/invoice-images',
        filename: (request, file, callback) => {
          callback(
            null,
            `${request.params.invoiceImageId}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  uploadInvoiceImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    _file: Express.Multer.File,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getInvoiceImages() {
    return this.invoiceImagesService.getInvoiceImages();
  }

  @Get(':invoiceImageId')
  @UseGuards(JwtAuthGuard)
  async getProduct(@Param('invoiceImageId') invoiceImageId: number) {
    return this.invoiceImagesService.getInvoiceImage(+invoiceImageId);
  }
}
