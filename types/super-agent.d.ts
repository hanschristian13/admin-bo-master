export interface DataSuperAgentType {
  total_page: number
  total_items: number
  data: SuperAgentType[] | undefined
}

export interface ResDetailSuperAgentType {
  data: SuperAgentType | undefined
  errors?: {
    [K in keyof SuperAgentTypeV2]?: string[]
  }
  message?: string
}

export interface SuperAgentTypeV2 {
  agent_name: string
  email: string
  phone_number: string
  type: string
  short_code: string
  active: boolean
}

export interface SuperAgentType {
  _id: string
  agent_name: string
  short_code: string
  host: string
  api_key: string
  secret: string
  mutasiku_api_key: null
  mutasiku_secret_key: null
  mutasiku_endpoint: null
  wallet_type: string
  company_percentage: number
  master_agent_percentage: number
  master_company_percentage: number
  client_url: ClientUrl
  ip: string[]
  subdealer_id: any[]
  balance: number
  type: string
  active: boolean
  cashier_url: string
  base_url: null
  parent_id: string
  brand_name: null
  occurrence: string
  auto_deposit: boolean
  client_environments: Clientenvironment[]
  live_event: boolean
  mailgun_domain: null
  mailgun_status: null
  vercel_project: null
  language: string
  currency: string
  brand_logo: null
  brand_logo_mobile: null
  brand_favicon: null
  minimum_deposit: number
  agent_pic: Agentpic[]
}

export interface ClientUrl {
  base_api_url: string
  authenticate: string
  balance: string
  result: string
  bet: string
  freespin: string
  refund: string
  bonus: string
}

interface ResDetailSuperAgent {
  total_page: number
  total_items: number
  data: dataDetailSuperAgent[]
}

interface dataDetailSuperAgent {
  _id: string
  short_code: string
  host: string
  api_key: string
  company_percentage: number
  master_agent_percentage: number
  master_company_percentage: number
  secret: string
  mutasiku_api_key: null
  mutasiku_secret_key: null
  mutasiku_endpoint: null
  wallet_type: null
  client_url: null
  ip: string[]
  subdealer_id: any[]
  balance: number
  type: string
  active: boolean
  cashier_url: null
  base_url: null
  parent_id: string
  brand_name: string
  occurrence: string
  auto_deposit: boolean
  client_environments: Clientenvironment[]
  live_event: boolean
  mailgun_domain: null
  mailgun_status: null
  vercel_project: null
  language: string
  currency: string
  brand_logo: string
  brand_logo_mobile: string
  brand_favicon: string
  agent_pic: any[]
  minimum_deposit: number
}

interface Clientenvironment {
  config: Config
  api_endpoint: string
  lobby_url: string
  domains: Domain[]
}

interface Domain {
  domain: string
}

interface Config {
  title: string
  template: number
  web_role: string
}

interface ClientListSuperAgentProps {
  data: SuperAgentType[] | undefined
  total_page: number
  total_items: number
  webRole: string
}

interface AgentType {
  agent_name: string
  brand_name: string
  short_code: string
  type: string
  active: boolean
  company_percentage: number
  agent_percentage: number
  master_agent_percentage: number
  master_company_percentage: number
  language: string
  client_environments: Clientenvironment[]
  agent_pic: Agentpic[]
  currency: string
  host: string
  parent_id: string
  canonical: string
}

interface Agentpic {
  pic_name: string
  pic_email: string
  pic_telegram: string
  pic_type: string
}
