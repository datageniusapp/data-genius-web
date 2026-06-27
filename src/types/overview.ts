/**
 * @module types/overview
 * @description Zod schema and inferred TypeScript types for the /overview API endpoint.
 * Single source of truth for all overview data shapes consumed by the dashboard.
 */
import { z } from 'zod';

/** Schema for Firebase Auth user metrics. */
export const usersSchema = z.object({
  total: z.number(),
  newLast30Days: z.number(),
  source: z.literal('firebase-auth'),
});

/** Schema for MongoDB growth metrics. */
export const growthSchema = z.object({
  totalUsers: z.number(),
  newUsersLast30Days: z.number(),
  activeUsersLast30Days: z.number(),
  subscribedUsers: z.number(),
  growthRateLast30Days: z.number(),
  source: z.literal('mongodb'),
});

/** Schema for RevenueCat revenue metrics. */
export const revenueSchema = z.object({
  mrr: z.number(),
  activeSubscribers: z.number(),
  revenueLast28Days: z.number(),
  newCustomersLast28Days: z.number(),
  activeUsersLast28Days: z.number(),
  arpu: z.number(),
  source: z.literal('revenuecat'),
});

/** Root schema for the combined /overview API response. */
export const overviewSchema = z.object({
  generatedAt: z.string(),
  users: usersSchema,
  growth: growthSchema,
  revenue: revenueSchema,
});

/** Inferred TypeScript type for the /overview API response. */
export type Overview = z.infer<typeof overviewSchema>;

/** Inferred TypeScript type for user metrics. */
export type Users = z.infer<typeof usersSchema>;

/** Inferred TypeScript type for growth metrics. */
export type Growth = z.infer<typeof growthSchema>;

/** Inferred TypeScript type for revenue metrics. */
export type Revenue = z.infer<typeof revenueSchema>;
