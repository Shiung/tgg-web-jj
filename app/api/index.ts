import { apiClient } from './api-client'
import { Customer } from './codegen/Customer'
import { Games } from './codegen/Games'
import { Header } from './codegen/Header'
import { Team } from './codegen/Team'
import { Wallet } from './codegen/Wallet'

export const apis = {
  customer: new Customer(apiClient),
  games: new Games(apiClient),
  header: new Header(apiClient),
  team: new Team(apiClient),
  wallet: new Wallet(apiClient),
  // 其他模塊往下繼續添加
}
