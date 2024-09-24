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

export class Team<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*SettingController)
   * @name TeamSettingList
   * @request GET:/ajax/team/setting
   */
  teamSettingList = (params: RequestParams = {}) =>
    this.http.request<
      {
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
      },
      any
    >({
      path: `/ajax/team/setting`,
      method: "GET",
      ...params,
    });
}
