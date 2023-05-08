import { Box, InputAdornment } from '@mui/material';
import { nanoid } from 'nanoid';
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
import { useSnapshot } from 'hooks/useSnapshot.ts';
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
  const [tags] = useSnapshot(tagsCollection);

  return (
    <Box maxWidth="80%" px={16}>
      <Form
        title="Nová pracovní nabídka"
        back
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
            endAdornment: <InputAdornment position="end">CZK</InputAdornment>,
          }}
        />
        <DatePicker id="start" label="Datum nástupu" />
        <TextAreaInput id="description" label="Náplň práce" />
        <TextAreaInput id="requirements" label="Požadavky na uchazače" />
        <TextAreaInput id="offering" label="Benefity pro zaměstnance" />
        <SubmitButton>Vytvořit nabídku</SubmitButton>
      </Form>
    </Box>
  );
};

export default NewOffer;
