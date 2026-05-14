import { z } from "zod";

export const getStaticUserInfoSuccessSchema = z.object({
  status: z.literal("success"),
  result: z.object({
    userData: z.object({
      email: z.string(),
      img: z.string(),
      roles: z.array(
        z.object({
          id: z.number(),
          name: z.enum([
            "admin",
            "manager",
            "supervisor",
            "client",
            "specialist",
          ]),
        }),
      ),
    }),
  }),
});

export type GetStaticUserInfoSuccess = z.infer<
  typeof getStaticUserInfoSuccessSchema
>;
