export function getRandomColor() {
  const colors = [
    "#66fcf1",
    "#ffd54d",
    "#ff4242",
    "#aa7dce",
    "#D83F31",
    "#EE9322",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return `${colors[randomIndex]}`;
}
