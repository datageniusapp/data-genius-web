/**
 * @module types/retention
 * @description Zod schema and inferred TypeScript types for the /users/retention API response.
 */

import { z } from 'zod';

export const RetentionSchema = z.object({
  d1CohortSize: z.number().int().nonnegative(),
  d1Retained: z.number().int().nonnegative(),
  d1RetentionPct: z.number().min(0).max(100).nullable(),
  d7CohortSize: z.number().int().nonnegative(),
  d7Retained: z.number().int().nonnegative(),
  d7RetentionPct: z.number().min(0).max(100).nullable(),
  collectedAt: z.string().datetime(),
});

export type Retention = z.infer<typeof RetentionSchema>;
