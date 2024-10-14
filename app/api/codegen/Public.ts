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

export class Public<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*HomeCarouselController)
   * @name PublicBannerHomeCarouselList
   * @request GET:/ajax/public/banner/home-carousel
   */
  publicBannerHomeCarouselList = (params: RequestParams = {}) =>
    this.http.request<
      {
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
          /** 跳轉參數 */
          redirectConfig?: string;
          /** 跳轉類型 */
          redirectType?: string;
        } | null)[];
      },
      any
    >({
      path: `/ajax/public/banner/home-carousel`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*LogoController)
   * @name PublicBannerLogoList
   * @request GET:/ajax/public/banner/logo
   */
  publicBannerLogoList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 圖片路徑 */
        image?: string;
      },
      any
    >({
      path: `/ajax/public/banner/logo`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*SubGameController)
   * @name PublicGamesActiveList
   * @request GET:/ajax/public/games/active
   */
  publicGamesActiveList = (params: RequestParams = {}) =>
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
      path: `/ajax/public/games/active`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*TaskController)
   * @name PublicTasksList
   * @request GET:/ajax/public/tasks
   */
  publicTasksList = (params: RequestParams = {}) =>
    this.http.request<
      {
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
      },
      any
    >({
      path: `/ajax/public/tasks`,
      method: "GET",
      ...params,
    });
}
