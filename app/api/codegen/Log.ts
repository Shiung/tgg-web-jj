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

export class Log<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags sys
   * @name GetLog
   * @request GET:/_sys/log
   */
  getLog = (params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/_sys/log`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags sys
   * @name PutLog
   * @request PUT:/_sys/log/{level}
   */
  putLog = (level: string, params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/_sys/log/${level}`,
      method: "PUT",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags sys
   * @name PutLog2
   * @request PUT:/_sys/log/{level}/{duration}
   * @originalName putLog
   * @duplicate
   */
  putLog2 = (level: string, duration: string, params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/_sys/log/${level}/${duration}`,
      method: "PUT",
      ...params,
    });
}
