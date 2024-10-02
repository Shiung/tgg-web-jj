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

export class Task<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*TaskController)
   * @name TaskOpenLinkIdCreate
   * @request POST:/ajax/task/open-link/id/{id}
   */
  taskOpenLinkIdCreate = (id: string, params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/ajax/task/open-link/id/${id}`,
      method: "POST",
      ...params,
    });
}
