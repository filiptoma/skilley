import { Stack } from '@mui/material';
import { z } from 'zod';

import AutocompleteMultipleInput from 'components/form/AutocompleteMultipleInput.tsx';
import CheckboxInput from 'components/form/CheckboxInput.tsx';
import DatePicker from 'components/form/DatePicker.tsx';
import DateTimePicker from 'components/form/DateTimePicker.tsx';
import Form from 'components/form/Form.tsx';
import PasswordInput from 'components/form/PasswordInput.tsx';
import SelectInput from 'components/form/SelectInput.tsx';
import SubmitButton from 'components/form/SubmitButton.tsx';
import TextAreaInput from 'components/form/TextAreaInput.tsx';
import TextInput from 'components/form/TextInput.tsx';
import { inputOptionsMapper } from 'utils/index.ts';

const CarBrand = z.union([
  z.literal('HONDA'),
  z.literal('MAZDA'),
  z.literal('TOYOTA'),
]);
type TCarBrand = z.infer<typeof CarBrand>;
const CarBrandNames: Record<TCarBrand, string> = {
  HONDA: 'Honda',
  MAZDA: 'Mazda',
  TOYOTA: 'Toyota',
};

const Sex = z.union([
  z.literal('MALE'),
  z.literal('FEMALE'),
  z.literal('HELIKOPTER'),
]);
type TSex = z.infer<typeof Sex>;
const SexNames: Record<TSex, string> = {
  MALE: 'Male',
  FEMALE: 'Female',
  HELIKOPTER: 'Helikopter',
};

const schema = z.object({
  username: z.string(),
  password: z.string(),
  cars: CarBrand.array(),
  gay: z.boolean().default(false),
  date: z.date(),
  datetime: z.date(),
  sex: Sex,
  bio: z.string().optional(),
});

const Login = () => (
  <Stack direction="column" spacing={2} m={4}>
    <Form schema={schema} onSubmit={async (v) => console.log(v)}>
      <TextInput id="username" label="Username" />
      <PasswordInput id="password" label="Password" />
      <AutocompleteMultipleInput id="cars" label="Cars" data={CarBrandNames} />
      <CheckboxInput id="gay" label="Gay?" />
      <DatePicker id="date" label="Date" />
      <DateTimePicker id="datetime" label="Datetime" />
      <SelectInput
        id="sex"
        label="Sex"
        options={inputOptionsMapper(SexNames)}
      />
      <TextAreaInput id="bio" label="Bio" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  </Stack>
);

export default Login;
