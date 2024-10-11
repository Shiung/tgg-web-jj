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

export class Packets<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*PacketController)
   * @name PacketsList
   * @request GET:/ajax/packets
   */
  packetsList = (
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
        /** 紅包列表 */
        list?: {
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
           * 目前餘額
           * @format decimal
           */
          remainingAmount?: string;
          /**
           * 狀態 1:進行中 2:已終止(用戶提前中斷發放) 3:已完成(發放完畢)
           * @format int64
           */
          state?: number;
        }[];
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
      },
      any
    >({
      path: `/ajax/packets`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*PacketController)
   * @name PacketsArchivedList
   * @request GET:/ajax/packets/archived
   */
  packetsArchivedList = (
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
        /** 紅包列表 */
        list?: {
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
           * 目前餘額
           * @format decimal
           */
          remainingAmount?: string;
          /**
           * 狀態 1:進行中 2:已終止(用戶提前中斷發放) 3:已完成(發放完畢)
           * @format int64
           */
          state?: number;
        }[];
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
      },
      any
    >({
      path: `/ajax/packets/archived`,
      method: "GET",
      query: query,
      ...params,
    });
}
