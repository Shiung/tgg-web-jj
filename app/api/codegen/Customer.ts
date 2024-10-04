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

export class Customer<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerBindemailUpdate
   * @request PUT:/ajax/customer/bindemail
   */
  customerBindemailUpdate = (
    body: {
      /** 驗證碼 */
      code: string;
      /**
       * 收信信箱
       * @format email
       */
      email: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        succeed?: boolean;
      },
      any
    >({
      path: `/ajax/customer/bindemail`,
      method: "PUT",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerBindpinUpdate
   * @request PUT:/ajax/customer/bindpin
   */
  customerBindpinUpdate = (
    body: {
      /** 驗證碼 */
      code: string;
      /** 資金密碼 */
      pin: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        succeed?: boolean;
      },
      any
    >({
      path: `/ajax/customer/bindpin`,
      method: "PUT",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerInfoList
   * @request GET:/ajax/customer/info
   */
  customerInfoList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 頭像 */
        avatar?: string;
        /**
         * 玩家Id
         * @format uint64
         */
        customerId?: number;
        /** 信箱 */
        email?: string;
        /** 語系 */
        language?: string;
        /** 資金密碼 */
        pin?: string;
        /**
         * 產品Id
         * @format uint64
         */
        productId?: number;
        /** 用戶分享推薦代碼 */
        referralCode?: string;
      },
      any
    >({
      path: `/ajax/customer/info`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerLocaleUpdate
   * @request PUT:/ajax/customer/locale
   */
  customerLocaleUpdate = (
    body: {
      /** 語系 */
      locale?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        succeed?: boolean;
      },
      any
    >({
      path: `/ajax/customer/locale`,
      method: "PUT",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerLoginCreate
   * @request POST:/ajax/customer/login
   */
  customerLoginCreate = (
    body: {
      /** 使用者頭像 */
      avatar?: string;
      /** 裝置類型, 如:Mini App, Web */
      device?: string;
      /**
       * 裝置設備號
       * @maxLength 50
       */
      deviceId: string;
      /** first_name */
      firstName?: string;
      /**
       * Telegram id
       * @format int64
       */
      id?: number;
      /** language_code */
      languageCode?: string;
      /** last_name */
      lastName?: string;
      /**
       * 操作裝置系統, 如Android, Ios, Windows, MacOS
       * @maxLength 15
       */
      os: string;
      /**
       * 產品Id
       * @format uint64
       * @min 1
       */
      productId: number;
      /** 用戶分享推薦代碼 */
      referralCode?: string;
      /** username */
      userName?: string;
      /**
       * 前端版本號
       * @maxLength 15
       */
      version: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        /** 登入token */
        token?: string;
      },
      any
    >({
      path: `/ajax/customer/login`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerShareCreate
   * @request POST:/ajax/customer/share
   */
  customerShareCreate = (
    body: {
      /** 用戶分享時使用的推薦代碼 */
      referralCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<any, any>({
      path: `/ajax/customer/share`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerTeamInfoList
   * @request GET:/ajax/customer/team/info
   */
  customerTeamInfoList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /**
         * 團隊星等
         * @format int64
         */
        class?: number;
        /**
         * 邀請人數
         * @format int64
         */
        inviteSize?: number;
        /**
         * 團隊人數
         * @format int64
         */
        teamSize?: number;
        /** 今日反佣 */
        todayCommission?: string;
        /** 生涯總投注 */
        totalBets?: string;
        /** 生涯反佣 */
        totalCommission?: string;
        /** 生涯總入金 */
        totalDeposit?: string;
        /**
         * 邀請有效人數
         * @format int64
         */
        validSize?: number;
      },
      any
    >({
      path: `/ajax/customer/team/info`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerTeamPerformanceList
   * @request GET:/ajax/customer/team/performance
   */
  customerTeamPerformanceList = (
    query?: {
      sortField?: string;
      /** 排序方向,true為升冪 */
      sortOrder?: boolean;
      /** 團員名稱 */
      name?: string;
      /**
       * 團員等級
       * @format int64
       */
      level?: number;
      /**
       * 頁接續起始定位,取下頁時在搜尋條件帶回前次最後一條資料的anchorPoint做為定位
       * @format int64
       */
      anchorPoint?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        /**
         * 回傳使用定位
         * @format int64
         */
        anchorPoint?: number;
        /** 資料 */
        data?: {
          /**
           * 下頁定位,取下頁時在搜尋條件帶回前次最後一條資料的anchorPoint做為定位
           * @format int64
           */
          anchorPoint?: number;
          /**
           * 團員等級
           * @format int64
           */
          lv?: number;
          /** 團員名稱 */
          name?: string;
          /** 有效投注 */
          totalBets?: string;
          /** 反佣 */
          totalDeposits?: string;
        }[];
        /** 總計欄位 */
        summary?: {
          /**
           * 篩選後會員數
           * @format int64
           */
          teamSize?: number;
          /** 總投注加總 */
          totalBets?: string;
          /** 總入金加總 */
          totalDeposit?: string;
        };
      },
      any
    >({
      path: `/ajax/customer/team/performance`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerValidcodeCreate
   * @request POST:/ajax/customer/validcode
   */
  customerValidcodeCreate = (
    body: {
      /**
       * 收信信箱
       * @format email
       */
      email: string;
      /**
       * 驗證類型
       * @format int64
       * @min 0
       */
      kind?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        succeed?: boolean;
      },
      any
    >({
      path: `/ajax/customer/validcode`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*CustomerController)
   * @name CustomerVerifycodeCreate
   * @request POST:/ajax/customer/verifycode
   */
  customerVerifycodeCreate = (
    body: {
      /** 驗證碼 */
      code: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        succeed?: boolean;
      },
      any
    >({
      path: `/ajax/customer/verifycode`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
}
