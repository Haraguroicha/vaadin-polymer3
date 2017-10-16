declare module "*.html" {
    const content: string;
    export default content;
}

interface EventInit {
    readonly composed?: boolean;
}
