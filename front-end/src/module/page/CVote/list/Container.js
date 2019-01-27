import { createContainer, api_request, checkPermissions } from '@/util'
import Component from './Component'
import { USER_ROLE } from '@/constant'

export default createContainer(Component, state => ({
  currentUserId: state.user.current_user_id,
  isLogin: state.user.is_login,

  // TODO: this should be dynamic
  isCouncil: checkPermissions(state.user.role, USER_ROLE.COUNCIL),
  canCreate: checkPermissions(state.user.role, USER_ROLE.SECRETARY),
  language: state.language.language,
}), () => ({

  async listData(param, isCouncil) {
    let result

    if (isCouncil) {
      result = await api_request({
        path: '/api/cvote/list',
        method: 'get',
        data: param,
      });
    } else {
      result = await api_request({
        path: '/api/cvote/list_public',
        method: 'get',
        data: param,
      });
    }

    return result;
  },
}))
