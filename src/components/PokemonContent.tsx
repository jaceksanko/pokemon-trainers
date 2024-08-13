import { Box, Typography } from '@mui/material';
import { IPokemon } from './form/FormAutocomplete';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TypeLabel } from './TypeLabel';
import { useErrorBoundary } from 'react-error-boundary';
import { Loader } from './Loader';

const ImageLoader = () => {
  return (
    <Box width={194} height={196} display="flex" justifyContent="center" alignItems="center">
      <Loader />
    </Box>
  );
};

export const PokemonContent = ({ pokemonData }: { pokemonData: IPokemon | null }) => {
  const [image, setImage] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [baseExperience, setBaseExperience] = useState<number | null>(null);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (pokemonData) {
      (async () => {
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData?.id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch pokemon data');
          }
          const data = await res.json();

          setImage(data.sprites.front_default);
          setTypes(data.types.map((typeInfo: any) => typeInfo.type.name));
          setBaseExperience(data.base_experience);
        } catch (error) {
          console.error('Error fetching Pokémon data:', error);
          showBoundary(error);
        }
      })();
    }
  }, [pokemonData, pokemonData?.id]);

  if (!pokemonData) {
    return (
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'grey.400',
          borderRadius: '2px',
          p: '10px',
          height: '254px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="body2">Your pokemon</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { sx: '1fr', sm: '1fr 1fr' },
        border: '1px solid',
        borderColor: 'grey.400',
        borderRadius: '2px',
        p: '10px',
        justifyContent: 'center',
        gap: '24px'
      }}
    >
      {image ? <Image src={image} alt={'Pokemon image'} width={194} height={196} /> : <ImageLoader />}
      <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
        <Typography variant="body1" textTransform="capitalize">
          Name: {pokemonData?.name}
        </Typography>
        <Typography variant="body1" textTransform="capitalize" sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          Type:{' '}
          {types.map((type, index) => (
            <TypeLabel key={index} type={type} />
          ))}
        </Typography>
        <Typography variant="body1">Base experience: {baseExperience}</Typography>
        <Typography variant="body1">Id: {pokemonData?.id}</Typography>
      </Box>
    </Box>
  );
};
