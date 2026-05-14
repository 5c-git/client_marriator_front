import { z } from "zod";

export const postSetUserPinUnauthSchema = z.object({ message: z.string() });

export type PostSetUserPinUnauth = z.infer<typeof postSetUserPinUnauthSchema>;
