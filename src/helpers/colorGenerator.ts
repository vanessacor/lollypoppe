export function getRandomColor() {
  const colors = [
    "secondary-color",
    "highligth-color",
    "highligth-secondary-color",
    "highligth-tertiary-color",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return `var(--${colors[randomIndex]})`;
}
