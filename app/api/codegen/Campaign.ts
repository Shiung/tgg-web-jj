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

import { ClaimTreasureRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Campaign<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*EggController)
   * @name CampaignEggActivityInfoList
   * @request GET:/ajax/campaign/egg/activity/info
   */
  campaignEggActivityInfoList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 獎池 */
        prizePool: {
          /**
           * 顯示獎池(Usdt) max
           * @format decimal
           */
          displayUsdtPrizeMax: string;
          /**
           * 顯示獎池(Usdt) min
           * @format decimal
           */
          displayUsdtPrizeMin: string;
          /** 金蛋等級:GOLD,SILVER,NORMAL */
          eggLevel: string;
          /**
           * 錘子數量
           * @format int64
           */
          hammerSpent: number;
        }[];
      },
      any
    >({
      path: `/ajax/campaign/egg/activity/info`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*EggController)
   * @name CampaignEggClaimCreate
   * @request POST:/ajax/campaign/egg/claim
   */
  campaignEggClaimCreate = (
    body: {
      /** 領取ID */
      transactionId: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<any, any>({
      path: `/ajax/campaign/egg/claim`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*EggController)
   * @name CampaignEggGiveupCreate
   * @request POST:/ajax/campaign/egg/giveup
   */
  campaignEggGiveupCreate = (
    body: {
      /** 金蛋等級:GOLD,SILVER,NORMAL */
      eggLevel: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<any, any>({
      path: `/ajax/campaign/egg/giveup`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*EggController)
   * @name CampaignEggInfoCreate
   * @request POST:/ajax/campaign/egg/info
   */
  campaignEggInfoCreate = (params: RequestParams = {}) =>
    this.http.request<
      {
        /**
         * 鐵錘數量
         * @format uint64
         */
        hammerRemaining?: number;
        /** 金蛋資訊 */
        record?: {
          /** 是否已領取 */
          claimed?: boolean;
          /** 金蛋等級 */
          eggLevel?: string;
          /** 玩法狀態:SUCCESS,PLAYING,FAILED */
          playStatus?: string;
          /**
           * 商品ID
           * @format uint64
           */
          productId?: number;
          /**
           * 破蛋進度
           * @format decimal
           */
          progress?: string;
          /**
           * 獎金金額
           * @format decimal
           */
          reward?: string;
          /**
           * 總共破蛋次數
           * @format uint64
           */
          totalCount?: number;
          /** 領取ID */
          transactionId?: string;
        } | null;
      },
      any
    >({
      path: `/ajax/campaign/egg/info`,
      method: "POST",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*EggController)
   * @name CampaignEggMarqueeList
   * @request GET:/ajax/campaign/egg/marquee
   */
  campaignEggMarqueeList = (
    query: {
      /**
       * 筆數 (Required)
       * @format int64
       */
      size: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        /** 金蛋跑馬燈 */
        result: {
          /** 會員名稱 */
          customerName: string;
          /** 金蛋等級:GOLD,SILVER,NORMAL */
          eggLevel: string;
          /**
           * 獎金
           * @format decimal
           */
          reward: string;
        }[];
      },
      any
    >({
      path: `/ajax/campaign/egg/marquee`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*EggController)
   * @name CampaignEggSmashCreate
   * @request POST:/ajax/campaign/egg/smash
   */
  campaignEggSmashCreate = (
    body: {
      /** 金蛋等級:GOLD,SILVER,NORMAL */
      eggLevel: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        /** 金蛋等級:GOLD,SILVER,NORMAL */
        eggLevel: string;
        /**
         * 鐵錘數量
         * @format uint64
         */
        hammerRemaining?: number;
        /**
         * 進度
         * @format decimal
         */
        progress: string;
        /**
         * 獎勵
         * @format decimal
         */
        reward: string;
        /**
         * 總次數
         * @format uint64
         */
        totalCount: number;
      },
      any
    >({
      path: `/ajax/campaign/egg/smash`,
      method: "POST",
      body: body,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*TreasureController)
   * @name CampaignTreasuresList
   * @request GET:/ajax/campaign/treasures
   */
  campaignTreasuresList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 列表 */
        list: ({
          /**
           * 會員投注BC遊戲比例
           * @format decimal
           */
          betRequirement: string;
          /**
           * 創建時間(領取時間)
           * @format date-time
           */
          createdAt: string;
          /**
           * 直屬下線投注BC遊戲比例
           * @format decimal
           */
          directSubBetRequirement: string;
          /**
           * TreasureID
           * @format uint64
           */
          id: number;
          /**
           * 剩餘領取金額
           * @format decimal
           */
          remainingClaimAmount: string;
          /**
           * 剩餘解鎖金額
           * @format decimal
           */
          remainingUnlockAmount: string;
          /**
           * 獎勵金額
           * @format decimal
           */
          rewardAmount: string;
          /** 獎勵類型. Allowed Enum */
          rewardType: "USDT" | "TON" | "KOKON";
          /** 狀態: 待解鎖、解鎖中、已解鎖. Allowed Enum */
          status: "STANDBY" | "UNLOCKING" | "UNLOCKED";
        } | null)[];
      },
      any
    >({
      path: `/ajax/campaign/treasures`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*TreasureController)
   * @name CampaignTreasuresClaimBonusCreate
   * @request POST:/ajax/campaign/treasures/{id}/claim-bonus
   */
  campaignTreasuresClaimBonusCreate = (id: string, body: object, params: RequestParams = {}) =>
    this.http.request<ClaimTreasureRequest, any>({
      path: `/ajax/campaign/treasures/${id}/claim-bonus`,
      method: "POST",
      body: body,
      ...params,
    });
}
