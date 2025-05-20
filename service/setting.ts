/* eslint-disable @typescript-eslint/no-explicit-any */
import { iQueryPayload } from '@/lib/definitions'
import Request from '.'

type iPayloadCreateStaff = {
  dealer_id: string
  password: string
  repeatPassword: string
  role: string
  username: string
}

export const getListSuperAgentUsers = (params: iQueryPayload) =>
  Request.get('users/superadmin/users', { ...params })

export const getWhitelistIp = (parent_id: string) =>
  Request.get(`dealers/superadmin/whitelistip/dealers/${parent_id}`)
export const deleteWhitelistIp = (payload: { dealer_id: string; ip: string }) =>
  Request.put('dealers/superadmin/delete-whitelistip', payload)
export const addWhitelistIp = (payload: { dealer_id: string; ip: string }) =>
  Request.put('dealers/superadmin/whitelistip', payload)
export const getListRoles = (parent_id: string) =>
  Request.get('users/superadmin/permission-roles', { dealer_id: parent_id })
export const postCreateNewStaff = (payload: iPayloadCreateStaff) =>
  Request.post('/users/superadmin/users', payload)

export const getDetailStaff = ({ dealer_id, username }: { dealer_id: string; username: string }) =>
  Request.get(`/users/superadmin/dealers/${dealer_id}/users/${username}`)

export const getRolesDetail = ({ dealer_id, role }: { dealer_id: string; role: string }) =>
  Request.get(`/users/superadmin/permission-roles/dealers/${dealer_id}/roles/${role}`)
export const getListPermission = () => Request.get('/users/superadmin/permissions')
export const patchPermission = ({ dealer_id, payload }: { dealer_id: string; payload: any }) =>
  Request.post(`/users/superadmin/permission-role/dealers/${dealer_id}`, payload)
export const putUserAdmin = ({
  username,
  dealer_id,
  payload
}: {
  username: string
  dealer_id: string
  payload: any
}) => Request.put(`/users/superadmin/dealers/${dealer_id}/users/${username}`, payload)
