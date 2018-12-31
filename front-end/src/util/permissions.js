import { USER_ROLE } from '@/constant'

function getPermissionIndex(permissions) {
    // From lowest to highest
    return [
        USER_ROLE.MEMBER,
        USER_ROLE.LEADER,
        USER_ROLE.ADMIN,
        USER_ROLE.SECRETARY,
        USER_ROLE.COUNCIL
    ].indexOf(permissions);
}

export function checkPermissions(userRole, neededRole) {
    if (getPermissionIndex(userRole) >= getPermissionIndex(neededRole)) {
        return true;
    }
    return false;
}

export function isCouncil(role) {
    if (getPermissionIndex(role) === getPermissionIndex(USER_ROLE.COUNCIL)) {
        return true;
    }
    return false;
}

export function isSecretary(role) {
    if (getPermissionIndex(role) === getPermissionIndex(USER_ROLE.COUNCIL)) {
        return true;
    }
    return false;
}

export function isAdmin(role) {
    if (getPermissionIndex(role) === getPermissionIndex(USER_ROLE.ADMIN)) {
        return true;
    }
    return false;
}

export function isLeader(role) {
    if (getPermissionIndex(role) === getPermissionIndex(USER_ROLE.LEADER)) {
        return true;
    }
    return false;
}
