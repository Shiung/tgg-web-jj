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

export interface CustomerWalletChangeGetRequest {
  /** 收支 Income Expense */
  Balance?: string;
  /** 幣種 TON USDT KOKON */
  Currency?: string;
  /**
   * 帳變時間(起日)
   * @format date-time
   */
  TransactionTimeFrom?: string | null;
  /**
   * 帳變時間(迄日)
   * @format date-time
   */
  TransactionTimeTo?: string | null;
  /** 交易類型 */
  TxCategory?: string;
}

export interface CustomerWalletChangeGetResponse {
  /** 帳變記錄列表 */
  list?: {
    /** 帳變類型 Adjustment Bet Commission Deposit Game LuckMoney Rank SmashEgg Swap(buy) Swap(sell) Task Treasure Withdraw */
    Type: string;
    /** 帳變金額 */
    amount: string;
    /** 幣種 */
    currency: string;
    /**
     * 帳變時間
     * @format date-time
     */
    transactionTime: string;
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
}

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
    switch?: boolean | null;
  }[];
}

export interface EnterGameRequest {
  currency: string;
  language: string;
}

export interface EnterGameResponse {
  gameUrl: string;
}

export type GetActiveGamesRequest = object;

export interface GetActiveGamesResponse {
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
}

export type GetAllGamesRequest = object;

export interface GetAllGamesResponse {
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
}

export interface GetEnergyResponse {
  /** @format uint64 */
  amount: number;
}

export interface GetRateResponse {
  /**
   * 轉USDT匯率
   * @format decimal
   */
  depositRate: string;
  /**
   * USDT轉KOKON匯率
   * @format decimal
   */
  usdt2KokonRate: string;
  /**
   * USDT轉換匯率
   * @format decimal
   */
  withdrawRate: string;
}

export interface GoldenEggClaimRequest {
  /** 領取ID */
  transactionId: string;
}

export interface GoldenEggSmashRequest {
  /** 金蛋等級:GOLD,SILVER,NORMAL */
  eggLevel: string;
}

export interface GoldenEggSmashResponse {
  /** 金蛋等級:GOLD,SILVER,NORMAL */
  eggLevel: string;
  /**
   * 進度
   * @format decimal
   */
  progress: string;
  /**
   * 獎勵
   * @format decimal
   */
  reward: string;
  /**
   * 總次數
   * @format uint64
   */
  totalCount: number;
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
  /**
   * 玩家Id
   * @format uint64
   */
  customerId?: number;
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
  /** 用戶分享推薦代碼 */
  referralCode?: string;
}

export interface ListGameTransactionRequest {
  /** @format date-time */
  EndTime: string;
  /** @format uint64 */
  GameId?: number;
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
  id?: number;
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
  /** 用戶分享推薦代碼 */
  referralCode?: string;
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

export type TeamInfoRequest = object;

export interface TeamInfoResponse {
  /**
   * 團隊星等
   * @format int64
   */
  class?: number;
  /**
   * 邀請人數
   * @format int64
   */
  inviteSize?: number;
  /**
   * 團隊人數
   * @format int64
   */
  teamSize?: number;
  /** 今日反佣 */
  todayCommission?: string;
  /** 生涯總投注 */
  totalBets?: string;
  /** 生涯反佣 */
  totalCommission?: string;
  /** 生涯總入金 */
  totalDeposit?: string;
  /**
   * 邀請有效人數
   * @format int64
   */
  validSize?: number;
}

export interface TeamPerformanceRequest {
  /**
   * 頁接續起始定位,取下頁時在搜尋條件帶回前次最後一條資料的anchorPoint做為定位
   * @format int64
   */
  AnchorPoint?: number;
  /**
   * 玩家Id
   * @format uint64
   */
  CustomerId?: number;
  /**
   * 團員等級
   * @format int64
   */
  Lv?: number;
  /** 團員名稱 */
  Name?: string;
  /** 排序欄位,可帶入lv,bet,deposit任一，未帶時預設lv+customer_id */
  SortField?: string;
  /** 排序方向,true為升冪 */
  SortOrder?: boolean;
}

export interface TeamPerformanceResponse {
  /**
   * 回傳使用定位
   * @format int64
   */
  anchorPoint?: number;
  /** 資料 */
  data?: {
    /**
     * 下頁定位,取下頁時在搜尋條件帶回前次最後一條資料的anchorPoint做為定位
     * @format int64
     */
    anchorPoint?: number;
    /**
     * 團員等級
     * @format int64
     */
    lv?: number;
    /** 團員名稱 */
    name?: string;
    /** 有效投注 */
    totalBets?: string;
    /** 反佣 */
    totalDeposits?: string;
  }[];
  /** 總計欄位 */
  summary?: {
    /**
     * 團隊人數
     * @format int64
     */
    teamSize?: number;
    /** 生涯總投注 */
    totalBets?: string;
    /** 生涯總入金 */
    totalDeposit?: string;
  };
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
  withdrawingCount?: number | null;
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
  /** 資金密碼 */
  fundPassword: string;
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
    switch?: boolean | null;
    /** 今日已申請金額 */
    usedAmount: string;
    /** 提現流水 */
    wagerRequirement?: string;
  }[];
}

export interface WithdrawingListResponse {
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
}
