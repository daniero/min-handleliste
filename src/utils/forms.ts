import { type FormEvent } from 'react';

export type FormObject = Record<string, File | string | undefined>;

export function getFormData(formEvent: FormEvent<HTMLFormElement>): FormObject {
  const formData: FormData = new FormData(formEvent.currentTarget);
  const data: Record<string, FormDataEntryValue> = {};

  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }

  return data;
}
