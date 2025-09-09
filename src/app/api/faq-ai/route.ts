import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { answer: 'AI service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const groq = new Groq({ 
      apiKey: process.env.GROQ_API_KEY
    });

    const { question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a helpful AI assistant for Zauren pricing and plan questions. Answer questions about our pricing plans, features, and services. Keep answers concise and helpful.

Our pricing plans:
- Starter ($19/month): 1 API integration, 10M tokens, basic features, great for startups
- Professional ($49/month): 3 API integrations, 50M tokens, advanced features, most popular
- Growth ($149/month): 6 API integrations, 200M tokens, predictive insights, custom workflows
- Enterprise (Custom): Unlimited integrations, 1B+ tokens, SLA guarantee, white-label

Key features: AI customer service agents, WhatsApp/Instagram/Web integrations, cart sync, order automation, sales insights.

Overage: $1 per extra 1M tokens for all plans.
All plans include 24/7 AI support, no setup fees, cancel anytime, 14-day free trial.

If you don't know specific details, direct users to contact sales for more information.`
        },
        {
          role: "user",
          content: question
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 200
    });

    const answer = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again or contact our support team.";

    return NextResponse.json({ answer });

  } catch (error) {
    console.error('Groq API error:', error);
    return NextResponse.json({ 
      answer: "I'm experiencing technical difficulties. Please refer to our FAQ section above or contact our support team." 
    }, { status: 500 });
  }
}
