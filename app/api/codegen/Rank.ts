/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient, RequestParams } from "./http-client";

export class Rank<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*BCRankController)
   * @name RankBcList
   * @request GET:/ajax/rank/bc
   */
  rankBcList = (
    query: {
      /** 排行榜類型 (Required) */
      rankType: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        /** 排行榜 */
        rank: {
          /** 會員名稱 */
          customerName: string;
          /**
           * 排名
           * @format int64
           * @min 1
           */
          ranking: number;
          /**
           * 獎金
           * @format decimal
           */
          reward?: string;
          /** 獎金幣別 */
          rewardType?: string;
          /**
           * 有效下注金額
           * @format decimal
           */
          validBetGold: string;
        }[];
        /** 自己排名 */
        selfRank?: {
          /** 會員名稱 */
          customerName: string;
          /**
           * 排名
           * @format int64
           * @min 1
           */
          ranking: number;
          /**
           * 獎金
           * @format decimal
           */
          reward?: string;
          /** 獎金幣別 */
          rewardType?: string;
          /**
           * 有效下注金額
           * @format decimal
           */
          validBetGold: string;
        };
      },
      any
    >({
      path: `/ajax/rank/bc`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*BCRankController)
   * @name RankConfigList
   * @request GET:/ajax/rank/config
   */
  rankConfigList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** BC每日排行榜 */
        bcRankDailyEntrance: boolean;
        /** BC每日排行榜獎金 */
        bcRankDailyReward: boolean;
        /** BC每月排行榜 */
        bcRankMonthlyEntrance: boolean;
        /** BC每月排行榜獎金 */
        bcRankMonthlyReward: boolean;
        /** BC每周排行榜 */
        bcRankWeeklyEntrance: boolean;
        /** BC每周排行榜獎金 */
        bcRankWeeklyReward: boolean;
        /** 分享排行榜 */
        shareRankEntrance: boolean;
        /** 分享排行榜獎金 */
        shareRankReward: boolean;
      },
      any
    >({
      path: `/ajax/rank/config`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*ShareRankController)
   * @name RankShareList
   * @request GET:/ajax/rank/share
   */
  rankShareList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 排行榜 */
        rank: {
          /** 會員名稱 */
          customerName: string;
          /**
           * 排名
           * @format int64
           * @min 1
           */
          ranking: number;
          /**
           * 獎金
           * @format decimal
           */
          reward?: string;
          /** 獎金幣別 */
          rewardType?: string;
          /**
           * 直属下级人数
           * @format uint64
           */
          subordinatesCount?: number;
        }[];
        /** 自己排名 */
        selfRank?: {
          /** 會員名稱 */
          customerName: string;
          /**
           * 排名
           * @format int64
           * @min 1
           */
          ranking: number;
          /**
           * 獎金
           * @format decimal
           */
          reward?: string;
          /** 獎金幣別 */
          rewardType?: string;
          /**
           * 直属下级人数
           * @format uint64
           */
          subordinatesCount?: number;
        };
      },
      any
    >({
      path: `/ajax/rank/share`,
      method: "GET",
      ...params,
    });
}
