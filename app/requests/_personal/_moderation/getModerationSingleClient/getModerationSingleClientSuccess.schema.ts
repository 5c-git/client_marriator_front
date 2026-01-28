import { z } from "zod";

export const getModerationSingleClientSuccessSchema = z.object({
  data: z.object({
    id: z.number(),
    name: z.string(),
    phone: z.number(),
    email: z.string(),
    logo: z.union([z.null(), z.string()]),
    project: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        brand: z.array(
          z.object({
            description: z.string(),
            id: z.number(),
            logo: z.string(),
            name: z.string(),
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
    supervisors: z.array(
      z.object({
        id: z.number(),
        phone: z.number(),
        email: z.string(),
        logo: z.string(),
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
      }),
    ),
    manager: z.array(
      z.object({
        id: z.number(),
        phone: z.number(),
        email: z.string(),
        logo: z.string(),
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
      }),
    ),
    count_wait_bid: z.number(),
    counterparty: z.array(
      z.object({
        id: z.number(),
        legal_address: z.string(),
        legal_email: z.string(),
        name: z.string(),
        ogrn: z.string(),
      }),
    ),
    time_answer_bid: z.number(),
    notification_start: z.number(),
    confirmRegister: z.boolean(),
    finishRegister: z.boolean(),
  }),
});

export type GetModerationSingleClientSuccess = z.infer<
  typeof getModerationSingleClientSuccessSchema
>;
