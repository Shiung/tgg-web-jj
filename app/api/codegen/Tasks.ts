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

export class Tasks<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*TaskController)
   * @name TasksList
   * @request GET:/ajax/tasks
   */
  tasksList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 每日任務列表 */
        dailyList?: {
          /**
           * 創建時間
           * @format date-time
           */
          createdAt: string;
          /**
           * 結束時間, null代表無時間限制
           * @format date-time
           */
          endTime?: string | null;
          /** 任務ID */
          id: string;
          /**
           * 獎勵金額/數量
           * @format decimal
           */
          rewardAmount: string;
          /** 獎勵類型 */
          rewardType: string;
          /**
           * 開始時間
           * @format date-time
           */
          startTime: string;
          /** 達成條件[類型] */
          taskConditionType: string;
          /** 達成條件[值] */
          taskConditionValue: string;
          /** 任務名稱 */
          taskName: string;
          /** 任務類型 */
          taskType: string;
          /**
           * 最後操作時間
           * @format date-time
           */
          updatedAt: string;
        }[];
        /** 一次性任務列表 */
        oneTimeList?: {
          /**
           * 創建時間
           * @format date-time
           */
          createdAt: string;
          /**
           * 結束時間, null代表無時間限制
           * @format date-time
           */
          endTime?: string | null;
          /** 任務ID */
          id: string;
          /**
           * 獎勵金額/數量
           * @format decimal
           */
          rewardAmount: string;
          /** 獎勵類型 */
          rewardType: string;
          /**
           * 開始時間
           * @format date-time
           */
          startTime: string;
          /** 達成條件[類型] */
          taskConditionType: string;
          /** 達成條件[值] */
          taskConditionValue: string;
          /** 任務名稱 */
          taskName: string;
          /** 任務類型 */
          taskType: string;
          /**
           * 最後操作時間
           * @format date-time
           */
          updatedAt: string;
        }[];
        /** 特殊任務列表 */
        specialList?: {
          /**
           * 創建時間
           * @format date-time
           */
          createdAt: string;
          /**
           * 結束時間, null代表無時間限制
           * @format date-time
           */
          endTime?: string | null;
          /** 任務ID */
          id: string;
          /**
           * 獎勵金額/數量
           * @format decimal
           */
          rewardAmount: string;
          /** 獎勵類型 */
          rewardType: string;
          /**
           * 開始時間
           * @format date-time
           */
          startTime: string;
          /** 達成條件[類型] */
          taskConditionType: string;
          /** 達成條件[值] */
          taskConditionValue: string;
          /** 任務名稱 */
          taskName: string;
          /** 任務類型 */
          taskType: string;
          /**
           * 最後操作時間
           * @format date-time
           */
          updatedAt: string;
        }[];
      },
      any
    >({
      path: `/ajax/tasks`,
      method: "GET",
      ...params,
    });
}
