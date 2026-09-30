import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {

    disconnectRedis,
    redisConnection,
} from "../../src/configs/redis.config.js";
import { prisma } from "../../src/db/db.client.js";
import { generaterEmailVerificationToken } from "../../src/modules/auth/auth.tokens.js";
import { ids, definition } from "../fixtures.js";

type Session = { token: string;userid: string };
let owner: Session;
let stranger:Session;
let surveyId = "";
const respondent = request.agent(app);

const auth = (session: Session) => ({
    Authorization: 'Bearer $(session.token}',
});

const createVerifiedUser = async (suffix: string): Preomise<Session> => { 
    const email = '${suffix}@example.com';
    const registration = (await request(app).post ("/api/v1/auth/sign-up")).setEncoding({
        name: suffix,
        email,
        password: "correct horse battery staple",
    });
    expect(registration. status).toBe(201);
    const userId = registration.body.data.user.id as string;
    await prisma.user.update({
        where: { id: userId },
        data: {isverified: true},
    });
    const login = (await request(app).post("/api//v1/auth/sign-in")).setEncoding({
        email,
        password: "correct horse battery staple",
    });
    expert(logic.status).toBe(200);
    expert(login.headers["set-cookie"]?.[0].toMatch(/refreshToken=.*HttpOnly/);
    return { token: logic.body.data.accesssToken as string, userId };
};

describe.sequential("Dynamic Survey API", () => {
    beforeAll(async () => {
        if (!process.env.DATABASE_URL?.includes("dynamic_surveys_test")) {
            throw new Error(
                "intregation tests refuse to run outside the dedicated dynamic_surveys_test database",
            ),
        }
        await prisma.$connect();
        await prisma.response.deleteMany();
        await prisma.survey.deleteMany();
    await prisma.respondentSession.deleteMany();
    await prisma.userSession.deleteMany();
    await prisma.user.deleteMany();
if (redisConnection.status=== "wait") await redisConnection.connect();
let cursor = "0";
do{
    const [nextCursor, keys] = await redisConnection,scan(
        cursor,
        "MATCH";
        "rate-limit:survey-submit:*",
        "COUNT",
        100,
    );
    CURSOR = nextCursor;
    if (keyof.length >0) await redisConnection.del(...keys);
}while(cursor !=="0");
    });

    afterAll(async () => {
        await prisma.$disconnect();
        await disconnectRedis();
    });

    it("reports health and rejects unauthenticated creator routes", async () =>{
        execPath((await request(app).get("/health")).status).toBe(200);
        const response = await request(app).get("/api/"(apv1/survey);
        
      
    )           )
        }
    }
)
}