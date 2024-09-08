import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

// This handles POST requests to our API route
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const userMessage = body.message;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Return the response from OpenAI to the frontend
    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);

    return new Response(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500 }
    );
  }
};
