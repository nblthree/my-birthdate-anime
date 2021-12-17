import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import media from 'styled-media-query';
import { FormattedMessage } from 'react-intl';

const mobile = media.lessThan('small');
const desktop = media.greaterThan('small');

const Container = styled.div`
  text-align: center;
  min-height: 50vh;

  ${desktop`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

  `};
  ${mobile`
    padding: 40px 10px;
  `};
`;

const ListElement = styled.div`
  min-height: 500px;
  padding: 10px 0 10px 0;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 320px;
  margin: auto;
`;

const Type = styled.div`
  width: 320px;
  padding: 10px 0 50px 0;
  font-weight: 700;
  color: ${({ theme: { text, darken } }) => darken(0.3, text)};
  margin: auto;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin: auto;
`;

const Info = styled.div`
  width: 320px;
  padding 10px 0 50px 0;
  margin: auto;
`;

const Title = styled.div`
  width: 100%;
  padding: 5px 0 5px 0;
  color: ${({ theme: { text, lighten } }) => lighten(0.2, text)};
`;

const StartDate = styled.div`
  width: 100%;
  padding: 5px 0 5px 0;
  font-weight: 600;
  color: ${({ theme: { text, darken } }) => darken(0.5, text)};
`;

const Displayer = ({ data }) => {
  const [animeList, mangaList] = data;

  return (
    <Container>
      <div>
        <Type>
          <FormattedMessage id="anime" />
        </Type>
        {animeList?.slice(0, 5).map(value => (
          <ListElement key={value.mal_id}>
            <ImageContainer>
              <Img src={value.image_url} />
            </ImageContainer>
            <Info>
              <Title>{value.title}</Title>
              <StartDate>{value.start_date.split('T')[0]}</StartDate>
            </Info>
          </ListElement>
        ))}
      </div>
      <div>
        <Type>
          <FormattedMessage id="manga" />
        </Type>
        {mangaList?.slice(0, 5).map(value => (
          <ListElement key={value.mal_id}>
            <ImageContainer>
              <Img src={value.image_url} />
            </ImageContainer>
            <Info>
              <Title>{value.title}</Title>
              <StartDate>{value.start_date.split('T')[0]}</StartDate>
            </Info>
          </ListElement>
        ))}
      </div>
    </Container>
  );
};

Displayer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object))
};

export default Displayer;
