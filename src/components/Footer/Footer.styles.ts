import { styled } from '@mui/material/styles';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import githubIcon from 'src/assets/icons/github.png';

export const StyledFooter = styled(Box)(() => ({
  zIndex: '10',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '1280px',
  height: '5rem',
  margin: '0 auto',
  padding: '0 5rem',
  backgroundColor: 'var(--main-color)',
}));

export const StyledLink = styled(Button)(() => ({
  padding: '0',
  paddingLeft: '3rem',
  backgroundImage: `url(${githubIcon})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left',
  backgroundSize: '2rem 2rem',
  transition: 'transform 0.4s ease-in-out',
  fontSize: '1.5rem',
  color: '#fff',
  textTransform: 'capitalize',
  fontFamily: "'Space Grotesk', Arial, sans-serif",
  '&:hover': {
    cursor: 'pointer',
    transform: 'scale(1.2)',
    color: '#fff',
    backgroundColor: 'var(--main-color)',
  },
  '&:active': {
    transform: 'scale(1)',
  },
}));

export const StyledTypografy = styled(Box)(() => ({
  fontSize: '1.5rem',
  color: '#fff',
}));
