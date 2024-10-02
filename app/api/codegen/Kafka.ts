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

export class Kafka<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description Auto-generated API documentation
   *
   * @tags sys
   * @name KafkaTopicKeyHandleCreate
   * @request POST:/_sys/kafka/topic/{topic}/key/{key}/handle
   */
  kafkaTopicKeyHandleCreate = (topic: string, key: string, params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/_sys/kafka/topic/${topic}/key/${key}/handle`,
      method: "POST",
      ...params,
    });
  /**
   * @description Auto-generated API documentation
   *
   * @tags sys
   * @name KafkaTopicKeyPublishCreate
   * @request POST:/_sys/kafka/topic/{topic}/key/{key}/publish
   */
  kafkaTopicKeyPublishCreate = (topic: string, key: string, params: RequestParams = {}) =>
    this.http.request<any, any>({
      path: `/_sys/kafka/topic/${topic}/key/${key}/publish`,
      method: "POST",
      ...params,
    });
}
