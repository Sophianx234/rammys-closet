import { IUser } from "@/models/User";
import { create } from "zustand";

export type storeState = {
  user: IUser | null;
  setUser: (user: IUser) => void;
};

export const useDashStore = create<storeState>((set) => ({
  user: null,
  setUser: (user: IUser) => set(() => ({ user })),

}));
