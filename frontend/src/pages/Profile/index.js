import React, { useEffect, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';
import LoadingScreen from '../../components/LoadScreen';
import api from '../../services/api';

import DefaultAvatar from '../../assets/default-user-image.png';
import { Container } from './styles';

export default function Profile({ match, history }) {
  const [loading, setLoading] = useState(true);
  const { nickname } = match.params;
  const [profile, setProfile] = useState({
    urls: [{ id: '', url: '' }],
    roles: [{ id: '', name: '' }],
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data } = await api.get(`/v1/users/${nickname}`);

        setProfile(data);
        setLoading(false);
      } catch (error) {
        history.push('/');
      }
    }

    loadProfile();
  }, [nickname, history]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <div className="profile__box">
        <img
          src={profile.avatar ? profile.avatar.url : DefaultAvatar}
          alt={profile.name}
        />

        <div className="profile__desc">
          <h1>{profile.name}</h1>
          <small>{profile.nickname}</small>

          <div className="participants__roles">
            {profile.roles.map(role => (
              <span key={role.id} className="participants__items">
                {role.name}
              </span>
            ))}
          </div>

          {profile.urls.map(url => (
            <div key={url.id} className="urls">
              <FaGlobe />{' '}
              <a href={url.url} target="_blank" rel="noopener noreferrer">
                {url.url}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="profile__content">
        <p>
          {profile.bio ? profile.bio : 'This user does not have a biography'}
        </p>
      </div>
    </Container>
  );
}
