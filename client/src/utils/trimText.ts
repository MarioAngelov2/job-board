export const trimJobTitle = (title: string, maxLength: number) => {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};