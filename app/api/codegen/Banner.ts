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
