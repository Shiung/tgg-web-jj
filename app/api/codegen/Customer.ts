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
        /** 玩家Id */
        customerId?: string;
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
      id: number;
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
      /** 推薦轉介碼 */
      startapp?: string;
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
