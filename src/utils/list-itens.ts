export const listItems = <T>(items: T[], message: string): void => {
  console.log(message);
  items.forEach(item => {
    console.log(JSON.stringify(item));
  });
}