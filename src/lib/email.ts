import { Resend } from "resend";
import { mapErrorToPayload } from "./errors";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailProps = {
  userEmail: string;
  verificationUrl: string;
  subject: string;
  html: string;
};

export async function sendEmail({
  subject,
  userEmail,
  verificationUrl,
  html,
}: SendEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "WashPro <onboarding@resend.dev>",
      to: ["medranogarciaenyel@gmail.com"],
      subject: subject,
      html,
    });

    console.log(data);
    console.log(error);
  } catch (error) {
    return mapErrorToPayload(error);
  }
}
