import { User } from "."

export type INotification = {
  id: string
  type: string
  title: string
  read: Date | null
  created: Date
  objectName: string
}

export type AdminNotification = INotification & { account: User }
