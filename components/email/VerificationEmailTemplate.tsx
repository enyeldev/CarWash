import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

import { render } from "@react-email/render";

type EmailVerificationProps = {
  userEmail: string;
  verificationUrl: string;
};

export const EmailVerification = ({
  userEmail,
  verificationUrl,
}: EmailVerificationProps) => {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>
        Verify your email to start managing your car wash business
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="mx-auto bg-white rounded-xl shadow-sm max-w-150 px-8 py-10">
            {/* Header */}
            <Section className="text-center mb-8">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-2">
                Welcome to WashPro!
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                Your all-in-one car wash management solution
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-8">
              <Text className="text-[16px] text-gray-700 leading-6 mb-4">
                Hi there! 👋
              </Text>
              <Text className="text-[16px] text-gray-700 leading-6 mb-4">
                Thanks for signing up for WashPro. We're excited to help you
                streamline your car wash operations, manage customers, and grow
                your business.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-6 mb-6">
                To get started, please verify your email address by clicking the
                button below:
              </Text>
            </Section>

            {/* Verification Button */}
            <Section className="text-center mb-8">
              <Button
                href={verificationUrl}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl text-[16px] font-semibold no-underline box-border inline-block"
              >
                Verify Email Address
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-8">
              <Text className="text-[14px] text-gray-600 leading-5 mb-2">
                If the button doesn't work, copy and paste this link into your
                browser:
              </Text>
              <Link
                href={verificationUrl}
                className="text-blue-600 text-[14px] break-all"
              >
                {verificationUrl}
              </Link>
            </Section>

            {/* What's Next */}
            <Section className="mb-8 bg-gray-50 p-6 rounded-xl">
              <Heading className="text-[18px] font-bold text-gray-900 m-0 mb-4">
                What's next?
              </Heading>
              <Text className="text-[14px] text-gray-700 leading-5 mb-2 m-0">
                • Set up your car wash locations and services
              </Text>
              <Text className="text-[14px] text-gray-700 leading-5 mb-2 m-0">
                • Configure pricing and membership plans
              </Text>
              <Text className="text-[14px] text-gray-700 leading-5 mb-2 m-0">
                • Start accepting bookings and payments
              </Text>
              <Text className="text-[14px] text-gray-700 leading-5 m-0">
                • Track analytics and grow your revenue
              </Text>
            </Section>

            {/* Security Note */}
            <Section className="mb-8">
              <Text className="text-[14px] text-gray-600 leading-5">
                This verification link will expire in 24 hours. If you didn't
                create an account with WashPro, you can safely ignore this
                email.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-6">
              <Text className="text-[12px] text-gray-500 leading-4 text-center m-0 mb-2">
                WashPro - Car Wash Management Platform
              </Text>
              <Text className="text-[12px] text-gray-500 leading-4 text-center m-0 mb-2">
                123 Business Ave, Miami, FL 33101
              </Text>
              <Text className="text-[12px] text-gray-500 leading-4 text-center m-0">
                © {new Date().getFullYear()} WashPro. All rights reserved. |
                <Link href="#" className="text-gray-500 ml-1">
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

export const htmlEmailVerification = async ({
  userEmail,
  verificationUrl,
}: EmailVerificationProps) =>
  await render(
    <EmailVerification
      userEmail={userEmail}
      verificationUrl={verificationUrl}
    />,
  );
