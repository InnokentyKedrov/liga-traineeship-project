import { StyledFooter, StyledLink, StyledTypografy } from 'src/components/Footer/Footer.styles';

const Footer: React.FC = () => {
  return (
    <StyledFooter component="footer">
      <StyledLink href="https://github.com/InnokentyKedrov">Andrey Lavrjonov</StyledLink>
      <StyledTypografy>© 2023</StyledTypografy>
    </StyledFooter>
  );
};

export default Footer;
