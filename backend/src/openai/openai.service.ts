import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class OpenAiService {
  constructor(private readonly configService: ConfigService) {}

  async summarizeText(text: string): Promise<string> {
    try {
      const apiKey = this.configService.getOrThrow('HUGGINGFACE_API_KEY');
      const apiUrl = this.configService.getOrThrow('HUGGINGFACE_API_URL');

      const response = await axios.post(
        apiUrl,
        { inputs: text },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      return response.data[0].summary_text.trim();
    } catch (error) {
      console.error(
        'Erro ao chamar a API da OpenAI:',
        error.response ? error.response.data : error.message,
      );
      throw new Error('Erro ao chamar a API da OpenAI');
    }
  }
}
