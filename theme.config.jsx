import { useConfig } from "nextra-theme-docs";

export default {
    logo: <span>feedback docs</span>,
    project: {
        link: 'https://github.com/MayankBansal12/feedback'
    },
    docsRepositoryBase: "https://github.com/MayankBansal12/feedback",
    head: () => {
        const { frontMatter } = useConfig();

        return (
            <>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    property="og:title"
                    content={frontMatter.title || "feedback"}
                />
                <meta
                    property="og:description"
                    content={
                        frontMatter.description ||
                        "home for collecting and managing all your user feedbacks and reviews"
                    }
                />
            </>
        );
    },
    footer: {
        text: (
            <h1>&#169;{" 2024 feedback."}</h1>
        ),
    },
    editLink: {
        text: null,
    },
    feedback: {
        content: null
    },
    banner: {
        key: '0.0-release',
        text: (
            <a href="https://feedback-easy.vercel.app" target="_blank">
                🎉 feedback 0.0.1 is released. checkout here →
            </a>
        )
    },
    useNextSeoProps() {
        return {
            titleTemplate: "%s - feedback.",
        };
    },
}
