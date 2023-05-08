import { Stack, Typography } from '@mui/material';
import { isEqual } from 'lodash-es';
import { useNavigate } from 'react-router-dom';

import OfferCard from 'components/offer/OfferCard.tsx';
import OfferFilter from 'components/offer/OfferFilter.tsx';
import useOfferFilter, {
  OfferFilterNames,
  OfferFilterSymbols,
} from 'hooks/useOfferFilter.ts';
import { sortOffersByTopped } from 'utils/index.ts';

const Home = () => {
  const navigate = useNavigate();
  const { filter, setFilter, offers, buttons } = useOfferFilter();

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={900}>
          FILTROVÁNÍ
        </Typography>
        {Object.keys(buttons).map((k) => (
          <Stack key={k} spacing={1}>
            <Typography>
              <strong>{OfferFilterNames[k as OfferFilterSymbols]}</strong>
            </Typography>
            <Stack direction="row" gap={1} maxWidth="80%" flexWrap="wrap">
              {buttons[k as OfferFilterSymbols].map((v) => (
                <OfferFilter
                  key={`${v.label}-${k}`}
                  label={v.label}
                  active={filter[k as OfferFilterSymbols].includes(v.value)}
                  onClick={() =>
                    filter[k as OfferFilterSymbols].includes(v.value)
                      ? setFilter((prev) => ({
                          ...prev,
                          [k]: prev[k as OfferFilterSymbols].filter(
                            (f) => !isEqual(f, v.value),
                          ),
                        }))
                      : setFilter((prev) => ({
                          ...prev,
                          [k]: [...prev[k as OfferFilterSymbols], v.value],
                        }))
                  }
                />
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={900}>
          PRACOVNÍ NABÍDKY
        </Typography>
        {offers.sort(sortOffersByTopped).map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onClick={() => navigate(`/offers/${offer.id}`)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Home;
