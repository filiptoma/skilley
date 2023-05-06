import { Box, Stack, Typography } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

import Form from 'components/form/Form.tsx';
import SubmitButton from 'components/form/SubmitButton.tsx';
import TextInput from 'components/form/TextInput.tsx';
import { Tag, addTag, tagsCollection } from 'firebase/database.ts';
import { NewTagSchema } from 'utils/schemas.ts';

const Dashboard = () => {
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
    <Stack spacing={4}>
      <Stack spacing={1}>
        {tags.map((tag) => (
          <Box key={tag.id}>
            <Typography>{tag.name}</Typography>
          </Box>
        ))}
      </Stack>
      <Form
        schema={NewTagSchema}
        onSubmit={async (v) => {
          const id = nanoid();
          await addTag(id, { id, name: v.name });
        }}
      >
        <TextInput id="name" label="Název technológie" />
        <SubmitButton>Přidat technológii</SubmitButton>
      </Form>
    </Stack>
  );
};

export default Dashboard;
