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

export class Cache<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags sys
   * @name CacheList
   * @request GET:/_sys/cache
   */
  cacheList = (params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/_sys/cache`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags sys
   * @name CacheDetail
   * @request GET:/_sys/cache/{name}/{key}
   */
  cacheDetail = (name: string, key: string, params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/_sys/cache/${name}/${key}`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags sys
   * @name CacheDelete
   * @request DELETE:/_sys/cache/{name}/{key}
   */
  cacheDelete = (name: string, key: string, params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/_sys/cache/${name}/${key}`,
      method: "DELETE",
      ...params,
    });
}
