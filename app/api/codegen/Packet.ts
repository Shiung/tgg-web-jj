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

export class Packet<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*PacketController)
   * @name PacketCreate
   * @request POST:/ajax/packet
   */
  packetCreate = (
    body: {
      /** 紅包種類. Allowed Enum */
      distributeKind?: "FIXED" | "RANDOM";
      /**
       * 發放總金額
       * @format decimal
       */
      distributedAmount?: string;
      /**
       * 固定金額
       * @format decimal
       */
      fixedValue?: string;
      /**
       * 上限類型 0:個數 1:金額,若是FIXED發送類型時固定需為0). Allowed Enum
       * @format int64
       */
      limitKind?: 0 | 1;
      /**
       * 隨機金額上限
       * @format decimal
       */
      maxValue?: string;
      /**
       * 隨機金額下限
       * @format decimal
       */
      minValue?: string;
      /**
       * 數量
       * @format int64
       */
      quantity?: number;
      /**
       * 隨機奬勵預算
       * @format decimal
       */
      quota?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        /** 紅包推介碼 */
        referralCode?: string;
      },
      any
    >({
      path: `/ajax/packet`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*PacketController)
   * @name PacketDetail
   * @request GET:/ajax/packet/{packet_id}
   */
  packetDetail = (
    packetId: string,
    query: {
      /**
       * 頁碼 (Minimum: 1, Required)
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
         * 開始發放時間
         * @format date-time
         */
        createdAt?: string;
        /** 紅包種類. Allowed Enum */
        distributeKind?: "FIXED" | "RANDOM";
        /**
         * 發放總金額
         * @format decimal
         */
        distributedAmount?: string;
        /**
         * 已發放個數
         * @format int64
         */
        distributedQuantity?: number;
        /**
         * 固定金額
         * @format decimal
         */
        eachBagAmount?: string;
        /**
         * 隨機金額上限
         * @format decimal
         */
        maxBagAmount?: string;
        /**
         * 隨機金額下限
         * @format decimal
         */
        minBagAmount?: string;
        /** 分頁資訊 */
        pagination?: {
          /**
           * 分頁筆數
           * @format int64
           * @min 20
           */
          pageSize: number;
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
        };
        /** 領取人名單 */
        receiver?: {
          /** @format decimal */
          Amount?: string;
          avatar?: string;
          name?: string;
        }[];
        /** 紅包推介碼 */
        referralCode?: string;
        /**
         * 目前餘額
         * @format decimal
         */
        remainingAmount?: string;
        /**
         * 未發放個數
         * @format int64
         */
        remainingQuantity?: number;
      },
      any
    >({
      path: `/ajax/packet/${packetId}`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*PacketController)
   * @name PacketDelete
   * @request DELETE:/ajax/packet/{packet_id}
   */
  packetDelete = (packetId: string, body: object, params: RequestParams = {}) =>
    this.http.request<
      {
        succeed?: boolean;
      },
      any
    >({
      path: `/ajax/packet/${packetId}`,
      method: "DELETE",
      body: body,
      ...params,
    });
}
