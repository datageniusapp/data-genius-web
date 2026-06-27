/**
 * @module types/overview
 * @description Zod schema and inferred TypeScript types for the /overview API response.
 */

import { z } from 'zod';

export const UsersSchema = z.object({
  total: z.number(),
  newLast30Days: z.number(),
});

export const GrowthSchema = z.object({
  totalUsers: z.number(),
  newUsersLast30Days: z.number(),
  activeUsersLast30Days: z.number(),
  subscribedUsers: z.number(),
  growthRateLast30Days: z.string(),
});

export const RevenueSchema = z.object({
  mrr: z.string(),
  activeSubscribers: z.number(),
  revenueLast28Days: z.string(),
  newCustomers28Days: z.number(),
  arpu: z.string(),
});

export const OverviewSchema = z.object({
  users: UsersSchema,
  growth: GrowthSchema,
  revenue: RevenueSchema,
});

export type Overview = z.infer<typeof OverviewSchema>;
export type Users = z.infer<typeof UsersSchema>;
export type Growth = z.infer<typeof GrowthSchema>;
export type Revenue = z.infer<typeof RevenueSchema>;
