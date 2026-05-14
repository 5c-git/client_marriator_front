import { z } from "zod";

export const getModerationClientSuccessSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.union([z.null(), z.string()]),
      phone: z.number(),
      email: z.string(),
      logo: z.union([z.null(), z.string()]),
      project: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          dateStart: z.string(),
          dateEnd: z.string(),
          brand: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              logo: z.string(),
              description: z.string(),
            }),
          ),
        }),
      ),
      place: z.array(
        z.object({
          id: z.number(),
          logo: z.string(),
          name: z.string(),
          latitude: z.string(),
          longitude: z.string(),
          address_kladr: z.string(),
          region: z.object({ id: z.number(), name: z.string() }),
          brand: z.object({
            description: z.string(),
            id: z.number(),
            logo: z.string(),
            name: z.string(),
          }),
        }),
      ),
      roles: z.array(
        z.object({
          id: z.number().gte(1).lte(6),
          name: z.enum([
            "admin",
            "manager",
            "supervisor",
            "client",
            "specialist",
          ]),
        }),
      ),
      change_order: z.union([z.null(), z.string()]),
      cancel_order: z.union([z.null(), z.string()]),
      live_order: z.union([z.null(), z.string()]),
      change_task: z.union([z.null(), z.string()]),
      cancel_task: z.union([z.null(), z.string()]),
      live_task: z.union([z.null(), z.string()]),
      repeat_bid: z.union([z.null(), z.string()]),
      leave_bid: z.union([z.null(), z.string()]),
      refusal_task: z.union([z.null(), z.string()]),
      waiting_task: z.union([z.null(), z.number()]),
      supervisors: z.array(z.any()),
      manager: z.array(z.any()),
      count_wait_bid: z.number(),
      counterparty: z.array(z.any()),
      time_answer_bid: z.number(),
      notification_start: z.number(),
      confirmRegister: z.boolean(),
      finishRegister: z.boolean(),
    }),
  ),
  links: z.object({
    first: z.string(),
    last: z.union([z.null(), z.string()]),
    prev: z.union([z.null(), z.string()]),
    next: z.union([z.null(), z.string()]),
  }),
  meta: z.object({
    current_page: z.number(),
    from: z.union([z.number(), z.null()]),
    path: z.string(),
    per_page: z.number(),
    to: z.union([z.number(), z.null()]),
  }),
});

export type GetModerationClientSuccess = z.infer<
  typeof getModerationClientSuccessSchema
>;
