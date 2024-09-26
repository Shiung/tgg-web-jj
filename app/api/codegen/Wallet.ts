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

import { DepositRequest } from "./data-contracts";
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
  walletDepositCreate = (body: DepositRequest, params: RequestParams = {}) =>
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
   * @tags (*DepositController)
   * @name WalletDepositSettingList
   * @request GET:/ajax/wallet/deposit/setting
   */
  walletDepositSettingList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 充值設置列表 */
        settings: {
          /** 區塊鏈網路 TON */
          chainNet: string;
          /** 幣種 TON USDT */
          currency: string;
          /** 快選金額 */
          presentAmounts: string[];
          /** 開關 */
          switch: boolean;
        }[];
      },
      any
    >({
      path: `/ajax/wallet/deposit/setting`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*WalletController)
   * @name WalletListList
   * @request GET:/ajax/wallet/list
   */
  walletListList = (
    query?: {
      /** 幣別(選填) */
      currency?: string;
    },
    params: RequestParams = {},
  ) =>
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
        /**
         * 進行中提款單數量
         * @format int64
         * @min 0
         */
        withdrawingCount: number;
      },
      any
    >({
      path: `/ajax/wallet/list`,
      method: "GET",
      query: query,
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
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*WithdrawController)
   * @name WalletWithdrawSettingList
   * @request GET:/ajax/wallet/withdraw/setting
   */
  walletWithdrawSettingList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 提現設置列表 */
        settings: {
          /**
           * 今日已申請次數
           * @format int64
           */
          appliedTimes?: number;
          /** 可提現金額(已扣除提現流水) */
          availableForWithdraw: string;
          /** 區塊鏈網路 TON */
          chainNet: string;
          /** 幣種 TON USDT */
          currency: string;
          /** 每日提現上限金額 */
          dailyLimitAmount: string;
          /**
           * 每日提現上限次數
           * @format int64
           */
          dailyLimitTimes?: number;
          /** 手續費設定值 */
          feeSettingValue: string;
          /** 手續費類型 fixed:固定金額 percentage:百分比 */
          feeType: string;
          /** 最高提領金額 */
          maximumAmount: string;
          /** 最低提領金額 */
          minimumAmount: string;
          /** 快選金額 */
          presentAmounts: string[];
          /** 開關 */
          switch: boolean;
          /** 今日已申請金額 */
          usedAmount: string;
          /** 提現流水 */
          wagerRequirement?: string;
        }[];
      },
      any
    >({
      path: `/ajax/wallet/withdraw/setting`,
      method: "GET",
      ...params,
    });
}
