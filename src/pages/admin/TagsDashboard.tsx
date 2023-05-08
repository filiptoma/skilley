import { Delete, MoreVert } from '@mui/icons-material';
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { nanoid } from 'nanoid';
import { useState } from 'react';

import Form from 'components/form/Form.tsx';
import SubmitButton from 'components/form/SubmitButton.tsx';
import TextInput from 'components/form/TextInput.tsx';
import { Tag, addTag, deleteTag, tagsCollection } from 'firebase/database.ts';
import { useSnapshot } from 'hooks/useSnapshot.ts';
import { NewTagSchema } from 'utils/schemas.ts';

const Actions = (props: { tag: Tag }) => {
  const { tag } = props;

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <>
      <IconButton onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <MenuItem
          onClick={async () => {
            setMenuAnchorEl(null);
            await deleteTag(tag.id);
          }}
        >
          <ListItemIcon sx={{ color: (t) => t.palette.error.main }}>
            <Delete />
          </ListItemIcon>
          <ListItemText>Vymazat</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

const TagsDashboard = () => {
  const [tags] = useSnapshot(tagsCollection);

  return (
    <Stack spacing={6}>
      <Typography variant="h5" fontWeight={900}>
        Technologie
      </Typography>
      <Paper variant="outlined" sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography fontWeight={700}>Název technologie</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tags.map((tag) => (
                <TableRow
                  key={tag.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell padding="checkbox">
                    <Actions tag={tag} />
                  </TableCell>
                  <TableCell>{tag.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Box maxWidth="40%">
        <Form
          schema={NewTagSchema}
          onSubmit={async (v) => {
            const id = nanoid();
            await addTag(id, { id, name: v.name });
          }}
        >
          <TextInput id="name" label="Název technologie" />
          <SubmitButton>Přidat</SubmitButton>
        </Form>
      </Box>
    </Stack>
  );
};

export default TagsDashboard;
