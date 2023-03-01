import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const orderRouter = createTRPCRouter({
  placeOrder: publicProcedure
    .input(
      z.object({
        name: z.string(),
        deliveryAddress: z.string(),
        items: z.array(
          z.object({
            productId: z.string(),
            quantity: z.number().min(0),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const url = new URL(
        `https://sweet-apple-acres.netlify.app/.netlify/functions/api/orders`
      );
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(input),
      });
      console.log(response);

      const data = z
        .object({
          id: z.string(),
          name: z.string(),
          deliveryAddress: z.string(),
          items: z.array(
            z.object({
              product: z.object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
                image: z.string(),
                price: z.number(),
                rating: z.number(),
                isAvailable: z.boolean(),
              }),
              quantity: z.number().min(0),
            })
          ),
        })
        .strip()
        .parse(await response.json());
      // const data = await response.json();
      console.log(data);

      return data;
    }),
});
