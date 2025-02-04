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

import { PacketCreatePayload, PacketDetailParams } from "./data-contracts";
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
  packetCreate = (body: PacketCreatePayload, params: RequestParams = {}) =>
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
  packetDetail = ({ packetId, ...query }: PacketDetailParams, params: RequestParams = {}) =>
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
         * 已發放金額
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
          amount?: string;
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
        /**
         * 總預算金額
         * @format decimal
         */
        withholdAmount?: string;
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
