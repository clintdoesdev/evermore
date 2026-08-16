export function withFlash(path: string, message: string, tone: "success" | "error" = "success") {
  const params = new URLSearchParams({ flash: message, tone });
  return `${path}?${params.toString()}`;
}
