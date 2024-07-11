import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceImagesController } from './invoice-images.controller';

describe('InvoiceImagesController', () => {
  let controller: InvoiceImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoiceImagesController],
    }).compile();

    controller = module.get<InvoiceImagesController>(InvoiceImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
