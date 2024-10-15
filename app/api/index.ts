import { apiClient } from './api-client'
import { Banner } from './codegen/Banner'
import { Campaign } from './codegen/Campaign'
import { Customer } from './codegen/Customer'
import { Games } from './codegen/Games'
import { Game } from './codegen/Game'
import { Header } from './codegen/Header'
import { PacketSetting } from './codegen/PacketSetting'
import { PacketDraw } from './codegen/PacketDraw'
import { Packets } from './codegen/Packets'
import { Packet } from './codegen/Packet'
import { Public } from './codegen/Public'
import { System } from './codegen/System'
import { Tasks } from './codegen/Tasks'
import { Task } from './codegen/Task'
import { Rank } from './codegen/Rank'
import { Team } from './codegen/Team'
import { Wallet } from './codegen/Wallet'
import { Campaign } from './codegen/Campaign'

export const apis = {
  banner: new Banner(apiClient),
  campaign: new Campaign(apiClient),
  customer: new Customer(apiClient),
  games: new Games(apiClient),
  game: new Game(apiClient),
  header: new Header(apiClient),
  packetSetting: new PacketSetting(apiClient),
  packetDraw: new PacketDraw(apiClient),
  packets: new Packets(apiClient),
  packet: new Packet(apiClient),
  public: new Public(apiClient),
  system: new System(apiClient),
  tasks: new Tasks(apiClient),
  task: new Task(apiClient),
  rank: new Rank(apiClient),
  team: new Team(apiClient),
  wallet: new Wallet(apiClient),
  campaign: new Campaign(apiClient),
  // 其他模塊往下繼續添加
}
