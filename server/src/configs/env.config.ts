import "dontenv/config";
import {url, z} from "zod";

const booleanstring = z
.enum (["true", "false"])
.default("false")
.transform((value)=>calue ==="true");

const envschema = z
.object({
    Node_ENV:z
    .enum(["development", "test", "production"])
    .default("development"),
    port: z.coerce.number().int().min(1).max(65535).default(3000),
    SERVER_URL: z.url().default("hhtp://localhost:3000")
    CLIENT_URL z.url().defult("http://localhost:5173")
    DATABASE_URL: z.string().min(1),
    REDIS_URL: z.string().min(1)
    ACCESS_TOKEN_SECRET: z.string().min(32),
    REFRESH_TOKEN_DAYS: z.coerce.number().int().min(1).max(365).default(30),
    RESPONDENT_SESSION_DAYS: z.coerce
    .number()
    .int()
    .min()
    .max(365)
    .defult(90),
    COOKIE_DOMAIN: z.string().optional(),
    TRUST_PROXY: z.string().default("loopback"),
    SUBMISSION_RATE_LIMIT_WINDOW_SECONDS: z.coerce
    .number()
    .int()
    .min(1)
    .default(60),
    SUBMISSION_RATE_LIMIT_MAX: z.coerce.number().int().min(1).default(10),
    EMAIL_DELIVERY_ENABLED:NOOLEANSTRING,
    SMTP_HOST: z.string().optional(),
    SMPT_PORT: z.coerce.number().int().min(1).default(587),
    SMPT_SECURE: booleanstring,
    SMPT_USER: z.string().optional(),
    SMPT_PASSWORD: z.string().optional(),
    EMAIL_FROM: z.string().default("dynamic survey <no-reply@example.com>"),
})
.superRefine((env, context) => {
if (env.EMAIL_DELIVERY_ENABLED) {
    for (const key of ["SMPT_HOST", "SMTP_USER", "SMTP_PASSWORD"] as const) {
        if (!env[key]){
            context.addIssue({
            code:"custom",
            path: [key],
            message: '${key} is required when email delivery is enabled',
            });
        }
    }
}
});

export const  envVariable = envschema.parse(process.env);