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

export class Game<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*GameController)
   * @name GameEnergyList
   * @request GET:/ajax/game/energy
   */
  gameEnergyList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** @format uint64 */
        amount: number;
      },
      any
    >({
      path: `/ajax/game/energy`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*GameController)
   * @name GameEnergyUpdate
   * @request PUT:/ajax/game/energy
   */
  gameEnergyUpdate = (
    body: {
      /** @format uint64 */
      gameId: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        balance: string;
        currency: string;
      },
      any
    >({
      path: `/ajax/game/energy`,
      method: "PUT",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*GameController)
   * @name GameTransactionsList
   * @request GET:/ajax/game/transactions
   */
  gameTransactionsList = (
    query: {
      /**
       *  (Required). Format: 2006-01-02T15:04:05Z07:00
       * @format date-time
       */
      startTime: string;
      /**
       *  (Required). Format: 2006-01-02T15:04:05Z07:00
       * @format date-time
       */
      endTime: string;
      /**
       *  (Required)
       * @format uint64
       */
      gameId: number;
      /**
       * 分頁頁數 (Required, Minimum: 1)
       * @format int64
       * @min 1
       */
      page: number;
      /**
       * 分頁筆數 (Required, Minimum: 20)
       * @format int64
       * @min 20
       */
      pageSize: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        /**
         * 分頁筆數
         * @format int64
         * @min 20
         */
        pageSize: number;
        records?: ({
          /** 投注金額 */
          betGold: string;
          /** 投注金額(KOKON) */
          betGoldKokon: string;
          /**
           * 投注時間
           * @format date-time
           */
          betTime: string;
          /**
           * 遊戲id
           * @format uint64
           */
          subGameId: number;
          /** 投注單號 */
          transactionId: string;
          /** 輸贏金額 */
          winGold: string;
          /** 輸贏金額(KOKON) */
          winGoldKokon: string;
        } | null)[];
        /**
         * 總頁數
         * @format int64
         * @min 0
         */
        totalPage?: number | null;
        /**
         * 總筆數
         * @format int64
         * @min 0
         */
        totalRecord?: number | null;
      },
      any
    >({
      path: `/ajax/game/transactions`,
      method: "GET",
      query: query,
      ...params,
    });
}
