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
        /** 金蛋等級:GOLD,SILVER,NORMAL */
        eggLevel: string;
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
}
