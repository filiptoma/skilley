import { InputAdornment, Stack, Typography } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AutocompleteMultipleInput from 'components/form/AutocompleteMultipleInput.tsx';
import DatePicker from 'components/form/DatePicker.tsx';
import Form from 'components/form/Form.tsx';
import SelectInput from 'components/form/SelectInput.tsx';
import SubmitButton from 'components/form/SubmitButton.tsx';
import TextAreaInput from 'components/form/TextAreaInput.tsx';
import TextInput from 'components/form/TextInput.tsx';
import { JobOffer, Tag, addOffer, tagsCollection } from 'firebase/database.ts';
import useLoggedInUser from 'hooks/useLoggedInUser.tsx';
import useNotifications from 'hooks/useNotifications.ts';
import {
  JobPlaceNames,
  JobSkillNames,
  inputOptionsMapper,
  JobFormNames,
} from 'utils/index.ts';
import { NewOfferSchema } from 'utils/schemas.ts';

const NewOffer = () => {
  const [user] = useLoggedInUser();
  const { notifySuccess, notifyError } = useNotifications();
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(tagsCollection, (snapshot) => {
      setTags(snapshot.docs.map((doc) => doc.data()));
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <Stack spacing={6} maxWidth="80%" px={16}>
      <Typography variant="h4" fontWeight={900}>
        Nová pracovní nabídka
      </Typography>
      <Form
        schema={NewOfferSchema}
        initialValues={{ start: new Date() }}
        onSubmit={async (v) => {
          const now = new Date();
          const id = nanoid();

          const data: JobOffer = {
            ...v,
            id,
            company: user!.data!,
            createdAt: now,
            updatedAt: now,
            isTopped: false,
            isApproved: false,
          };

          try {
            await addOffer(id, data);
            notifySuccess('Nabídka úspěšně vytvořena');
            navigate('/offers/my');
          } catch (e) {
            notifyError();
          }
        }}
      >
        <TextInput id="name" label="Název" />
        <SelectInput
          id="skill"
          label="Požadovaná znalostní úroveň"
          options={inputOptionsMapper(JobSkillNames)}
        />
        <AutocompleteMultipleInput<Tag>
          id="tags"
          label="Technologie"
          options={tags}
          getOptionLabel={(o) => o.name}
        />
        <SelectInput
          id="place"
          label="Místo výkonu práce"
          options={inputOptionsMapper(JobPlaceNames)}
        />
        <SelectInput
          id="form"
          label="Forma práce"
          options={inputOptionsMapper(JobFormNames)}
        />
        <TextInput
          id="wage"
          label="Měsíční plat"
          InputProps={{
            endAdornment: <InputAdornment position="end">kč</InputAdornment>,
          }}
        />
        <DatePicker
          id="start"
          label="Datum nástupu"
          helperText={`Pro možnost "hned" zvolte dnešní datum`}
        />
        <TextAreaInput id="description" label="Popis práce" />
        <TextAreaInput id="requirements" label="Požadavky na uchazače" />
        <TextAreaInput id="offering" label="Benefity pro zaměstnance" />
        <SubmitButton>Vytvořit nabídku</SubmitButton>
      </Form>
    </Stack>
  );
};

export default NewOffer;
