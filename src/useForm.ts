import { ChangeEvent, FormEvent, useState } from "react";

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string | RegExp;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}
type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  // hook logic here
  const [data, setData] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  // Needs to extend unknown so we can add a generic to an arrow function
  const handleChange =
    <S extends unknown>(key: keyof T, sanitizeFn?: (value: string) => S) =>
    (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
      const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
      setData({
        ...data,
        [key]: value,
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const validations = options?.validations;
    console.log(validations);
    if (validations) {
      let valid = true;
      const newErrors: ErrorRecord<T> = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (
          pattern?.value &&
          typeof pattern.value === "string" &&
          !RegExp(pattern.value).test(value)
        ) {
          valid = false;
          newErrors[key] = pattern.message;
        }
        if (
          pattern?.value &&
          // eslint-disable-next-line valid-typeof
          typeof pattern.value === "object" &&
          !pattern.value.test(value)
        ) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };
  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };
};

export default useForm;
