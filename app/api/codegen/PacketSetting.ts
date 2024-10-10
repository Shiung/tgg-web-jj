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

export class PacketSetting<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*PacketController)
   * @name PacketSettingList
   * @request GET:/ajax/packet-setting
   */
  packetSettingList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /**
         * 金額下限
         * @format decimal
         */
        minValue?: string;
        /** 快捷金額 */
        shortcuts?: string[];
      },
      any
    >({
      path: `/ajax/packet-setting`,
      method: "GET",
      ...params,
    });
}
