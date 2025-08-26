import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const session = await getAuthSession();

  if (!session || !process.env.ALLOWED_USERS.includes(session.user.email)) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

 try {
    const { query } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini", // cheaper & fast, can upgrade to gpt-4.1 if needed
      messages: [
        {
          role: "system",
          content: `
            You are an expert Los Angeles travel & food guide AI. 
            Always return results ONLY from Los Angeles County.
            The output MUST be valid JSON (no extra text, no markdown).
            Categories must match exactly one of these: ["Cafes", "places", "events", "parks", "eats", "museums"].
            Section must match exactly one of these: ["hero", "feed", "about", "featured"].
            Ensure:
            - addressLink is the official website of the place (not maps).
            - phone follows pattern [0-9+ -]*.
            - content is written in an engaging, SEO-friendly tone.
            - imageUrl is a working placeholder image if you cannot find one.
            Return JSON for one suggested item with this schema:

            {
              "title": "string",
              "content": "SEO friendly description",
              "imageUrl": "https://...",
              "address": "string street address",
              "addressLink": "https://official-website.com",
              "phoneNumber": "1 310 555 1234",
              "category": "Cafes",
              "section": "feed"
            }
          `,
        },
        {
          role: "user",
          content: `Suggest one LA highlight for: ${query}`,
        },
      ],
      temperature: 0.7,
    });

    // Extract text safely
    const raw = response.choices[0]?.message?.content?.trim();
    const data = JSON.parse(raw);

    return new NextResponse(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("AI Suggestion Error:", err);
    return new NextResponse(
      JSON.stringify({ success: false, error: "Failed to get suggestion" }),
      { status: 500 }
    );
  }
}
