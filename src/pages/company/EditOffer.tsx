import { Box, InputAdornment } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Error from 'components/Error.tsx';
import AutocompleteMultipleInput from 'components/form/AutocompleteMultipleInput.tsx';
import DatePicker from 'components/form/DatePicker.tsx';
import Form from 'components/form/Form.tsx';
import SelectInput from 'components/form/SelectInput.tsx';
import SubmitButton from 'components/form/SubmitButton.tsx';
import TextAreaInput from 'components/form/TextAreaInput.tsx';
import TextInput from 'components/form/TextInput.tsx';
import {
  JobOffer,
  Tag,
  getOffer,
  tagsCollection,
  updateOffer,
} from 'firebase/database.ts';
import useNotifications from 'hooks/useNotifications.ts';
import { useSnapshot } from 'hooks/useSnapshot.ts';
import {
  JobPlaceNames,
  JobSkillNames,
  inputOptionsMapper,
  JobFormNames,
  timestampToDate,
} from 'utils/index.ts';
import { EditOfferSchema } from 'utils/schemas.ts';

const EditOffer = () => {
  const { id } = useParams();
  const { notifySuccess, notifyError } = useNotifications();
  const navigate = useNavigate();
  const [tags] = useSnapshot(tagsCollection);

  const [offer, setOffer] = useState<JobOffer>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      if (!id) {
        setIsError(true);
        return;
      }
      setIsLoading(true);
      try {
        const o = await getOffer(id);
        if (!o) setIsError(true);
        setOffer(o);
      } catch (e) {
        setIsError(true);
        console.error(e);
        notifyError();
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading && null}
      {isError && <Error />}
      {!isLoading && !isError && (
        <Box maxWidth="80%" px={16}>
          <Form
            title="Úprava pracovní nabídky"
            back
            schema={EditOfferSchema}
            initialValues={{
              name: offer?.name,
              skill: offer?.skill,
              tags: offer?.tags,
              place: offer?.place,
              form: offer?.form,
              wage: String(offer?.wage),
              start: timestampToDate(offer?.start),
              description: offer?.description,
              requirements: offer?.requirements,
              offering: offer?.offering,
            }}
            onSubmit={async (v) => {
              const now = new Date();

              const data: JobOffer = {
                ...offer!,
                ...v,
                updatedAt: now,
                isApproved: false,
              };

              try {
                await updateOffer(offer!.id, data);
                notifySuccess('Nabídka úspěšně upravena');
                navigate(-1);
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
                endAdornment: (
                  <InputAdornment position="end">CZK</InputAdornment>
                ),
              }}
            />
            <DatePicker id="start" label="Datum nástupu" />
            <TextAreaInput id="description" label="Náplň práce" />
            <TextAreaInput id="requirements" label="Požadavky na uchazače" />
            <TextAreaInput id="offering" label="Benefity pro zaměstnance" />
            <SubmitButton>Uložit</SubmitButton>
          </Form>
        </Box>
      )}
    </>
  );
};

export default EditOffer;
