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

export interface CommissionListRequest {
  /** 玩家名稱 */
  DisplayName?: string;
  /** @format date-time */
  EndTime: string;
  /**
   * 玩家差距層級
   * @format int64
   */
  Level?: number;
  /**
   * 分頁頁數
   * @format int64
   * @min 1
   */
  Page: number;
  /**
   * 分頁筆數
   * @format int64
   * @min 20
   */
  PageSize: number;
  /** @format date-time */
  StartTime: string;
}

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
  /** 總計 */
  summary?: {
    /** 總下注金額 */
    totalBet?: string;
    /** 總反佣金額 */
    totalCommission?: string;
    /**
     * 總筆數
     * @format int64
     */
    totalCount?: number;
  };
}

export type DepositRequest = object;

export interface DepositResponse {
  /** ton交易的備註欄位，必填 */
  comment: string;
  /** 充值地址 */
  depositAddress: string;
}

export interface DepositSettingGetResponse {
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
}

export interface EnterGameRequest {
  currency: string;
  language: string;
}

export interface EnterGameResponse {
  gameUrl: string;
}

export interface GetEnergyResponse {
  /** @format uint64 */
  amount: number;
}

export interface HeaderWalletResponse {
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

export interface ListGameTransactionRequest {
  /** @format date-time */
  EndTime: string;
  /** @format uint64 */
  GameId: number;
  /**
   * 分頁頁數
   * @format int64
   * @min 1
   */
  Page: number;
  /**
   * 分頁筆數
   * @format int64
   * @min 20
   */
  PageSize: number;
  /** @format date-time */
  StartTime: string;
}

export interface ListGameTransactionResponse {
  /**
   * 分頁筆數
   * @format int64
   * @min 20
   */
  pageSize: number;
  records?: ({
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
  } | null)[];
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
   * @min 0
   */
  kind?: number;
}

export interface ValidCodeResponse {
  succeed?: boolean;
}

export interface VerifyCodeRequest {
  /** 驗證碼 */
  code: string;
}

export interface VerifyCodeResponse {
  succeed?: boolean;
}

export interface WalletInfoRequest {
  /** 幣別(選填) */
  Currency?: string;
}

export interface WalletListResponse {
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

export interface WithdrawSettingGetResponse {
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
}
