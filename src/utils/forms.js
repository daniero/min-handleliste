export function getFormData(formEvent) {
  const formData = new FormData(formEvent.target);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
}