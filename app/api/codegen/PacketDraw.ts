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

export class PacketDraw<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*PacketController)
   * @name PacketDrawCreate
   * @request POST:/ajax/packet-draw
   */
  packetDrawCreate = (body: object, params: RequestParams = {}) =>
    this.http.request<
      {
        /** 中獎金額 */
        amount?: string;
        /** 中獎幣別 */
        currency?: string;
        /** 是否中獎 */
        isWinned?: boolean;
      },
      any
    >({
      path: `/ajax/packet-draw`,
      method: "POST",
      body: body,
      ...params,
    });
}
