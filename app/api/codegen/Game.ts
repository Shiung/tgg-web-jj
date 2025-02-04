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

import { GameEnergyUpdatePayload, GameTransactionsListParams } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Game<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*GameController)
   * @name GameEnergyList
   * @request GET:/ajax/game/energy
   */
  gameEnergyList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** @format uint64 */
        amount: number;
      },
      any
    >({
      path: `/ajax/game/energy`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*GameController)
   * @name GameEnergyUpdate
   * @request PUT:/ajax/game/energy
   */
  gameEnergyUpdate = (body: GameEnergyUpdatePayload, params: RequestParams = {}) =>
    this.http.request<
      {
        balance: string;
        currency: string;
      },
      any
    >({
      path: `/ajax/game/energy`,
      method: "PUT",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*GameController)
   * @name GameSettingList
   * @request GET:/ajax/game/setting
   */
  gameSettingList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /**
         * 次數用盡後每次花費
         * @format uint64
         * @min 0
         */
        costPerGame: number;
        /**
         * 免費能量次數
         * @format uint64
         * @min 0
         */
        freeEnergyAmount: number;
        /**
         * 獎勵提現流水 (0或正整數)
         * @format uint64
         * @min 0
         */
        withdrawWaterRate: number;
      },
      any
    >({
      path: `/ajax/game/setting`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*GameController)
   * @name GameTransactionsList
   * @request GET:/ajax/game/transactions
   */
  gameTransactionsList = (query: GameTransactionsListParams, params: RequestParams = {}) =>
    this.http.request<
      {
        /** 分頁 */
        pagination?: {
          /**
           * 分頁筆數
           * @format int64
           * @min 20
           */
          pageSize: number;
          /**
           * 總頁數
           * @format int64
           * @min 0
           */
          totalPage?: number | null;
          /**
           * 總筆數
           * @format int64
           * @min 0
           */
          totalRecord?: number | null;
        };
        records?: ({
          /** 投注金額 */
          betGold: string;
          /** 投注金額(平台幣) */
          betGoldPCoin: string;
          /**
           * 投注時間
           * @format date-time
           */
          betTime: string;
          /**
           * 遊戲id
           * @format uint64
           */
          subGameId: number;
          /** 投注單號 */
          transactionId: string;
          /** 派彩金額 */
          winGold: string;
          /** 派彩金額(平台幣) */
          winGoldPCoin: string;
        } | null)[];
        /** 統計 */
        summary?: {
          /** 總投注金額 */
          totalBetGold: string;
          /** 總投注金額(平台幣) */
          totalBetGoldPCoin: string;
          /** 總派彩金額 */
          totalWinGold: string;
          /** 總派彩金額(平台幣) */
          totalWinGoldPCoin: string;
        };
      },
      any
    >({
      path: `/ajax/game/transactions`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*GameController)
   * @name GameWalletList
   * @request GET:/ajax/game/wallet
   */
  gameWalletList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 餘額 */
        balance: string;
        /** 幣種 */
        currency: string;
        /** 平台幣餘額 */
        pCoinBalance: string;
      },
      any
    >({
      path: `/ajax/game/wallet`,
      method: "GET",
      ...params,
    });
}
