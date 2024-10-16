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

import { GamesEnterCreatePayload } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Games<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*SubGameController)
   * @name GamesList
   * @request GET:/ajax/games
   */
  gamesList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 列表 */
        list: {
          /**
           * 遊戲ID
           * @min 1
           * @max 50
           */
          gameCode: string;
          /**
           * 遊戲Logo
           * @min 1
           * @max 200
           */
          gameLogo: string;
          /**
           * 遊戲名稱
           * @min 1
           * @max 50
           */
          gameName: string;
          /**
           * 遊戲類型
           * @format uint64
           */
          gameType: number;
          /**
           * SubGameID
           * @format uint64
           */
          id: number;
          /**
           * 維護狀態,1:維護中 2:非維護中 3:預約維護
           * @format uint64
           */
          isGameMaintain: number;
          /**
           * 維護結束時間
           * @format date-time
           */
          maintainEndAt?: string;
          /**
           * 維護開始時間
           * @format date-time
           */
          maintainStartAt?: string;
          /** 語言翻譯 */
          translations: ({
            /**
             * 遊戲名稱
             * @min 0
             * @max 50
             */
            gameName?: string;
            /** 語言代碼ex: 'en','ja','ko','ar','es','fr'. Allowed Enum */
            language: "en" | "ja" | "ko" | "ar" | "es" | "fr";
          } | null)[];
        }[];
      },
      any
    >({
      path: `/ajax/games`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*SubGameController)
   * @name GamesActiveList
   * @request GET:/ajax/games/active
   */
  gamesActiveList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 列表 */
        list: {
          /**
           * 遊戲ID
           * @min 1
           * @max 50
           */
          gameCode: string;
          /**
           * 遊戲Logo
           * @min 1
           * @max 200
           */
          gameLogo: string;
          /**
           * 遊戲名稱
           * @min 1
           * @max 50
           */
          gameName: string;
          /**
           * 遊戲類型
           * @format uint64
           */
          gameType: number;
          /**
           * SubGameID
           * @format uint64
           */
          id: number;
          /**
           * 維護狀態,1:維護中 2:非維護中 3:預約維護
           * @format uint64
           */
          isGameMaintain: number;
          /**
           * 維護結束時間
           * @format date-time
           */
          maintainEndAt?: string;
          /**
           * 維護開始時間
           * @format date-time
           */
          maintainStartAt?: string;
          /** 語言翻譯 */
          translations: ({
            /**
             * 遊戲名稱
             * @min 0
             * @max 50
             */
            gameName?: string;
            /** 語言代碼ex: 'en','ja','ko','ar','es','fr'. Allowed Enum */
            language: "en" | "ja" | "ko" | "ar" | "es" | "fr";
          } | null)[];
        }[];
      },
      any
    >({
      path: `/ajax/games/active`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*GameController)
   * @name GamesEnterCreate
   * @request POST:/ajax/games/{id}/enter
   */
  gamesEnterCreate = (id: string, body: GamesEnterCreatePayload, params: RequestParams = {}) =>
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
