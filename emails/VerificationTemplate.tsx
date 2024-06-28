import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
} from '@react-email/components';

interface VerificationEmailProps {
    name: string;
    otp: string;
}

export default function VerificationEmail({ name, otp }: VerificationEmailProps) {
    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>yo. verification code.</title>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Verdana"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
            </Head>
            <Preview>c'mon you made it. here&apos;s your verification code: {otp}</Preview>
            <Section>
                <Row>
                    <Text>hey {name.toLowerCase()}, you made it.</Text>
                    <Text>
                        welcome to social. thank you for siging up. please use the following verification
                        code to complete your registration, it will expire in 1 hr:
                    </Text>
                </Row>
                <Row>
                    <Text>{otp}</Text>
                </Row>
                <Row>
                    <Text>
                        if you did not request this code, please ignore this email.
                    </Text>
                    <Text>see ya:))</Text>
                </Row>
            </Section>
        </Html>
    );
}