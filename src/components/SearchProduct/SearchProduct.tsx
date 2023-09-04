import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Box } from '@mui/material';
import { SearchListData } from './SearchListData';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export function SearchProduct() {
  const [valueSearch, setValueSearch] = useState<string>('');
  const [inputMode, setInputMode] = useState<boolean>(false);
  const [resultSearch, setResultSearch] = useState<boolean>(false);

  return (
    <Box sx={{ position: 'relative' }}>
      <Search
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minWidth: '300px',
        }}
      >
        <SearchIcon onClick={() => setResultSearch(true)} />
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          value={valueSearch}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValueSearch(event.target.value);
            setInputMode(true);
          }}
          onBlur={() => {
            if (!valueSearch.length) {
              setInputMode(false);
            }
            setResultSearch(false);
          }}
        />
        {inputMode && <CloseIcon onClick={() => setValueSearch('')} />}
      </Search>
      <Box sx={{ position: 'absolute', top: '35px', left: '60px', width: '200px', zIndex: '1000' }}>
        {resultSearch && <SearchListData valueSearch={valueSearch} />}
      </Box>
    </Box>
  );
}
