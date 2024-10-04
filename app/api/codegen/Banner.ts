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

export class Banner<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags (*HomeCarouselController)
   * @name BannerHomeCarouselList
   * @request GET:/ajax/banner/home-carousel
   */
  bannerHomeCarouselList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 資料 */
        list?: {
          /**
           * 創建時間
           * @format date-time
           */
          createdAt: string;
          /** 操作人 */
          editor?: string;
          enabled?: boolean;
          /**
           * 顯示結束時間
           * @format date-time
           */
          endTime?: string;
          /** @format uint64 */
          id?: number;
          /** 圖片網址 */
          image?: string;
          /** 廣告暱稱 */
          name?: string;
          /** 跳轉參數 */
          redirectConfig?: string;
          /** 跳轉類型 */
          redirectType?: string | null;
          /**
           * 顯示起始時間
           * @format date-time
           */
          startTime?: string;
          /**
           * 最後操作時間
           * @format date-time
           */
          updatedAt: string;
        }[];
      },
      any
    >({
      path: `/ajax/banner/home-carousel`,
      method: "GET",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags (*LogoController)
   * @name BannerLogoList
   * @request GET:/ajax/banner/logo
   */
  bannerLogoList = (params: RequestParams = {}) =>
    this.http.request<
      {
        /** 圖片路徑 */
        image?: string;
      },
      any
    >({
      path: `/ajax/banner/logo`,
      method: "GET",
      ...params,
    });
}
