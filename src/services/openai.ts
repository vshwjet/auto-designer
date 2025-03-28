import { Frame } from '../types';
import systemPrompt from './prompt';

const config = {
  apiKey: process.env.AZURE_OPENAI_API_KEY as string,
  endpoint: process.env.AZURE_OPENAI_ENDPOINT as string,
  deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME as string,
  apiVersion: process.env.AZURE_OPENAI_API_VERSION as string,
};

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function generateDesign(prompt: string, currentState?: Frame) {
  const messages: Message[] = [{ role: 'system', content: systemPrompt }];

  if (currentState) {
    messages.push({
      role: 'assistant',
      content: JSON.stringify(
        {
          frame: currentState,
        },
        null,
        2
      ),
    });

    // Add the incremental update instruction
    messages.push({
      role: 'system',
      content:
        "Above is the current design state. Please modify it according to the user's request while preserving the rest of the design. Return the complete updated design.",
    });
  }

  messages.push({ role: 'user', content: prompt });

  try {
    const apiUrl = `${config.endpoint}/openai/deployments/${config.deploymentName}/chat/completions?api-version=${config.apiVersion}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': config.apiKey,
      },
      body: JSON.stringify({
        messages,
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API call failed: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    const data: OpenAIResponse = (await response.json()) as OpenAIResponse;
    const content = data.choices[0].message.content;
    console.log(content);
    try {
      return JSON.parse(content);
    } catch (error) {
      console.error('Failed to parse LLM response:', error);
      throw new Error('Invalid response format from LLM');
    }

    // const data: OpenAIResponse = await response.json() as OpenAIResponse;
    // const content = data.choices[0].message.content;

    // try {
    //   const cleanedContent = content.trim();
    //   const jsonContent = cleanedContent.startsWith('"frame"') ? `{${cleanedContent}}` : cleanedContent;

    //   return JSON.parse(jsonContent);
    // } catch (error) {
    //   console.error('Failed to parse LLM response:', error);
    //   throw new Error('Invalid response format from LLM');
    // }
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    throw error;
  }
}
