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

export class Games<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*VenueController)
   * @name GamesEnterCreate
   * @request POST:/ajax/games/{id}/enter
   */
  gamesEnterCreate = (
    id: string,
    body: {
      currency: string;
      ip: string;
      language: string;
      /** @format uint64 */
      playerId?: number;
      /** @format uint64 */
      productId?: number;
      /** @format uint64 */
      subGameId?: number;
      /** @format uint64 */
      venueId: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        gameUrl: string;
      },
      any
    >({
      path: `/ajax/games/${id}/enter`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
}
