import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import media from 'styled-media-query';
import { FormattedMessage } from 'react-intl';
import Router, { useRouter } from 'next/router';

const mobile = media.lessThan('small');
const desktop = media.greaterThan('small');

function isValidDate(dateString) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}

const Container = styled.div`
  text-align: center;
  height: 50vh;

  ${desktop`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  `};
  ${mobile`
    padding: 40px 10px;
  `};
`;

const DescriptionContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 10px;
`;

const Description = styled.span`
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: ${({ theme: { text, lighten } }) => lighten(0.3, text)};
  font-weight: 600;
`;

const InputContainer = styled.div`
  display: flex;
  width: 320px;
  margin: 0 auto;
  justify-content: space-between;
`;

const Input = styled.input`
  font-size: 1rem;
  letter-spacing: 2px;
  width: 100px;
  height: 30px;
  text-align: center;
  color: ${({ theme: { text, lighten } }) => lighten(0.3, text)};
  box-shadow: 0 0 2px 0
    ${({ theme: { boxShadow, lighten } }) => lighten(0.5, boxShadow)};
`;

const Search = styled.div`
  display: flex;
  width: 320px;
  margin: 50px auto;
`;

const Button = styled.button`
  font-size: 1.1rem;
  letter-spacing: 2px;
  width: 120px;
  height: 35px;
  text-align: center;
  margin: auto;
  color: ${({ theme: { text, lighten } }) => lighten(0.3, text)};
  box-shadow: 0 0 2px 0
    ${({ theme: { boxShadow, lighten } }) => lighten(0.5, boxShadow)};
`;

const DateInput = ({ setData }) => {
  const {
    query: { birthdate }
  } = useRouter();
  const [y, m, d] = (birthdate || '--').split('-');
  const [date, setDate] = useState({
    y,
    m,
    d
  });

  return (
    <Container>
      <DescriptionContainer>
        <Description>
          <FormattedMessage id="description" />
        </Description>
      </DescriptionContainer>
      <InputContainer>
        <Input
          type="text"
          maxLength="4"
          placeholder="YYYY"
          value={date.y}
          onChange={({ target }) => {
            if (Number.isInteger(Number(target.value))) {
              setDate({ ...date, y: target.value });
            }
          }}
        />
        <Input
          type="text"
          maxLength="2"
          placeholder="MM"
          value={date.m}
          onChange={({ target }) => {
            if (Number.isInteger(Number(target.value))) {
              setDate({ ...date, m: target.value });
            }
          }}
        />
        <Input
          type="text"
          maxLength="2"
          placeholder="DD"
          value={date.d}
          onChange={({ target }) => {
            if (Number.isInteger(Number(target.value))) {
              setDate({ ...date, d: target.value });
            }
          }}
        />
      </InputContainer>
      <Search>
        <Button
          onClick={async () => {
            if (!isValidDate(`${date.y}-${date.m}-${date.d}`)) return;
            Router.replace(`/[birthdate]`, `/${date.y}-${date.m}-${date.d}`);
            if (setData) {
              await Promise.all(
                ['anime', 'manga'].map(type =>
                  fetch(
                    `http://api.jikan.moe/v3/search/${type}?start_date=${date.y}-${date.m}-${date.d}&sort=asc&order_by=start_date`
                  )
                    .then(resp => resp.json())
                    .then(res => res.results)
                )
              ).then(data => {
                setData(data);
              });
            }
          }}
        >
          <FormattedMessage id="search" />
        </Button>
      </Search>
    </Container>
  );
};

DateInput.propTypes = {
  setData: PropTypes.func
};

export default DateInput;
