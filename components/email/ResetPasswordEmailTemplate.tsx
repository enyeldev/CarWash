import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Tailwind,
} from "@react-email/components";

import { render } from "@react-email/render";

type PasswordResetEmailProps = {
  userEmail: string;
  resetLink: string;
};

export const PasswordResetEmail = ({
  userEmail,
  resetLink,
}: PasswordResetEmailProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[16px] m-0">
                Someone requested a password reset for your account associated
                with <strong>{userEmail}</strong>. If this was you, click the
                button below to create a new password.
              </Text>
              <Text className="text-[16px] text-gray-700 mb-[24px] m-0">
                This link will expire in <strong>24hrs</strong> for security
                reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetLink}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Reset Your Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                If the button doesn't work, copy and paste this link into your
                browser:
              </Text>
              <Link
                href={resetLink}
                className="text-blue-600 text-[14px] break-all"
              >
                {resetLink}
              </Link>
            </Section>

            {/* Security Notice */}
            <Section className="border-t border-solid border-gray-200 pt-[24px] mb-[32px]">
              <Text className="text-[14px] text-gray-600 mb-[12px] m-0">
                <strong>Security Notice:</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                • If you didn't request this password reset, you can safely
                ignore this email
              </Text>
              <Text className="text-[14px] text-gray-600 mb-[8px] m-0">
                • Never share this link with anyone
              </Text>
              <Text className="text-[14px] text-gray-600 m-0">
                • This link can only be used once
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                This email was sent to {userEmail}
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                123 Security Street, Safe City, SC 12345
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
                © {new Date().getFullYear()} Your Company. All rights reserved.
                |
                <Link href="#" className="text-gray-500 ml-[4px]">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export const htmlEmailResetPassword = async ({
  userEmail,
  resetLink,
}: PasswordResetEmailProps) =>
  await render(
    <PasswordResetEmail userEmail={userEmail} resetLink={resetLink} />,
  );
