import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { ReactNode } from 'react';
import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from 'react-hook-form';

export type TextFieldProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues, any, undefined>;
  name: Path<TFieldValues>;
  type?: 'text' | 'email' | 'password';
  label?: string;
  hint?: ReactNode;
  placeholder?: string;
  description?: ReactNode;
  required?: boolean;
};

export const TextField = <TFieldValues extends FieldValues>({
  form,
  name,
  type = 'text',
  label,
  hint,
  placeholder,
  description,
  required,
}: TextFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {(label || hint) && (
            <FormLabel>
              <div className="flex justify-between">
                <span>{label}</span>
                <span>{hint}</span>
              </div>
            </FormLabel>
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              required={required}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
