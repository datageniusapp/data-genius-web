/**
 * @module utils/insight
 * @description Compute AI insights and simulated activity from real overview data.
 */

import type { Overview } from '../types/overview';

export interface InsightResult {
  headline: string;
  subtext: string;
}

export interface ActivityItem {
  icon: string;
  text: string;
  time: string;
}

/** Parse a dollar string like "$1,533" or "$533" into a number. */
function parseDollar(value: string): number {
  return parseFloat(value.replace(/[$,]/g, ''));
}

/** Compute the most relevant AI insight from live data. Problems take priority. */
export function computeInsight(data: Overview): InsightResult {
  const growthRate = parseFloat(data.growth.growthRateLast30Days);
  const activeUsers = data.growth.activeUsersLast30Days;
  const totalUsers = data.users.total;
  const activeRate = totalUsers > 0 ? activeUsers / totalUsers : 0;
  const arpu = parseDollar(data.revenue.arpu);

  const atRisk = Math.round((totalUsers - activeUsers) * 0.08);
  const upside = Math.round(atRisk * arpu);

  if (activeRate < 0.35) {
    return {
      headline: `Revenue growing. Engagement is lagging.`,
      subtext: `${atRisk} users may not return this week. $${upside.toLocaleString()} at stake.`,
    };
  }

  if (growthRate > 20) {
    return {
      headline: `Growth is strong. Retention needs attention.`,
      subtext: `${atRisk} at-risk users identified. Recover them for +$${upside.toLocaleString()} MRR upside.`,
    };
  }

  return {
    headline: `${data.revenue.mrr} MRR. ${atRisk} users need a nudge.`,
    subtext: `Targeted recovery could unlock +$${upside.toLocaleString()} in monthly revenue.`,
  };
}

/** Derive at-risk user count and revenue upside from data. */
export function computeAtRisk(data: Overview): { atRisk: number; upside: number } {
  const totalUsers = data.users.total;
  const activeUsers = data.growth.activeUsersLast30Days;
  const arpu = parseDollar(data.revenue.arpu);
  const atRisk = Math.round((totalUsers - activeUsers) * 0.08);
  const upside = Math.round(atRisk * arpu);
  return { atRisk, upside };
}

/** Generate plausible recent activity items from real overview data. */
export function generateActivity(data: Overview): ActivityItem[] {
  const mrrNum = parseDollar(data.revenue.mrr);
  const dailyRevenue = Math.round(mrrNum / 30);
  const { atRisk } = computeAtRisk(data);
  return [
    {
      icon: '🛒',
      text: `${Math.floor(data.revenue.activeSubscribers / 7)} purchases`,
      time: '3m ago',
    },
    {
      icon: '💵',
      text: `+$${dailyRevenue} today`,
      time: 'Just now',
    },
    {
      icon: '📈',
      text: `${data.growth.newUsersLast30Days} new users this month`,
      time: '1h ago',
    },
    {
      icon: '⚠️',
      text: `${atRisk} at-risk users`,
      time: '5m ago',
    },
  ];
}
