//1- Helper to compares user.roles[] and roles[] required
export const hasRole = (
  userRoles: string[],
  requiredRoles: string[],
): boolean => {
  return userRoles.some((item: string) => requiredRoles.includes(item));
};
