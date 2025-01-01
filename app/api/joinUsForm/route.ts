import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    name,
    email,
    rollNumber,
    branch,
    college,
    yearOfStudy,
    reasonForJoining,
  } = await req.json();

  const formUrl = process.env.FORM_URL as string;
  const fieldId1 = process.env.FIELD_ID1 as string;
  const fieldId2 = process.env.FIELD_ID2 as string;
  const fieldId3 = process.env.FIELD_ID3 as string;
  const fieldId4 = process.env.FIELD_ID4 as string;
  const fieldId5 = process.env.FIELD_ID5 as string;
  const fieldId6 = process.env.FIELD_ID6 as string;
  const fieldId7 = process.env.FIELD_ID7 as string;

  const formBody = new URLSearchParams({
    [fieldId1]: name,
    [fieldId2]: email,
    [fieldId3]: rollNumber,
    [fieldId4]: branch,
    [fieldId5]: college,
    [fieldId6]: yearOfStudy,
    [fieldId7]: reasonForJoining,
  });

  try {
    const response = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    });

    return NextResponse.json({ success: response.ok });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to submit form",
    });
  }
}
