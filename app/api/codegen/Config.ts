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

export class Config<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*TelegramController)
   * @name ConfigTelegramList
   * @request GET:/ajax/config/telegram
   */
  configTelegramList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** telegram app name */
        appName?: string;
        /** telegram bot id */
        botId?: string;
        /** telegram bot name */
        botName?: string;
      },
      any
    >({
      path: `/ajax/config/telegram`,
      method: "GET",
      ...params,
    });
}
