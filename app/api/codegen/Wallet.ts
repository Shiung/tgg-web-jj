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

import { CommissionListRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Wallet<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*DepositController)
   * @name WalletDepositCreate
   * @request POST:/ajax/wallet/deposit
   */
  walletDepositCreate = (body: CommissionListRequest, params: RequestParams = {}) =>
    this.http.request<
      {
        /** ton交易的備註欄位，必填 */
        comment: string;
        /** 充值地址 */
        depositAddress: string;
      },
      any
    >({
      path: `/ajax/wallet/deposit`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*WithdrawController)
   * @name WalletWithdrawCreate
   * @request POST:/ajax/wallet/withdraw
   */
  walletWithdrawCreate = (
    body: {
      /**
       * 申請金額. Greater than 0. Less than 10000000
       * @format decimal
       */
      amount: string;
      /** 區塊鏈網路，目前只有TON */
      chainNet: string;
      /** 幣別 */
      currency: string;
      /**
       * 自定義備註(選填)
       * @maxLength 100
       */
      memo?: string;
      /** 出款地址 */
      recipientAddress: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<
      {
        /**
         * 提款單id
         * @format uint64
         */
        withdrawId: number;
      },
      any
    >({
      path: `/ajax/wallet/withdraw`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
}
