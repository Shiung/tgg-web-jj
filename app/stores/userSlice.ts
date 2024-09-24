import { StateCreator } from 'zustand'

export interface UserSlice {}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = set => ({})

export default createUserSlice
