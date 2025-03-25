export interface User {
  id: string
  username: string
  role: string
  last_login: string
}
export interface Player {
  username: string
  last_login: string
  registered_at: string
}

export interface Admin {
  username: string
  role: string
  dealer: string
}
