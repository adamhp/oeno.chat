import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';
import * as fs from 'fs';

if (!process.env.OPENAI_API_KEY) {
  console.warn('Missing OPENAI_API_KEY environment variable');
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const query = await request.json();
  const queryContent = `
    I'm cooking ${query['query']}.
    Recommend three wine pairings for my meal in JSON list format with the following keys: "grape", "grape_color", "grape_description", "recommendations", and "reasoning". 
    I prefer lesser known vintages.
    For the "grape_description", elaborate on the grape's flavor profile.
    For "reasoning", use an array of concise sentences and begin each sentence using a single unique emoji that represents that sentence. Do not begin any sentence with "the". 
    For "recommendations", use an array and include the year produced.
  `.replace('\n', ' ');
  var response = {};
  try {
    console.log(`Submitting query for ${query['query']}`);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: queryContent }],
    });
    if (
      completion.data &&
      completion.data.choices.length &&
      completion.data.choices[0].message
    ) {
      const message = completion.data.choices[0].message;
      response = JSON.parse(message.content);
    }
    // Append to log for debugging
    fs.appendFile(
      '/tmp/log',
      JSON.stringify(response, null, 2) + '\n---\n',
      function (err) {
        if (err) {
          return console.log(err);
        }
        console.log('The file was saved!');
      },
    );
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      JSON.stringify((error as unknown as any).response),
    );
  }
}
