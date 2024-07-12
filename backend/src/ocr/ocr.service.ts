import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  async extractText(imagePath: string) {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imagePath, 'eng', {
        logger: (m) => console.log(m),
      });
      return text;
    } catch (error) {
      console.error('Error processing image:', error);
      throw new Error('Error processing image');
    }
  }
}
