//1- Helper to compares user.roles[] and roles[] required
export const hasRole = (
  userRoles: string[],
  requiredRoles: string[],
): boolean => {
  return userRoles.some((item: string) => requiredRoles.includes(item));
};

//2- remove item from aray
export const removeItem = (items, i) =>
  items.slice(0, i - 1).concat(items.slice(i, items.length));
