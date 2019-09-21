import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../services/api';

import Logo from '../../../assets/Logo@default.svg';
import Desktop from './Desktop';
import Tablet from './Tablet';
import Mobile from './Mobile';
import {
  StyledHeader,
  Container,
  StyledLink,
  TabLink,
  TabeletNav,
} from './styles';

export default withRouter(function Header() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const [width, setWidth] = useState(window.innerWidth);
  const [invitationCount, setInvitationCount] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    async function loadInvitationCount() {
      const { data } = await api.get('/v1/teams/invites/me');

      setInvitationCount(data.length);
    }

    loadInvitationCount();
  }, []);

  let authMenu = <Desktop count={invitationCount} />;

  if (width < 960) {
    authMenu = <Tablet count={invitationCount} />;
  }

  if (width < 580) {
    authMenu = <Mobile count={invitationCount} />;
  }

  return (
    <>
      <StyledHeader>
        <Container>
          <Link to="/">
            <img src={Logo} alt="Hackatuning Logo" />
          </Link>

          <nav>
            {isAuth ? (
              authMenu
            ) : (
              <ul>
                <StyledLink to="/login">Login</StyledLink>
              </ul>
            )}
          </nav>
        </Container>
      </StyledHeader>
      {width < 960 && isAuth ? (
        <TabeletNav className="tablet">
          <TabLink to="/hackathons" className="left" activeClassName="selected">
            Hackathons
          </TabLink>
          <TabLink to="/teams" className="right" activeClassName="selected">
            Teams
          </TabLink>
        </TabeletNav>
      ) : null}
    </>
  );
});
