import { z } from 'zod';

const appendIssue = (
  obj: Record<string, unknown>,
  i: z.ZodIssue,
): Record<string, unknown> => {
  const [curr, ...path] = i.path;
  if (!path.length) return { ...obj, [curr as string | number]: i.message };
  if (typeof path[0] === 'number')
    return { ...obj, [curr as string | number]: [i.message] };
  return {
    ...obj,
    [curr as string | number]: appendIssue(
      (obj[curr as string | number] ?? {}) as Record<string, unknown>,
      {
        ...i,
        path,
      },
    ),
  };
};

export const zodToFinalFormError = <T extends Record<string, unknown>>(
  error: z.ZodError<T>,
) => error.issues.reduce(appendIssue, {});

export const noop = () => {};

export const inputOptionsMapper = (names: Record<symbol, string>) =>
  Object.entries(names).map(([key, label]) => ({
    key,
    value: key,
    label: label as string,
  }));
