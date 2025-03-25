export const dataAdmin = {
  data: [
    {
      username: "HYY",
      role: "Master",
      last_login: "2025-02-25 14:36:14",
      dealer: "dealer 1"
    },
    {
      username: "IDD",
      role: "Super Agent",
      last_login: "2025-02-27 11:44:12",
      dealer: "dealer 2"
    },
    {
      username: "SYM",
      role: "Super Agent",
      last_login: "2025-02-25 04:15:74",
      dealer: "dealer 1"
    },
    {
      username: "MMN",
      role: "Agent",
      last_login: "2025-02-28 10:16:05",
      dealer: "dealer 2"
    },
    {
      username: "CLN",
      role: "Agent",
      last_login: "2025-02-27 23:35:52",
      dealer: "dealer 2"
    },
    {
      username: "POL",
      role: "Agent",
      last_login: "2025-02-26 08:06:55",
      dealer: "dealer 1"
    },
    {
      username: "JFI",
      role: "Master",
      last_login: "2025-02-25 14:36:14",
      dealer: "dealer 1"
    },
    {
      username: "UHS",
      role: "Super Agent",
      last_login: "2025-02-27 11:44:12",
      dealer: "dealer 2"
    },
    {
      username: "LOE",
      role: "Super Agent",
      last_login: "2025-02-25 04:15:74",
      dealer: "dealer 1"
    },
    {
      username: "NUS",
      role: "Agent",
      last_login: "2025-02-28 10:16:05",
      dealer: "dealer 2"
    },
    {
      username: "PLO",
      role: "Agent",
      last_login: "2025-02-27 23:35:52",
      dealer: "dealer 2"
    },
    {
      username: "MKA",
      role: "Agent",
      last_login: "2025-02-26 08:06:55",
      dealer: "dealer 1"
    }
  ]
}

export interface Permission {
  [key: string]: boolean;
}

export interface PermissionGroup {
  permission_group_name: string;
  permissions: Permission[];
}

export interface AdminPermissionData {
  data: PermissionGroup[];
}

export const dataAdminPermission: AdminPermissionData = {
  data: [
    {
      permission_group_name: "dashboard",
      permissions: [
        {
          dashboard_view: true
        }
      ]
    },
    {
      permission_group_name: "report",
      permissions: [
        {
          player_active_view: true,
          client_view: true,
          slot_view: true,
          profit_view: false,
          client_shared_view: true,
        }
      ]
    },
    {
      permission_group_name: "super agent",
      permissions: [
        {
          super_agent_view: false,
          super_agent_add: true,
          super_agent_edit: true,
          agent_view: false,
          agent_create: false,
          agent_edit: false,
        }
      ]
    },
    {
      permission_group_name: "games",
      permissions: [
        {
          game_view: false,
          game_edit: true,
        }
      ]
    },
    {
      permission_group_name: "player pending transaction",
      permissions: [
        {
          pending_view: false,
          pending_edit: true,
        }
      ]
    },
    {
      permission_group_name: "player",
      permissions: [
        {
          player_view: false,
          player_edit: true,
        }
      ]
    },
    {
      permission_group_name: "invoice",
      permissions: [
        {
          invoice_view: false,
          invoice_add: true,
          invoice_edit: true,
        }
      ]
    },
    {
      permission_group_name: "setting",
      permissions: [
        {
          admin_view: true,
          admin_add: false,
          admin_edit: false,
          whitelist_ip_view: true,
          whitelist_ip_add: false,
          whitelist_ip_edit: false,
        }
      ]
    },
  ]
}