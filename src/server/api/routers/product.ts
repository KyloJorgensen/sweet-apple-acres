import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(
      z
        .object({
          search: z
            .object({
              search: z.string(),
              minRating: z.number(),
              maxRating: z.number(),
              minPrice: z.number(),
              maxPrice: z.number(),
              isAvailable: z.boolean(),
              limit: z.number(),
              offset: z.number(),
              orderBy: z.string(),
              sort: z.enum(["DESC", "ASC"]),
            })
            .partial()
            .strict()
            .optional(),
        })
        .partial()
    )
    .query(async ({ input }) => {
      const search = new URLSearchParams();
      Object.entries(input?.search || {}).forEach(([key, value]) => {
        search.append(key, `${value.toString()}`);
      });
      const query = search.toString();
      const url = new URL(
        `https://sweet-apple-acres.netlify.app/.netlify/functions/api/products${
          query ? `?${query}` : ""
        }`
      );

      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      console.log(data);
      return {
        data,
        greeting: `Hello`,
      };
    }),
});
