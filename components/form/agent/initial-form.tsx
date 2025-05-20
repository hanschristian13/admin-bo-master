import { SuperAgentType } from "@/types/super-agent";

export const intialForm: SuperAgentType = {
  _id: '',
  agent_name: '',
  short_code: '',
  host: '',
  api_key: '',
  secret: '',
  mutasiku_api_key: null,
  mutasiku_secret_key: null,
  mutasiku_endpoint: null,
  wallet_type: '',
  company_percentage: 20,
  master_agent_percentage: 80,
  master_company_percentage: 0,
  client_url: {
    base_api_url: '',
    authenticate: '',
    balance: '',
    result: '',
    bet: '',
    freespin: '',
    refund: '',
    bonus: ''
  },
  ip: [],
  subdealer_id: [],
  balance: 0,
  type: '',
  active: false,
  cashier_url: '',
  base_url: null,
  parent_id: '',
  brand_name: null,
  occurrence: '',
  auto_deposit: false,
  client_environments: [
    {
      config: {
        title: '',
        template: 0,
        web_role: ''
      },
      api_endpoint: '',
      lobby_url: '',
      domains: [
        {
          domain: ''
        }
      ]
    }
  ],
  live_event: false,
  mailgun_domain: null,
  mailgun_status: null,
  vercel_project: null,
  language: '',
  currency: '',
  brand_logo: null,
  brand_logo_mobile: null,
  brand_favicon: null,
  minimum_deposit: 0,
  agent_pic: [
    {
      pic_name: '',
      pic_email: '',
      pic_telegram: '',
      pic_type: 'finance'
    },
    {
      pic_name: '',
      pic_email: '',
      pic_telegram: '',
      pic_type: 'technical'
    }
  ],
}
