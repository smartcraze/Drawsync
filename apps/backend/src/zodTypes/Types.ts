import { z } from "zod";

export const Signuptypes = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export const SigninTypes = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const CreateRoomTypes = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const UpdateRoomTypes = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const GetMessagesTypes = z.object({
  limit: z.number().min(1),
  offset: z.number().min(0),
});

export const SendMessageTypes = z.object({
  message: z.string().min(1),
});
