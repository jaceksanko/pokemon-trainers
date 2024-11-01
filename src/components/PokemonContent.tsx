import { Box, Typography } from '@mui/material';
import { IPokemon } from './form/FormAutocomplete';
import Image from 'next/image';
import { TypeLabel } from './TypeLabel';
import { useErrorBoundary } from 'react-error-boundary';
import { Loader } from './Loader';
import { useQuery } from '@tanstack/react-query';

const ImageLoader = () => {
  return (
    <Box width={194} height={196} display="flex" justifyContent="center" alignItems="center">
      <Loader />
    </Box>
  );
};

export const PokemonContent = ({ pokemonData }: { pokemonData: IPokemon | null }) => {
  const { showBoundary } = useErrorBoundary();
  const { data, error, isLoading } = useQuery({
    queryKey: ['pokemonData', pokemonData?.id],
    queryFn: async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonData?.id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch pokemon data');
      }
      return await res.json();
    },
    enabled: !!pokemonData?.id,
  });

  if (isLoading) return <Loader />;
  if (error) {
    showBoundary(error);
    console.error('Error fetching Pokémon data:', error);
  }

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
      {data?.sprites?.front_default ? (
        <Image src={data?.sprites?.front_default} alt={'Pokemon image'} width={194} height={196} />
      ) : (
        <ImageLoader />
      )}
      <Box sx={{ display: 'flex', alignItems: 'left', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
        <Typography variant="body1" textTransform="capitalize">
          Name: {pokemonData?.name}
        </Typography>
        <Typography variant="body1" textTransform="capitalize" sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          Type: {data?.types?.map((typeInfo: any, index: number) => <TypeLabel key={index} type={typeInfo.type.name} />)}
        </Typography>
        <Typography variant="body1">Base experience: {data?.base_experience}</Typography>
        <Typography variant="body1">Id: {pokemonData?.id}</Typography>
      </Box>
    </Box>
  );
};
