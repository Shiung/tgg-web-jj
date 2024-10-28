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

import {
  WalletDepositCreatePayload,
  WalletHistoryListListParams,
  WalletTransferCreatePayload,
  WalletWithdrawCreatePayload,
} from "./data-contracts";
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
  walletDepositCreate = (body: WalletDepositCreatePayload, params: RequestParams = {}) =>
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
          switch?: boolean | null;
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
   * @name WalletHistoryListList
   * @request GET:/ajax/wallet/history/list
   */
  walletHistoryListList = (query: WalletHistoryListListParams, params: RequestParams = {}) =>
    this.http.request<
      {
        /** 帳變記錄列表 */
        list?: {
          /** 帳變金額 */
          amount: string;
          /** 交易備註 */
          comment?: string;
          /** 幣種 */
          currency: string;
          /**
           * 帳變時間
           * @format date-time
           */
          transactionTime: string;
          /** 交易類型. Allowed Enum */
          txType:
            | "omitempty"
            | "deposit"
            | "withdraw"
            | "swapBuy"
            | "swapSell"
            | "adjustCoin"
            | "adjustCrypto"
            | "bet"
            | "winLose"
            | "casualGameReward"
            | "casualGameTicket"
            | "betRankBonus"
            | "teamRankBonus"
            | "luckMoneyInvite"
            | "luckyMoneyCycleOpen"
            | "luckyMoneyCycleClose"
            | "smashEgg"
            | "luckMoneyDrop"
            | "dailyTask"
            | "oneTimeTask"
            | "specialTask"
            | "treasure"
            | "commission";
          /** 交易項目 Adjustment Bet Commission Deposit Game LuckyMoney Rank SmashEgg Swap(buy) Swap(sell) Task Treasure Withdraw Invite. Allowed Enum */
          type:
            | "Adjustment"
            | "Bet"
            | "Commission"
            | "Deposit"
            | "Game"
            | "LuckyMoney"
            | "Rank"
            | "SmashEgg"
            | "Swap(buy)"
            | "Swap(sell)"
            | "Task"
            | "Treasure"
            | "Withdraw"
            | "Invite";
        }[];
        /** 分頁資訊 */
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
      },
      any
    >({
      path: `/ajax/wallet/history/list`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*WalletController)
   * @name WalletListList
   * @request GET:/ajax/wallet/list
   */
  walletListList = (params: RequestParams = {}) =>
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
        withdrawingCount?: number | null;
      },
      any
    >({
      path: `/ajax/wallet/list`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*TransferController)
   * @name WalletTransferCreate
   * @request POST:/ajax/wallet/transfer
   */
  walletTransferCreate = (body: WalletTransferCreatePayload, params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/ajax/wallet/transfer`,
      method: "POST",
      body: body,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*TransferController)
   * @name WalletTransferRateList
   * @request GET:/ajax/wallet/transfer/rate
   */
  walletTransferRateList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /**
         * 最大買入平台幣數量
         * @format uint64
         */
        depositPCoinMaximum: number;
        /**
         * 最小買入平台幣數量
         * @format uint64
         */
        depositPCoinMinimum: number;
        /**
         * 轉USDT匯率
         * @format decimal
         */
        depositRate: string;
        /** 買入快捷設定 */
        depositSpeedAmount: number[];
        /**
         * USDT轉平台幣匯率
         * @format decimal
         */
        usdt2PCoinRate: string;
        /**
         * 最大賣出平台幣數量
         * @format uint64
         */
        withdrawPCoinMaximum: number;
        /**
         * 最小賣出平台幣數量
         * @format uint64
         */
        withdrawPCoinMinimum: number;
        /**
         * USDT轉換匯率
         * @format decimal
         */
        withdrawRate: string;
        /** 賣出快捷設定 */
        withdrawSpeedAmount: number[];
      },
      any
    >({
      path: `/ajax/wallet/transfer/rate`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*WithdrawController)
   * @name WalletWithdrawCreate
   * @request POST:/ajax/wallet/withdraw
   */
  walletWithdrawCreate = (body: WalletWithdrawCreatePayload, params: RequestParams = {}) =>
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
          switch?: boolean | null;
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
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*WithdrawController)
   * @name WalletWithdrawingListList
   * @request GET:/ajax/wallet/withdrawing/list
   */
  walletWithdrawingListList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 申請中提現列表 */
        list: {
          /** 申請提現的地址 */
          address: string;
          /** 申請金額 */
          applyAmount: string;
          /** 申請提現幣種. Allowed Enum */
          currency: "TON" | "USDT";
          /** 申請時填的備註 */
          memo?: string;
          /**
           * 申請時間
           * @format date-time
           */
          submissionTime: string;
        }[];
      },
      any
    >({
      path: `/ajax/wallet/withdrawing/list`,
      method: "GET",
      ...params,
    });
}
