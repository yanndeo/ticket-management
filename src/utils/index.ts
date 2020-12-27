export const limitSize = 2 * 1025 * 1025;
//export const logoDir = './uploads/profiles/';

//1- Helper to compares user.roles[] and roles[] required
export const hasRole = (
  userRoles: string[],
  requiredRoles: string[],
): boolean => {
  return userRoles.some((item: string) => requiredRoles.includes(item));
};

//2- remove item from array
export const removeItem = (items, i) => {
  return items.slice(0, i - 1).concat(items.slice(i, items.length));
};

//3- convert size bytes to human size
export const humanFileSize = (size) => {
  if (size < 1024) return size + ' B';
  const i = Math.floor(Math.log(size) / Math.log(1024));
  let num = size / Math.pow(1024, i);
  const round = Math.round(num);
  num = round < 10 ? +num.toFixed(2) : round < 100 ? +num.toFixed(1) : round;
  return `${Math.round(num)} ${'KMGTPEZY'[i - 1]}B`;
};

//4- Queue name
export const mail_queue_name = 'mail';
