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

export interface BCRankInfoRequest {
  /** 排行榜類型 */
  RankType: string;
}

export interface BCRankInfoResponse {
  /** 排行榜 */
  rank: {
    /** 會員名稱 */
    customerName: string;
    /**
     * 排名
     * @format int64
     * @min 1
     */
    ranking: number;
    /**
     * 獎金
     * @format decimal
     */
    reward?: string;
    /** 獎金幣別 */
    rewardType?: string;
    /**
     * 有效下注金額
     * @format decimal
     */
    validBetGold: string;
  }[];
  /** 自己排名 */
  selfRank?: {
    /** 會員名稱 */
    customerName: string;
    /**
     * 排名
     * @format int64
     * @min 1
     */
    ranking: number;
    /**
     * 獎金
     * @format decimal
     */
    reward?: string;
    /** 獎金幣別 */
    rewardType?: string;
    /**
     * 有效下注金額
     * @format decimal
     */
    validBetGold: string;
  };
}

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

export interface ClaimTaskRewardResponse {
  /**
   * 獎勵金額/數量
   * @format decimal
   */
  rewardAmount: string;
}

export type ClaimTreasureRequest = object;

export type ClaimTreasureResponse = object;

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
    /**
     * 創立時間
     * @format date-time
     */
    createTime?: string;
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

export interface CreateRequest {
  /** 紅包種類. Allowed Enum */
  distributeKind?: "FIXED" | "RANDOM";
  /**
   * 發放總金額
   * @format decimal
   */
  distributedAmount?: string;
  /**
   * 固定金額
   * @format decimal
   */
  fixedValue?: string;
  /**
   * 上限類型 0:個數 1:金額,若是FIXED發送類型時固定需為0). Allowed Enum
   * @format int64
   */
  limitKind?: 0 | 1;
  /**
   * 隨機金額上限
   * @format decimal
   */
  maxValue?: string;
  /**
   * 隨機金額下限
   * @format decimal
   */
  minValue?: string;
  /**
   * 數量
   * @format int64
   */
  quantity?: number;
  /**
   * 隨機奬勵預算
   * @format decimal
   */
  quota?: string;
}

export interface CreateResponse {
  /** 紅包推介碼 */
  referralCode?: string;
}

export interface CustomerWalletChangeGetRequest {
  /** 收支 Income Expense. Allowed Enum */
  Balance?: "Income" | "Expense";
  /** 幣種 TON USDT KOKON. Allowed Enum */
  Currency?: "TON" | "USDT" | "KOKON";
  /**
   * 頁碼
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
  /** 交易類型 Adjustment Bet Commission Deposit Game LuckyMoney Rank SmashEgg Swap(buy) Swap(sell) Task Treasure Withdraw. Allowed Enum */
  TxCategory?:
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
    | "Withdraw";
}

export interface CustomerWalletChangeGetResponse {
  /** 帳變記錄列表 */
  list?: {
    /** 帳變金額 */
    amount: string;
    /** 幣種 */
    currency: string;
    /**
     * 帳變時間
     * @format date-time
     */
    transactionTime: string;
    /** 交易類型 Adjustment Bet Commission Deposit Game LuckyMoney Rank SmashEgg Swap(buy) Swap(sell) Task Treasure Withdraw. Allowed Enum */
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
      | "Withdraw";
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

export interface DeleteUpgradeAnimationRequest {
  /**
   * 清除目標等級
   * @format int64
   * @min 2
   */
  finalClass?: number;
}

export interface DepositRequest {
  /** 申請的幣種 TON USDT. Allowed Enum */
  currency?: "TON" | "USDT";
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

export type DrawRequest = object;

export interface DrawResponse {
  /** 中獎金額 */
  amount?: string;
  /** 是否中獎 */
  isWinned?: boolean;
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
}

export interface GetEnergyResponse {
  /** @format uint64 */
  amount: number;
}

export type GetGameSettingRequest = object;

export interface GetGameSettingResponse {
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
}

export interface GetKokonWalletBalanceResponse {
  /** 餘額 */
  balance: string;
  /** 幣種 */
  currency: string;
  /** KOKON餘額 */
  kokonBalance: string;
}

export type GetKokonWalletRequest = object;

export type GetLogoRequest = object;

export interface GetLogoResponse {
  /** 圖片路徑 */
  image?: string;
}

export interface GetMaintenanceResponse {
  /**
   * 預約維護開始時間
   * @format date-time
   */
  endTime?: string | null;
  /** 是否正在維護中 */
  maintenance?: boolean;
  /**
   * 預約維護開始時間
   * @format date-time
   */
  startTime?: string | null;
}

export interface GetRateResponse {
  /**
   * 最大買入KOKON數量
   * @format uint64
   */
  depositKokonMaximum: number;
  /**
   * 最小買入KOKON數量
   * @format uint64
   */
  depositKokonMinimum: number;
  /**
   * 轉USDT匯率
   * @format decimal
   */
  depositRate: string;
  /** 買入快捷設定 */
  depositSpeedAmount: number[];
  /**
   * USDT轉KOKON匯率
   * @format decimal
   */
  usdt2KokonRate: string;
  /**
   * 最大賣出KOKON數量
   * @format uint64
   */
  withdrawKokonMaximum: number;
  /**
   * 最小賣出KOKON數量
   * @format uint64
   */
  withdrawKokonMinimum: number;
  /**
   * USDT轉換匯率
   * @format decimal
   */
  withdrawRate: string;
  /** 賣出快捷設定 */
  withdrawSpeedAmount: number[];
}

export type GetSettingRequest = object;

export interface GetSettingResponse {
  /**
   * 金額下限
   * @format decimal
   */
  minValue?: string;
  /** 快捷金額 */
  shortcuts?: string[];
}

export type GetTreasuresRequest = object;

export interface GetTreasuresResponse {
  /** 列表 */
  list: ({
    /**
     * 會員投注BC遊戲比例
     * @format decimal
     */
    betRequirement: string;
    /**
     * 創建時間(領取時間)
     * @format date-time
     */
    createdAt: string;
    /**
     * 直屬下線投注BC遊戲比例
     * @format decimal
     */
    directSubBetRequirement: string;
    /**
     * TreasureID
     * @format uint64
     */
    id: number;
    /**
     * 剩餘領取金額
     * @format decimal
     */
    remainingClaimAmount: string;
    /**
     * 剩餘解鎖金額
     * @format decimal
     */
    remainingUnlockAmount: string;
    /**
     * 獎勵金額
     * @format decimal
     */
    rewardAmount: string;
    /** 獎勵類型. Allowed Enum */
    rewardType: "USDT" | "TON" | "KOKON";
    /** 狀態: 待解鎖、解鎖中、已解鎖. Allowed Enum */
    status: "STANDBY" | "UNLOCKING" | "UNLOCKED";
  } | null)[];
}

export interface GoldenActivityInfoResponse {
  /** 獎池 */
  prizePool: {
    /**
     * 顯示獎池(Usdt) max
     * @format decimal
     */
    displayUsdtPrizeMax: string;
    /**
     * 顯示獎池(Usdt) min
     * @format decimal
     */
    displayUsdtPrizeMin: string;
    /** 金蛋等級:GOLD,SILVER,NORMAL */
    eggLevel: string;
    /**
     * 錘子數量
     * @format int64
     */
    hammerSpent: number;
  }[];
}

export interface GoldenEggClaimRequest {
  /** 領取ID */
  transactionId: string;
}

export interface GoldenEggInfoResponse {
  /**
   * 鐵錘數量
   * @format uint64
   */
  hammerRemaining?: number;
  /** 金蛋資訊 */
  record?: {
    /** 是否已領取 */
    claimed?: boolean;
    /** 金蛋等級 */
    eggLevel?: string;
    /** 玩法狀態:SUCCESS,PLAYING,FAILED */
    playStatus?: string;
    /**
     * 商品ID
     * @format uint64
     */
    productId?: number;
    /**
     * 破蛋進度
     * @format decimal
     */
    progress?: string;
    /**
     * 獎金金額
     * @format decimal
     */
    reward?: string;
    /**
     * 總共破蛋次數
     * @format uint64
     */
    totalCount?: number;
    /** 領取ID */
    transactionId?: string;
  } | null;
}

export interface GoldenEggMarqueeRequest {
  /**
   * 筆數
   * @format int64
   */
  Size: number;
}

export interface GoldenEggMarqueeResponse {
  /** 金蛋跑馬燈 */
  result: {
    /** 會員名稱 */
    customerName: string;
    /** 金蛋等級:GOLD,SILVER,NORMAL */
    eggLevel: string;
    /**
     * 獎金
     * @format decimal
     */
    reward: string;
  }[];
}

export interface GoldenEggSmashRequest {
  /** 金蛋等級:GOLD,SILVER,NORMAL */
  eggLevel: string;
}

export interface GoldenEggSmashResponse {
  /** 金蛋等級:GOLD,SILVER,NORMAL */
  eggLevel: string;
  /**
   * 鐵錘數量
   * @format uint64
   */
  hammerRemaining?: number;
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

export type HomeCarouselListRequest = object;

export interface HomeCarouselListResponse {
  /** 資料 */
  list?: ({
    /** @format uint64 */
    id?: number;
    /** 圖片網址 */
    image?: string;
    language?: {
      /** language code. Allowed Enum */
      code: "ar" | "en" | "es" | "fr" | "ja" | "ko";
      /**
       * @minLength 1
       * @maxLength 66
       */
      subTitle: string;
      /**
       * @minLength 1
       * @maxLength 33
       */
      title: string;
    }[];
    /** 廣告暱稱 */
    name?: string;
    /** 跳轉參數(redirectType=URL: 網址; redirectType=GAME: gameCode; redirectType=RANK: allianceRanking=联盟排行榜 bcRanking=BC排行榜; redirectType=TASK: taskEveryDay=每日任务 taskOneTime=单次任务 taskSpecial=特殊任务; redirectType=LEAGUE: x; redirectType=WALLET: deposit=充值 withdrawCash=提现 platformCurrencyTrade=平台币交易) */
    redirectConfig?: string;
    /** 跳轉類型. Allowed Enum */
    redirectType?: "URL" | "GAME" | "RANK" | "TASK" | "LEAGUE" | "WALLET";
  } | null)[];
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
  /** 推薦碼開獎資訊 */
  packet?: {
    /** 紅包發送人名稱 */
    giverName?: string;
    /** 為true時需開獎 */
    isQualified?: boolean;
    /** potential gain (max) */
    maxValue?: string;
    /** potential gain (min) */
    minValue?: string;
    /** 需顯示potential gain */
    showPotential?: boolean;
  };
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
    /** 派彩金額 */
    winGold: string;
    /** 派彩金額(KOKON) */
    winGoldKokon: string;
  } | null)[];
  /** 統計 */
  summary?: {
    /** 總投注金額 */
    totalBetGold: string;
    /** 總投注金額(KOKON) */
    totalBetGoldKokon: string;
    /** 總派彩金額 */
    totalWinGold: string;
    /** 總派彩金額(KOKON) */
    totalWinGoldKokon: string;
  };
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
  firstName: string;
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

export interface PacketRequest {
  /**
   * 頁碼
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
}

export interface PacketResponse {
  /**
   * 開始發放時間
   * @format date-time
   */
  createdAt?: string;
  /** 紅包種類. Allowed Enum */
  distributeKind?: "FIXED" | "RANDOM";
  /**
   * 已發放金額
   * @format decimal
   */
  distributedAmount?: string;
  /**
   * 已發放個數
   * @format int64
   */
  distributedQuantity?: number;
  /**
   * 固定金額
   * @format decimal
   */
  eachBagAmount?: string;
  /**
   * 隨機金額上限
   * @format decimal
   */
  maxBagAmount?: string;
  /**
   * 隨機金額下限
   * @format decimal
   */
  minBagAmount?: string;
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
  /** 領取人名單 */
  receiver?: {
    /** @format decimal */
    amount?: string;
    avatar?: string;
    name?: string;
  }[];
  /** 紅包推介碼 */
  referralCode?: string;
  /**
   * 目前餘額
   * @format decimal
   */
  remainingAmount?: string;
  /**
   * 未發放個數
   * @format int64
   */
  remainingQuantity?: number;
  /**
   * 總預算金額
   * @format decimal
   */
  withholdAmount?: string;
}

export interface PacketsRequest {
  /**
   * 頁碼
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
  /** 查詢狀態 1:進行中 2:已終止 3:已完成. Allowed Enum */
  States?: "1" | "2" | "3";
}

export interface PacketsResponse {
  /** 紅包列表 */
  list?: {
    /**
     * 開始發放時間
     * @format date-time
     */
    createdAt?: string;
    /** 紅包種類. Allowed Enum */
    distributeKind?: "FIXED" | "RANDOM";
    /**
     * 已發放金額
     * @format decimal
     */
    distributedAmount?: string;
    /** 紅包Id */
    packetId?: string;
    /**
     * 目前餘額
     * @format decimal
     */
    remainingAmount?: string;
    /**
     * 狀態 1:進行中 2:已終止(用戶提前中斷發放) 3:已完成(發放完畢)
     * @format int64
     */
    state?: number;
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

export interface PingResponse {
  succeed?: boolean;
}

export interface RankConfigResponse {
  /** BC每日排行榜 */
  bcRankDailyEntrance: boolean;
  /** BC每日排行榜獎金 */
  bcRankDailyReward: boolean;
  /** BC每月排行榜 */
  bcRankMonthlyEntrance: boolean;
  /** BC每月排行榜獎金 */
  bcRankMonthlyReward: boolean;
  /** BC每周排行榜 */
  bcRankWeeklyEntrance: boolean;
  /** BC每周排行榜獎金 */
  bcRankWeeklyReward: boolean;
  /** 分享排行榜 */
  shareRankEntrance: boolean;
  /** 分享排行榜獎金 */
  shareRankReward: boolean;
}

export interface SettingResponse {
  /**
   * 有效用戶設定
   * @minLength 1
   */
  activeSetting: string;
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
  }[];
}

export interface ShareLinkRequest {
  /** 用戶分享時使用的推薦代碼 */
  referralCode?: string;
}

export interface ShareRankInfoResponse {
  /** 排行榜 */
  rank: {
    /** 會員名稱 */
    customerName: string;
    /**
     * 排名
     * @format int64
     * @min 1
     */
    ranking: number;
    /**
     * 獎金
     * @format decimal
     */
    reward?: string;
    /** 獎金幣別 */
    rewardType?: string;
    /**
     * 直属下级人数
     * @format uint64
     */
    subordinatesCount?: number;
  }[];
  /** 自己排名 */
  selfRank?: {
    /** 會員名稱 */
    customerName: string;
    /**
     * 排名
     * @format int64
     * @min 1
     */
    ranking: number;
    /**
     * 獎金
     * @format decimal
     */
    reward?: string;
    /** 獎金幣別 */
    rewardType?: string;
    /**
     * 直属下级人数
     * @format uint64
     */
    subordinatesCount?: number;
  };
}

export interface TaskQueryResponse {
  /** 每日任務列表 */
  dailyList?: {
    /**
     * 累計值
     * @format decimal
     */
    accumulatedValue?: string;
    /** 行為條件. Allowed Enum */
    actionType:
      | "LOGIN"
      | "RECHARGE"
      | "INVITE_FRIENDS"
      | "TEAM_CLASS_ACHIEVEMENT"
      | "PLAY_GAMES"
      | "OPEN_LINK"
      | "TEAM_RECHARGE";
    /**
     * 結束時間, null代表無時間限制
     * @format date-time
     */
    endTime?: string | null;
    /** 任務ID */
    id: string;
    /** 邀請好友行為條件. Required if: ActionType INVITE_FRIENDS */
    inviteFriendsCondition?: {
      /**
       * 邀請數量
       * @format int64
       * @min 1
       */
      inviteCount: number;
      /** 普通邀请 or 红包邀请. Allowed Enum */
      parameterType: "NORMAL_SEND" | "RED_PACKET_SEND";
      /** 发送即生效 or 邀请注册 or 邀请有效用户. Allowed Enum */
      parameterValue: "ONLY_INVITE" | "INVITE_AND_REGISTER" | "INVITE_VALID_USER";
    } | null;
    /** 打開連結行為條件. Required if: ActionType OPEN_LINK */
    openLinkCondition?: {
      /** url link */
      parameterValue: string;
    } | null;
    /** 遊戲行為條件. Required if: ActionType PLAY_GAMES */
    playGameCondition?: {
      /** 休闲 or BC. Required if: ParameterType GAME_TYPE_COUNT. Allowed Enum */
      gameCategory?: "BC_GAME" | "CASUAL_GAME" | null;
      /**
       * 遊戲代碼. Required if: ParameterType SPECIFIC_GAME_COUNT
       * @minLength 1
       */
      gameCode?: string | null;
      /** 指定类型 or 指定游戏. Allowed Enum */
      parameterType: "GAME_TYPE_COUNT" | "SPECIFIC_GAME_COUNT";
      /**
       * 遊戲次數
       * @format int64
       * @min 1
       */
      playCount: number;
    };
    /** 充值行為條件. Required if: ActionType RECHARGE */
    rechargeCondition?: {
      /** 充值有效金额 or 充值次数. Allowed Enum */
      parameterType: "RECHARGE_AMOUNT" | "RECHARGE_COUNT";
      /**
       * 次數 or 金额. Greater than 0
       * @format decimal
       */
      parameterValue: string;
    } | null;
    /**
     * 獎勵金額/數量
     * @format decimal
     */
    rewardAmount: string;
    /**
     * 獎勵金額/數量上限, null代表無上限
     * @format decimal
     */
    rewardAmountLimit?: string | null;
    /** 任務領取狀態, INELIGIBLE: 不符合領取條件, WAITING_CLAIM: 可領取, CLAIMED: 已領取. Allowed Enum */
    rewardClaimStatus: "INELIGIBLE" | "WAITING_CLAIM" | "CLAIMED";
    /** 獎勵類型. Allowed Enum */
    rewardType: "USDT" | "TON" | "KOKON" | "HAMMER" | "TREASURE";
    /**
     * 開始時間
     * @format date-time
     */
    startTime: string;
    /** 任務名稱 */
    taskName: string;
    /** 任務類型. Allowed Enum */
    taskType: "DAILY" | "ONE_TIME" | "SPECIAL";
    /** 團隊等級行為條件. Required if: ActionType TEAM_CLASS_ACHIEVEMENT */
    teamClassCondition?: {
      /**
       * 团队等级. Allowed Enum
       * @min 1
       * @max 5
       */
      teamClass?: "CLASS_1" | "CLASS_2" | "CLASS_3" | "CLASS_4" | "CLASS_5";
    } | null;
    /** 團隊等級獎勵設定. Required if: ActionType TEAM_CLASS_ACHIEVEMENT */
    teamClassRewardSetting?: {
      /**
       * class1
       * @format decimal
       */
      class1Amount?: string | null;
      /**
       * class2
       * @format decimal
       */
      class2Amount?: string | null;
      /**
       * class3
       * @format decimal
       */
      class3Amount?: string | null;
      /**
       * class4
       * @format decimal
       */
      class4Amount?: string | null;
      /**
       * class5
       * @format decimal
       */
      class5Amount?: string | null;
    };
    /** 團隊充值行為條件. Required if: ActionType TEAM_RECHARGE */
    teamRechargeCondition?: {
      /**
       * 總充值金額. Greater than 0
       * @format decimal
       */
      depositAmount: string;
      /** 团队总充值 or 直属下级总充值. Allowed Enum */
      parameterType: "TEAM_RECHARGE_AMOUNT" | "DIRECT_SUBORDINATE_RECHARGE_AMOUNT";
    } | null;
    /** 寶箱設定. Required if: RewardType TREASURE */
    treasureSetting?: {
      /**
       * 会员投注BC游戏
       * @format decimal
       */
      betRequirement?: string | null;
      /**
       * 直属下级投注BC游戏
       * @format decimal
       */
      directSubBetRequirement?: string | null;
      /** 發放機制, RANDOM: 隨機, FIXED: 固定. Allowed Enum */
      distributionMethod: "RANDOM" | "FIXED";
      /**
       * 固定金额
       * @format decimal
       */
      fixedAmount?: string | null;
      /**
       * 最大金额
       * @format decimal
       */
      maxAmount?: string | null;
      /**
       * 最小金额
       * @format decimal
       */
      minAmount?: string | null;
      /** 獎勵類型. Allowed Enum */
      rewardType: "USDT" | "TON" | "KOKON";
    };
  }[];
  /** 一次性任務列表 */
  oneTimeList?: {
    /**
     * 累計值
     * @format decimal
     */
    accumulatedValue?: string;
    /** 行為條件. Allowed Enum */
    actionType:
      | "LOGIN"
      | "RECHARGE"
      | "INVITE_FRIENDS"
      | "TEAM_CLASS_ACHIEVEMENT"
      | "PLAY_GAMES"
      | "OPEN_LINK"
      | "TEAM_RECHARGE";
    /**
     * 結束時間, null代表無時間限制
     * @format date-time
     */
    endTime?: string | null;
    /** 任務ID */
    id: string;
    /** 邀請好友行為條件. Required if: ActionType INVITE_FRIENDS */
    inviteFriendsCondition?: {
      /**
       * 邀請數量
       * @format int64
       * @min 1
       */
      inviteCount: number;
      /** 普通邀请 or 红包邀请. Allowed Enum */
      parameterType: "NORMAL_SEND" | "RED_PACKET_SEND";
      /** 发送即生效 or 邀请注册 or 邀请有效用户. Allowed Enum */
      parameterValue: "ONLY_INVITE" | "INVITE_AND_REGISTER" | "INVITE_VALID_USER";
    } | null;
    /** 打開連結行為條件. Required if: ActionType OPEN_LINK */
    openLinkCondition?: {
      /** url link */
      parameterValue: string;
    } | null;
    /** 遊戲行為條件. Required if: ActionType PLAY_GAMES */
    playGameCondition?: {
      /** 休闲 or BC. Required if: ParameterType GAME_TYPE_COUNT. Allowed Enum */
      gameCategory?: "BC_GAME" | "CASUAL_GAME" | null;
      /**
       * 遊戲代碼. Required if: ParameterType SPECIFIC_GAME_COUNT
       * @minLength 1
       */
      gameCode?: string | null;
      /** 指定类型 or 指定游戏. Allowed Enum */
      parameterType: "GAME_TYPE_COUNT" | "SPECIFIC_GAME_COUNT";
      /**
       * 遊戲次數
       * @format int64
       * @min 1
       */
      playCount: number;
    };
    /** 充值行為條件. Required if: ActionType RECHARGE */
    rechargeCondition?: {
      /** 充值有效金额 or 充值次数. Allowed Enum */
      parameterType: "RECHARGE_AMOUNT" | "RECHARGE_COUNT";
      /**
       * 次數 or 金额. Greater than 0
       * @format decimal
       */
      parameterValue: string;
    } | null;
    /**
     * 獎勵金額/數量
     * @format decimal
     */
    rewardAmount: string;
    /**
     * 獎勵金額/數量上限, null代表無上限
     * @format decimal
     */
    rewardAmountLimit?: string | null;
    /** 任務領取狀態, INELIGIBLE: 不符合領取條件, WAITING_CLAIM: 可領取, CLAIMED: 已領取. Allowed Enum */
    rewardClaimStatus: "INELIGIBLE" | "WAITING_CLAIM" | "CLAIMED";
    /** 獎勵類型. Allowed Enum */
    rewardType: "USDT" | "TON" | "KOKON" | "HAMMER" | "TREASURE";
    /**
     * 開始時間
     * @format date-time
     */
    startTime: string;
    /** 任務名稱 */
    taskName: string;
    /** 任務類型. Allowed Enum */
    taskType: "DAILY" | "ONE_TIME" | "SPECIAL";
    /** 團隊等級行為條件. Required if: ActionType TEAM_CLASS_ACHIEVEMENT */
    teamClassCondition?: {
      /**
       * 团队等级. Allowed Enum
       * @min 1
       * @max 5
       */
      teamClass?: "CLASS_1" | "CLASS_2" | "CLASS_3" | "CLASS_4" | "CLASS_5";
    } | null;
    /** 團隊等級獎勵設定. Required if: ActionType TEAM_CLASS_ACHIEVEMENT */
    teamClassRewardSetting?: {
      /**
       * class1
       * @format decimal
       */
      class1Amount?: string | null;
      /**
       * class2
       * @format decimal
       */
      class2Amount?: string | null;
      /**
       * class3
       * @format decimal
       */
      class3Amount?: string | null;
      /**
       * class4
       * @format decimal
       */
      class4Amount?: string | null;
      /**
       * class5
       * @format decimal
       */
      class5Amount?: string | null;
    };
    /** 團隊充值行為條件. Required if: ActionType TEAM_RECHARGE */
    teamRechargeCondition?: {
      /**
       * 總充值金額. Greater than 0
       * @format decimal
       */
      depositAmount: string;
      /** 团队总充值 or 直属下级总充值. Allowed Enum */
      parameterType: "TEAM_RECHARGE_AMOUNT" | "DIRECT_SUBORDINATE_RECHARGE_AMOUNT";
    } | null;
    /** 寶箱設定. Required if: RewardType TREASURE */
    treasureSetting?: {
      /**
       * 会员投注BC游戏
       * @format decimal
       */
      betRequirement?: string | null;
      /**
       * 直属下级投注BC游戏
       * @format decimal
       */
      directSubBetRequirement?: string | null;
      /** 發放機制, RANDOM: 隨機, FIXED: 固定. Allowed Enum */
      distributionMethod: "RANDOM" | "FIXED";
      /**
       * 固定金额
       * @format decimal
       */
      fixedAmount?: string | null;
      /**
       * 最大金额
       * @format decimal
       */
      maxAmount?: string | null;
      /**
       * 最小金额
       * @format decimal
       */
      minAmount?: string | null;
      /** 獎勵類型. Allowed Enum */
      rewardType: "USDT" | "TON" | "KOKON";
    };
  }[];
  /** 特殊任務列表 */
  specialList?: {
    /**
     * 累計值
     * @format decimal
     */
    accumulatedValue?: string;
    /** 行為條件. Allowed Enum */
    actionType:
      | "LOGIN"
      | "RECHARGE"
      | "INVITE_FRIENDS"
      | "TEAM_CLASS_ACHIEVEMENT"
      | "PLAY_GAMES"
      | "OPEN_LINK"
      | "TEAM_RECHARGE";
    /**
     * 結束時間, null代表無時間限制
     * @format date-time
     */
    endTime?: string | null;
    /** 任務ID */
    id: string;
    /** 邀請好友行為條件. Required if: ActionType INVITE_FRIENDS */
    inviteFriendsCondition?: {
      /**
       * 邀請數量
       * @format int64
       * @min 1
       */
      inviteCount: number;
      /** 普通邀请 or 红包邀请. Allowed Enum */
      parameterType: "NORMAL_SEND" | "RED_PACKET_SEND";
      /** 发送即生效 or 邀请注册 or 邀请有效用户. Allowed Enum */
      parameterValue: "ONLY_INVITE" | "INVITE_AND_REGISTER" | "INVITE_VALID_USER";
    } | null;
    /** 打開連結行為條件. Required if: ActionType OPEN_LINK */
    openLinkCondition?: {
      /** url link */
      parameterValue: string;
    } | null;
    /** 遊戲行為條件. Required if: ActionType PLAY_GAMES */
    playGameCondition?: {
      /** 休闲 or BC. Required if: ParameterType GAME_TYPE_COUNT. Allowed Enum */
      gameCategory?: "BC_GAME" | "CASUAL_GAME" | null;
      /**
       * 遊戲代碼. Required if: ParameterType SPECIFIC_GAME_COUNT
       * @minLength 1
       */
      gameCode?: string | null;
      /** 指定类型 or 指定游戏. Allowed Enum */
      parameterType: "GAME_TYPE_COUNT" | "SPECIFIC_GAME_COUNT";
      /**
       * 遊戲次數
       * @format int64
       * @min 1
       */
      playCount: number;
    };
    /** 充值行為條件. Required if: ActionType RECHARGE */
    rechargeCondition?: {
      /** 充值有效金额 or 充值次数. Allowed Enum */
      parameterType: "RECHARGE_AMOUNT" | "RECHARGE_COUNT";
      /**
       * 次數 or 金额. Greater than 0
       * @format decimal
       */
      parameterValue: string;
    } | null;
    /**
     * 獎勵金額/數量
     * @format decimal
     */
    rewardAmount: string;
    /**
     * 獎勵金額/數量上限, null代表無上限
     * @format decimal
     */
    rewardAmountLimit?: string | null;
    /** 任務領取狀態, INELIGIBLE: 不符合領取條件, WAITING_CLAIM: 可領取, CLAIMED: 已領取. Allowed Enum */
    rewardClaimStatus: "INELIGIBLE" | "WAITING_CLAIM" | "CLAIMED";
    /** 獎勵類型. Allowed Enum */
    rewardType: "USDT" | "TON" | "KOKON" | "HAMMER" | "TREASURE";
    /**
     * 開始時間
     * @format date-time
     */
    startTime: string;
    /** 任務名稱 */
    taskName: string;
    /** 任務類型. Allowed Enum */
    taskType: "DAILY" | "ONE_TIME" | "SPECIAL";
    /** 團隊等級行為條件. Required if: ActionType TEAM_CLASS_ACHIEVEMENT */
    teamClassCondition?: {
      /**
       * 团队等级. Allowed Enum
       * @min 1
       * @max 5
       */
      teamClass?: "CLASS_1" | "CLASS_2" | "CLASS_3" | "CLASS_4" | "CLASS_5";
    } | null;
    /** 團隊等級獎勵設定. Required if: ActionType TEAM_CLASS_ACHIEVEMENT */
    teamClassRewardSetting?: {
      /**
       * class1
       * @format decimal
       */
      class1Amount?: string | null;
      /**
       * class2
       * @format decimal
       */
      class2Amount?: string | null;
      /**
       * class3
       * @format decimal
       */
      class3Amount?: string | null;
      /**
       * class4
       * @format decimal
       */
      class4Amount?: string | null;
      /**
       * class5
       * @format decimal
       */
      class5Amount?: string | null;
    };
    /** 團隊充值行為條件. Required if: ActionType TEAM_RECHARGE */
    teamRechargeCondition?: {
      /**
       * 總充值金額. Greater than 0
       * @format decimal
       */
      depositAmount: string;
      /** 团队总充值 or 直属下级总充值. Allowed Enum */
      parameterType: "TEAM_RECHARGE_AMOUNT" | "DIRECT_SUBORDINATE_RECHARGE_AMOUNT";
    } | null;
    /** 寶箱設定. Required if: RewardType TREASURE */
    treasureSetting?: {
      /**
       * 会员投注BC游戏
       * @format decimal
       */
      betRequirement?: string | null;
      /**
       * 直属下级投注BC游戏
       * @format decimal
       */
      directSubBetRequirement?: string | null;
      /** 發放機制, RANDOM: 隨機, FIXED: 固定. Allowed Enum */
      distributionMethod: "RANDOM" | "FIXED";
      /**
       * 固定金额
       * @format decimal
       */
      fixedAmount?: string | null;
      /**
       * 最大金额
       * @format decimal
       */
      maxAmount?: string | null;
      /**
       * 最小金额
       * @format decimal
       */
      minAmount?: string | null;
      /** 獎勵類型. Allowed Enum */
      rewardType: "USDT" | "TON" | "KOKON";
    };
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
   * 團員等級
   * @format int64
   */
  Level?: number;
  /** 團員名稱 */
  Name?: string;
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
  /** 排序欄位,可帶入level,bet,deposit任一，未帶時預設會員id正序. Allowed Enum */
  SortField?: "level" | "bet" | "deposit";
  /** 排序欄位升降冪(asc,desc). Allowed Enum */
  SortOrder?: "desc" | "eq=asc";
}

export interface TeamPerformanceResponse {
  /** 資料 */
  data?: {
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
  /** 總計欄位 */
  summary?: {
    /**
     * 篩選後會員數
     * @format int64
     */
    teamSize?: number;
    /** 總投注加總 */
    totalBets?: string;
    /** 總入金加總 */
    totalDeposit?: string;
  };
}

export interface TelegramConfigGetResponse {
  /** telegram app name */
  appName?: string;
  /** telegram bot id */
  botId?: string;
  /** telegram bot name */
  botName?: string;
}

export type TerminateRequest = object;

export interface TerminateResponse {
  succeed?: boolean;
}

export interface TransferBalanceRequest {
  /**
   * 轉帳金額
   * @format decimal
   */
  amount: string;
  /** 轉帳幣別. Allowed Enum */
  currency: "TON" | "USDT" | "KOKON";
  /** 轉帳類型:IN:買入 OUT:賣出. Allowed Enum */
  type: "IN" | "OUT";
}

export interface UpdateLocaleRequest {
  /** 語系 */
  locale?: string;
}

export interface UpdateLocaleResponse {
  succeed?: boolean;
}

export interface UpgradeAnimationResponse {
  /**
   * 目標等級
   * @format int64
   * @min 2
   */
  finalClass?: number;
  /** 是否需跑升等動畫(因時間差的可能,delete時又收到ShouldPlayUpgradeAnimation:true,可重複呼叫upgrade-animation功能) */
  shouldPlayUpgradeAnimation?: boolean;
}

export interface ValidCodeRequest {
  /**
   * 收信信箱
   * @format email
   */
  email: string;
  /**
   * 驗證類型 0:純驗證無功能 1:綁定信箱 2:重置綁定信箱 3:綁定取款密碼 4:更新取款密碼 5:提款驗證
   * @format int64
   * @max 5
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
  /** 區塊鏈網路，目前只有TON. Allowed Enum */
  chainNet: "TON";
  /** 幣別. Allowed Enum */
  currency: "TON" | "USDT";
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

export interface CampaignEggClaimCreatePayload {
  /** 領取ID */
  transactionId: string;
}

export interface CampaignEggMarqueeListParams {
  /**
   * 筆數 (Required)
   * @format int64
   */
  size: number;
}

export interface CustomerBindemailUpdatePayload {
  /** 驗證碼 */
  code: string;
  /**
   * 收信信箱
   * @format email
   */
  email: string;
}

export interface CustomerBindpinUpdatePayload {
  /** 驗證碼 */
  code: string;
  /** 資金密碼 */
  pin: string;
}

export interface CustomerLocaleUpdatePayload {
  /** 語系 */
  locale?: string;
}

export interface CustomerLoginCreatePayload {
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
  firstName: string;
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

export interface CustomerShareCreatePayload {
  /** 用戶分享時使用的推薦代碼 */
  referralCode?: string;
}

export interface CustomerTeamPerformanceListParams {
  /** 排序欄位,可帶入level,bet,deposit任一，未帶時預設會員id正序 (Allowed values: level, bet, deposit) */
  sortField?: "level" | "bet" | "deposit";
  /** 排序欄位升降冪(asc,desc) (Allowed values: desc, asc, Required when SortField is present) */
  sortOrder?: "desc" | "asc";
  /** 團員名稱 */
  name?: string;
  /**
   * 團員等級
   * @format int64
   */
  level?: number;
  /**
   * 分頁頁數 (Required, Minimum: 1)
   * @format int64
   * @min 1
   */
  page: number;
  /**
   * 分頁筆數 (Required, Minimum: 20)
   * @format int64
   * @min 20
   */
  pageSize: number;
}

export interface CustomerUpgradeAnimationDeletePayload {
  /**
   * 清除目標等級
   * @format int64
   * @min 2
   */
  finalClass?: number;
}

export interface CustomerValidcodeCreatePayload {
  /**
   * 收信信箱
   * @format email
   */
  email: string;
  /**
   * 驗證類型 0:純驗證無功能 1:綁定信箱 2:重置綁定信箱 3:綁定取款密碼 4:更新取款密碼 5:提款驗證
   * @format int64
   * @max 5
   */
  kind?: number;
}

export interface CustomerVerifycodeCreatePayload {
  /** 驗證碼 */
  code: string;
}

export interface GameEnergyUpdatePayload {
  /** @format uint64 */
  gameId: number;
}

export interface GameTransactionsListParams {
  /**
   *  (Required)
   * @format date-time
   */
  startTime: string;
  /**
   *  (Required)
   * @format date-time
   */
  endTime: string;
  /** @format uint64 */
  gameId?: number;
  /**
   * 分頁頁數 (Required, Minimum: 1)
   * @format int64
   * @min 1
   */
  page: number;
  /**
   * 分頁筆數 (Required, Minimum: 20)
   * @format int64
   * @min 20
   */
  pageSize: number;
}

export interface GamesEnterCreatePayload {
  currency: string;
  language: string;
}

export interface PacketCreatePayload {
  /** 紅包種類. Allowed Enum */
  distributeKind?: "FIXED" | "RANDOM";
  /**
   * 發放總金額
   * @format decimal
   */
  distributedAmount?: string;
  /**
   * 固定金額
   * @format decimal
   */
  fixedValue?: string;
  /**
   * 上限類型 0:個數 1:金額,若是FIXED發送類型時固定需為0). Allowed Enum
   * @format int64
   */
  limitKind?: 0 | 1;
  /**
   * 隨機金額上限
   * @format decimal
   */
  maxValue?: string;
  /**
   * 隨機金額下限
   * @format decimal
   */
  minValue?: string;
  /**
   * 數量
   * @format int64
   */
  quantity?: number;
  /**
   * 隨機奬勵預算
   * @format decimal
   */
  quota?: string;
}

export interface PacketDetailParams {
  /**
   * 頁碼 (Required, Minimum: 1)
   * @format int64
   * @min 1
   */
  page: number;
  /**
   * 分頁筆數 (Required, Minimum: 20)
   * @format int64
   * @min 20
   */
  pageSize: number;
  /** Path parameter: packet_id */
  packetId: string;
}

export interface PacketsListParams {
  /** 查詢狀態 1:進行中 2:已終止 3:已完成 (Allowed values: 1, 2, 3) */
  states?: "1" | "2" | "3";
  /**
   * 頁碼 (Required, Minimum: 1)
   * @format int64
   * @min 1
   */
  page: number;
  /**
   * 分頁筆數 (Required, Minimum: 20)
   * @format int64
   * @min 20
   */
  pageSize: number;
}

export interface RankBcListParams {
  /** 排行榜類型 (Required) */
  rankType: string;
}

export interface TeamCommissionListListParams {
  /** 玩家名稱 */
  displayName?: string;
  /**
   * 玩家差距層級
   * @format int64
   */
  level?: number;
  /**
   *  (Required)
   * @format date-time
   */
  startTime: string;
  /**
   *  (Required)
   * @format date-time
   */
  endTime: string;
  /**
   * 分頁頁數 (Required, Minimum: 1)
   * @format int64
   * @min 1
   */
  page: number;
  /**
   * 分頁筆數 (Required, Minimum: 20)
   * @format int64
   * @min 20
   */
  pageSize: number;
}

export interface WalletDepositCreatePayload {
  /** 申請的幣種 TON USDT. Allowed Enum */
  currency?: "TON" | "USDT";
}

export interface WalletHistoryListListParams {
  /**
   * 帳變時間(起日) (Required when TransactionTimeTo is present)
   * @format date-time
   */
  transactionTimeFrom?: string;
  /**
   * 帳變時間(迄日) (Required when TransactionTimeFrom is present)
   * @format date-time
   */
  transactionTimeTo?: string;
  /** 幣種 TON USDT KOKON (Allowed values: TON, USDT, KOKON) */
  currency?: "TON" | "USDT" | "KOKON";
  /** 交易類型 Adjustment Bet Commission Deposit Game LuckyMoney Rank SmashEgg Swap(buy) Swap(sell) Task Treasure Withdraw (Allowed values: Adjustment, Bet, Commission, Deposit, Game, LuckyMoney, Rank, SmashEgg, Swap(buy), Swap(sell), Task, Treasure, Withdraw) */
  type?:
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
    | "Withdraw";
  /** 收支 Income Expense (Allowed values: Income, Expense) */
  balance?: "Income" | "Expense";
  /**
   * 頁碼 (Required, Minimum: 1)
   * @format int64
   * @min 1
   */
  page: number;
  /**
   * 分頁筆數 (Required, Minimum: 20)
   * @format int64
   * @min 20
   */
  pageSize: number;
}

export interface WalletTransferCreatePayload {
  /**
   * 轉帳金額
   * @format decimal
   */
  amount: string;
  /** 轉帳幣別. Allowed Enum */
  currency: "TON" | "USDT" | "KOKON";
  /** 轉帳類型:IN:買入 OUT:賣出. Allowed Enum */
  type: "IN" | "OUT";
}

export interface WalletWithdrawCreatePayload {
  /**
   * 申請金額. Greater than 0. Less than 10000000
   * @format decimal
   */
  amount: string;
  /** 區塊鏈網路，目前只有TON. Allowed Enum */
  chainNet: "TON";
  /** 幣別. Allowed Enum */
  currency: "TON" | "USDT";
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
