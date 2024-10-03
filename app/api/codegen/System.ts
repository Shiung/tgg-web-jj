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

export class System<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*MaintenanceController)
   * @name SystemMaintenanceList
   * @request GET:/ajax/system/maintenance
   */
  systemMaintenanceList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /**
         * 預約維護開始時間
         * @format date-time
         */
        endTime?: string | null;
        /** 是否正在維護中 */
        maintenance?: boolean;
        /**
         * 預約維護開始時間
         * @format date-time
         */
        startTime?: string | null;
      },
      any
    >({
      path: `/ajax/system/maintenance`,
      method: "GET",
      ...params,
    });
}
