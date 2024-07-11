import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceImagesService } from './invoice-images.service';

describe('InvoiceImagesService', () => {
  let service: InvoiceImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceImagesService],
    }).compile();

    service = module.get<InvoiceImagesService>(InvoiceImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
