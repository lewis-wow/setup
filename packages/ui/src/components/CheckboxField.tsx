import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { ReactNode } from 'react';
import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from 'react-hook-form';

export type CheckboxFieldProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues, any, undefined>;
  name: Path<TFieldValues>;
  label?: string;
  description?: ReactNode;
  required?: boolean;
};

export const CheckboxField = <TFieldValues extends FieldValues>({
  form,
  name,
  label,
  description,
  required,
}: CheckboxFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Checkbox {...field} required={required} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
