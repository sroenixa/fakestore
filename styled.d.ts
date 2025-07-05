import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secondary: string;
            background: string;
            surface: string;
            text: string;
            textSecondary: string;
            border: string;
            success: string;
            error: string;
            warning: string;
        };
        shadows: {
            small: string;
            medium: string;
            large: string;
        };
        breakpoints: {
            mobile: string;
            tablet: string;
            desktop: string;
            large: string;
        };
    }
}
