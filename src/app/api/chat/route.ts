import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'AI service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const groq = new Groq({ 
      apiKey: process.env.GROQ_API_KEY
    });

    const { message } = await request.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful AI customer service assistant for Zauren, a company that provides AI-powered customer service solutions. You help businesses automate their customer interactions through intelligent AI assistants that work on platforms like WhatsApp, Instagram, Facebook Messenger, etc.

Key points about Zauren:
- We help businesses set up AI assistants that chat with customers automatically
- Businesses just need to share their information with us, we handle all the technical setup
- The AI learns about their products, services, and business to provide helpful responses
- Available 24/7 to help customers with questions, orders, support, etc.
- Works on all major messaging platforms
- Helps increase sales and customer satisfaction

Respond as a friendly, helpful customer service AI. Keep responses VERY short (maximum 1 sentence, 15-20 words). Be concise, professional, and focused on how Zauren can help their business. Use simple language.`
        },
        {
          role: "user",
          content: message
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 50
    });

    const response = chatCompletion.choices[0]?.message?.content || "I'm here to help! Could you please rephrase your question?";

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return NextResponse.json(
      { error: 'Sorry, I encountered an issue. Please try again.' },
      { status: 500 }
    );
  }
}
