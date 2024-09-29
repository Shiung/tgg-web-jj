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

export class Header<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*WalletController)
   * @name HeaderWalletList
   * @request GET:/ajax/header/wallet
   */
  headerWalletList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /**
         * 會員id
         * @format uint64
         */
        memberId: number;
        /**
         * 產品id
         * @format uint64
         */
        productId: number;
        /** 有效餘額總計(USDT) */
        totalBalanceInUsdt: string;
        /** 各幣別錢包 */
        wallets?: {
          /** 可用餘額，已扣除凍結資金 */
          balance: string;
          /** 可用餘額Usdt，已扣除凍結資金 */
          balanceUsdt: string;
          /** 幣別 */
          currency: string;
          /** 凍結資金 */
          frozenFunds: string;
          /**
           * 錢包id
           * @format uint64
           */
          id: number;
        }[];
      },
      any
    >({
      path: `/ajax/header/wallet`,
      method: "GET",
      ...params,
    });
}
