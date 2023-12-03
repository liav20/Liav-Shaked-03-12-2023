import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let post = {
    id: 1,
    name: "Hello World",
};

export const weatherRouter = createTRPCRouter({
    currentWeather: publicProcedure
        .input(z.object({ city: z.string() }))
        .query(({ input }) => {
            return {
                greeting: `Hello from weather ${input.city}`,
            };
        }),

    fiveDaysForecasts: publicProcedure
        .input(z.object({ name: z.string().min(1) }))
        .mutation(async ({ input }) => {
            // simulate a slow db call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            post = { id: post.id + 1, name: input.name };
            return post;
        }),

    locationAutocomplete: publicProcedure.query(() => {
        return post;
    }),
});
