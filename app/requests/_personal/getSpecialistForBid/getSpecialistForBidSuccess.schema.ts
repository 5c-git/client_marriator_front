import { z } from "zod";

export const getSpecialistForBidSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      phone: z.number(),
      email: z.string(),
      logo: z.union([z.string(), z.null()]),
      roles: z.array(
        z.object({
          id: z.number().gte(1).lte(6),
          name: z.enum(["manager", "supervisor", "client", "specialist"]),
        }),
      ),
      radius: z.string(),
      name: z.string(),
      age: z.string(),
      country: z.string(),
      viewActivities: z.array(z.string()),
    }),
  ),
});

export type GetSpecialistForBidSuccess = z.infer<
  typeof getSpecialistForBidSuccessSchema
>;
