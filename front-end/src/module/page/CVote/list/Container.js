import { createContainer, api_request, checkPermissions } from '@/util'
import Component from './Component'
import {USER_ROLE} from '@/constant';

export default createContainer(Component, (state) => {

    return {
        currentUserId: state.user.current_user_id,
        isLogin : state.user.is_login,

        // TODO: this should be dynamic
        isCouncil: checkPermissions(state.user.role, USER_ROLE.COUNCIL),
        language: state.language.language
    }
}, ()=>{
    return {

        async listData(param, isCouncil){

            let result

            if (isCouncil) {
                result = await api_request({
                    path: '/api/cvote/list',
                    method: 'get',
                    data: param
                });

            } else {
                result = await api_request({
                    path: '/api/cvote/list_public',
                    method: 'get',
                    data: param
                });
            }

            return result;
        }
    }
})
