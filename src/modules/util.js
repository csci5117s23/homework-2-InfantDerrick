export function randomColor() {
  const colors = [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}; 