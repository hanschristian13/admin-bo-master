import { LangProps } from "@/types/lang"
import { User } from "@/types/user"

export interface DashboardProps {
  lang: LangProps
  userData: User | null
}