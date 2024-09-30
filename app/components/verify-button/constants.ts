export enum ValidCode {
  /**
   * 純驗證無功能
   */
  valid = 0,

  /**
   * 初次綁定信箱
   */
  firstEmailBind = 1,

  /**
   * 更新綁定信箱
   */
  updateEmailBind = 2,

  /**
   * 初次綁定fund pin
   */
  firstFundPinBind = 3,

  /**
   * 更新綁定fund pin
   */
  updateFundPinBind = 4,
}
