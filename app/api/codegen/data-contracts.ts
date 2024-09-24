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

export interface BindEmailRequest {
  /** 驗證碼 */
  code: string;
  /**
   * 收信信箱
   * @format email
   */
  email: string;
}

export interface BindEmailResponse {
  succeed?: boolean;
}

export interface BindPinRequest {
  /** 驗證碼 */
  code: string;
  /** 資金密碼 */
  pin: string;
}

export interface BindPinResponse {
  succeed?: boolean;
}

export interface BuyEnergyRequest {
  /** @format uint64 */
  gameId: number;
}

export interface BuyEnergyResponse {
  balance: string;
  currency: string;
}

export type CommissionListRequest = object;

export interface CommissionListResponse {
  /** 佣金明細 */
  list?: {
    /** 有效投注金額 */
    betAmount?: string;
    /** 反佣金額 */
    commissionAmount?: string;
    /** 玩家名稱 */
    displayName?: string;
    /**
     * 玩家差距層級
     * @format int64
     */
    level?: number;
    /**
     * 玩家Id
     * @format uint64
     */
    memberId?: number;
    /**
     * 佣金發放狀態
     * @format int64
     */
    sendStatus?: number;
  }[];
}

export type DepositRequest = object;

export interface DepositResponse {
  /** ton交易的備註欄位，必填 */
  comment: string;
  /** 充值地址 */
  depositAddress: string;
}

export interface EnterGameRequest {
  currency: string;
  ip: string;
  language: string;
  /** @format uint64 */
  venueId: number;
}

export interface EnterGameResponse {
  gameUrl: string;
}

export interface GetEnergyResponse {
  /** @format uint64 */
  amount: number;
}

export type InfoRequest = object;

export interface InfoResponse {
  /** 頭像 */
  avatar?: string;
  /** 玩家Id */
  customerId?: string;
  /** 信箱 */
  email?: string;
  /** 語系 */
  language?: string;
  /** 資金密碼 */
  pin?: string;
  /**
   * 產品Id
   * @format uint64
   */
  productId?: number;
}

export type ListGameTransactionRequest = object;

export interface ListGameTransactionResponse {
  pagination?: {
    /**
     * @format int64
     * @min 20
     */
    pageSize: number;
    /**
     * @format int64
     * @min 0
     */
    totalPage: number;
    /**
     * @format int64
     * @min 0
     */
    totalRecord: number;
  };
  records?: {
    /** 投注金額 */
    betGold: string;
    /** 投注金額(KOKON) */
    betGoldKokon: string;
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
    /** 輸贏金額 */
    winGold: string;
    /** 輸贏金額(KOKON) */
    winGoldKokon: string;
  }[];
}

export interface LoginRequest {
  /** 使用者頭像 */
  avatar?: string;
  /** 裝置類型, 如:Mini App, Web */
  device?: string;
  /**
   * 裝置設備號
   * @maxLength 50
   */
  deviceId: string;
  /** first_name */
  firstName?: string;
  /**
   * Telegram id
   * @format int64
   */
  id: number;
  /** language_code */
  languageCode?: string;
  /** last_name */
  lastName?: string;
  /**
   * 操作裝置系統, 如Android, Ios, Windows, MacOS
   * @maxLength 15
   */
  os: string;
  /**
   * 產品Id
   * @format uint64
   * @min 1
   */
  productId: number;
  /** 推薦轉介碼 */
  startapp?: string;
  /** username */
  userName?: string;
  /**
   * 前端版本號
   * @maxLength 15
   */
  version: string;
}

export interface LoginResponse {
  /** 登入token */
  token?: string;
}

export interface SettingResponse {
  /** 升等設定 */
  classSetting?: {
    /**
     * 團隊有效用戶人數
     * @format int64
     */
    activeMember: number;
    /**
     * 星等
     * @format int64
     * @min 2
     */
    class: number;
    /** 團隊總投注 */
    totalBet: string;
    /** 團隊總充值 */
    totalDeposit: string;
  }[];
  /** 佣金設定 */
  commissionSetting?: {
    /**
     * 星等
     * @format int64
     * @min 1
     */
    class: number;
    /** 一級佣金比例 */
    level1: string;
    /** 二級佣金比例 */
    level2: string;
    /** 三級佣金比例 */
    level3: string;
    /** 四級佣金比例 */
    level4: string;
  }[];
}

export interface UpdateLocaleRequest {
  /** 語系 */
  locale?: string;
}

export interface UpdateLocaleResponse {
  succeed?: boolean;
}

export interface ValidCodeRequest {
  /**
   * 收信信箱
   * @format email
   */
  email: string;
  /**
   * 驗證類型
   * @format int64
   */
  kind?: number;
}

export interface ValidCodeResponse {
  succeed?: boolean;
}

export type WalletInfoRequest = object;

export interface WalletInfoResponse {
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
  wallets: {
    /** 可用餘額，已扣除凍結資金 */
    balance: string;
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
}

export interface WithdrawRequest {
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
}

export interface WithdrawResponse {
  /**
   * 提款單id
   * @format uint64
   */
  withdrawId: number;
}
