export type UserLike = {
  roles?: string[] | Set<string>;
};

const normalizeRoles = (roles: UserLike["roles"]): string[] => {
  if (!roles) return [];
  if (Array.isArray(roles)) return roles;
  return Array.from(roles);
};

export const hasAnyRole = (user: UserLike | null | undefined, required: string[]) => {
  if (!user) return false;
  const userRoles = normalizeRoles(user.roles);
  return required.some((r) => userRoles.includes(r));
};

export const hasRole = (user: UserLike | null | undefined, role: string) => {
  if (!user) return false;
  const userRoles = normalizeRoles(user.roles);
  return userRoles.includes(role);
};
