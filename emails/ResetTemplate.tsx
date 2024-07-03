import {
    Html,
    Head,
    Font,
    Preview,
    Link,
    Row,
    Section,
    Text,
} from '@react-email/components';

interface ResetTemplateProps {
    name: string;
    token: string;
}

export default function ResetTemplate({ name, token }: ResetTemplateProps) {
    const clientUrl = process.env.CLIENT_URL

    return (
        <Html lang="en" dir="ltr">
            <Head>
                <title>reset your social password.</title>
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
            <Preview>we saw you requested reset password. here&apos;s the link:</Preview>
            <Section>
                <Row>
                    <Text>hey {name.toLowerCase()}, you seem to forgot your password.</Text>
                    <Text>
                        don't worry we got you covered. you can reset your password with this link. this is valid for 10 mins so be quick.
                    </Text>
                </Row>
                <Row>
                    <Link href={clientUrl + "/auth/password?token=" + token}>reset password here</Link>
                </Row>
                <Row>
                    <Text>
                        if you didn't request reset password, please ignore this email.
                    </Text>
                    <Text>see ya:))</Text>
                    <Text>-social.</Text>
                </Row>
            </Section>
        </Html >
    );
}