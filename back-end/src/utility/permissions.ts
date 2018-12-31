import { USER_ROLE } from '../constant/constant'


export function getPermissionIndex(permissions) {
  // From lowest to highest
  return [
    USER_ROLE.MEMBER,
    USER_ROLE.LEADER,
    USER_ROLE.ADMIN,
    USER_ROLE.SECRETARY,
    USER_ROLE.COUNCIL,
  ].indexOf(permissions);
}

export function checkPermissions(user, role) {
  if (getPermissionIndex(user.role) >= getPermissionIndex(role)) {
    return true;
  }
  return false;
}

export function isCouncil(user) {
  if (getPermissionIndex(user.role) === getPermissionIndex(USER_ROLE.COUNCIL)) {
    return true;
  }
  return false;
}

export function isSecretary(user) {
  if (getPermissionIndex(user.role) === getPermissionIndex(USER_ROLE.SECRETARY)) {
    return true;
  }
  return false;
}

export function isAdmin(user) {
  if (getPermissionIndex(user.role) === getPermissionIndex(USER_ROLE.ADMIN)) {
    return true;
  }
  return false;
}

export function isLeader(user) {
  if (getPermissionIndex(user.role) === getPermissionIndex(USER_ROLE.LEADER)) {
    return true;
  }
  return false;
}
