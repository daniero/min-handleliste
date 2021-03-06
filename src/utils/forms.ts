import { FormEvent } from "react";

export function getFormData(formEvent: FormEvent<HTMLFormElement>): Record<string, File | string> {
  const formData: FormData = new FormData(formEvent.currentTarget)
  const data: Record<string, FormDataEntryValue> = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  return data;
}