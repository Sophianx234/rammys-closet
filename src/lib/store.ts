import { IRoom } from "@/app/dashboard/properties/page";
import { transactionType } from "@/app/dashboard/transactions/PaymentHistory";
import { IHouse } from "@/models/House";
import { userDocumentType } from "@/models/User";
import { create } from "zustand";
import { userType } from "./jwtConfig";

export type signupType = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  acceptTerms: true;
};
export type notificationType = {
  title: string;
   message: string;
   type: "system" | "maintenance" | "payment" | "booking";
   audience: "all" | "user" | "admin"; // who should see it
   userId?:string; // if specific user
   isReadBy?: string; // users who have read it
   createdAt: Date;
   updatedAt: Date;
};

export type storeState = {
  filteredPayments: transactionType[] | [];
  user: userType | null;
  users: userDocumentType[] | null;
  room: IRoom | null;
  openSidebar: boolean;
  openAddProperty: boolean;
  openAddHouse: boolean;
  openExpandedProperty: boolean;
  signupData: signupType | null;
  avatar: string;
  filteredRooms: IRoom[] | null;
  filteredHouses: IHouse[] | null;
  notifications: notificationType[];

  setAvatar: (url: string) => void;
  setSignupData: (data: signupType) => void;
  setFilteredRooms: (data: IRoom[] | null) => void;
  setFilteredHouses: (data: IHouse[] | null) => void;
  setNotifications: (data: notificationType) => void;
  loadNotifications: (data: notificationType[]) => void;
  setRoom: (data: IRoom | null) => void;
  setFilteredPayments: (data: transactionType[] | []) => void;
  toggleSidebar: () => void;
  toggleExpandedProperty: () => void;
  toggleAddProperty: () => void;
  toggleAddHouse: () => void;
  setUser: (user: userType) => void;
  setUsers: (user: userDocumentType[] | null) => void;
  openNotifications: boolean;
  toggleNotification: () => void;
};

export const useDashStore = create<storeState>((set) => ({
  filteredPayments: [],
  notifications: [],
  room: null,
  openSidebar: false,
  filteredHouses: null,
  openExpandedProperty: false,
  openAddProperty: false,
  openNotifications: false,
  user: null,
  users: null,
  signupData: null,
  avatar: "", // ✅ Initial value for avatar
  openAddHouse: false,
  filteredRooms: null,
  toggleAddHouse: () => set((state) => ({ openAddHouse: !state.openAddHouse })),

  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),
  toggleExpandedProperty: () =>
    set((state) => ({ openExpandedProperty: !state.openExpandedProperty })),
  toggleAddProperty: () =>
    set((state) => ({ openAddProperty: !state.openAddProperty })),
  toggleNotification: () =>
    set((state) => ({ openNotifications: !state.openNotifications })),
  setNotifications: (data: notificationType) =>
    set((state) => ({
  notifications: [...state.notifications, data],
})),
  loadNotifications: (data: notificationType[]) =>
    set(() => ({
      notifications: data,
    })),

  setFilteredHouses: (data: IHouse[] | null) =>
    set(() => ({ filteredHouses: data })),

  setUser: (user: userType) => set(() => ({ user })),
  setUsers: (users: userDocumentType[] | null) => set(() => ({ users })),
  setAvatar: (url: string) => set(() => ({ avatar: url })), // ✅ Corrected function
  setSignupData: (data: signupType) => set(() => ({ signupData: data })),
  setFilteredRooms: (data: IRoom[] | null) =>
    set(() => ({ filteredRooms: data })),
  setRoom: (data: IRoom | null) => set(() => ({ room: data })),
  setFilteredPayments: (data: transactionType[] | []) =>
    set(() => ({ filteredPayments: data })),
}));
