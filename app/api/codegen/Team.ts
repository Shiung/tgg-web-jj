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

export class Team<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CommissionController)
   * @name TeamCommissionListList
   * @request GET:/ajax/team/commission/list
   */
  teamCommissionListList = (
    query: {
      /** 玩家名稱 */
      displayName?: string;
      /**
       * 玩家差距層級
       * @format int64
       */
      level?: number;
      /**
       *  (Required)
       * @format date-time
       */
      startTime: string;
      /**
       *  (Required)
       * @format date-time
       */
      endTime: string;
      /**
       * 分頁頁數 (Required, Minimum: 1)
       * @format int64
       * @min 1
       */
      page: number;
      /**
       * 分頁筆數 (Minimum: 20, Required)
       * @format int64
       * @min 20
       */
      pageSize: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        /** 佣金明細 */
        list?: {
          /** 有效投注金額 */
          betAmount?: string;
          /** 反佣金額 */
          commissionAmount?: string;
          /**
           * 創立時間
           * @format date-time
           */
          createTime?: string;
          /** 玩家名稱 */
          displayName?: string;
          /**
           * 玩家差距層級
           * @format int64
           */
          level?: number;
          /**
           * 玩家Id
           * @format uint64
           */
          memberId?: number;
          /**
           * 佣金發放狀態
           * @format int64
           */
          sendStatus?: number;
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
        /** 總計 */
        summary?: {
          /** 總下注金額 */
          totalBet?: string;
          /** 總反佣金額 */
          totalCommission?: string;
          /**
           * 總筆數
           * @format int64
           */
          totalCount?: number;
        };
      },
      any
    >({
      path: `/ajax/team/commission/list`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*SettingController)
   * @name TeamSettingList
   * @request GET:/ajax/team/setting
   */
  teamSettingList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 升等設定 */
        classSetting?: {
          /**
           * 團隊有效用戶人數
           * @format int64
           */
          activeMember: number;
          /**
           * 星等
           * @format int64
           * @min 2
           */
          class: number;
          /** 團隊總投注 */
          totalBet: string;
          /** 團隊總充值 */
          totalDeposit: string;
        }[];
        /** 佣金設定 */
        commissionSetting?: {
          /**
           * 星等
           * @format int64
           * @min 1
           */
          class: number;
          /** 一級佣金比例 */
          level1: string;
          /** 二級佣金比例 */
          level2: string;
          /** 三級佣金比例 */
          level3: string;
          /** 四級佣金比例 */
          level4: string;
        }[];
      },
      any
    >({
      path: `/ajax/team/setting`,
      method: "GET",
      ...params,
    });
}
