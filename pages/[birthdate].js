import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../components/layout';
import DateInput from '../components/dateInput';
import Displayer from '../components/Displayer';

const Birthdate = () => {
  const {
    query: { birthdate }
  } = useRouter();

  const [data, setData] = useState([]);
  const asyncExecutor = async () => {
    const [y, m, d] = birthdate.split('-');
    await Promise.all(
      ['anime', 'manga'].map(type =>
        fetch(
          `https://api.jikan.moe/v3/search/${type}?start_date=${y}-${m}-${d}&sort=asc&order_by=start_date`
        )
          .then(resp => resp.json())
          .then(res => res.results)
      )
    ).then(data => {
      setData(data);
    });
  };
  useEffect(() => {
    asyncExecutor();
  }, []);

  return (
    <Layout>
      <DateInput setData={setData} />
      {data && data.length > 0 ? <Displayer data={data} /> : null}
    </Layout>
  );
};

export default Birthdate;
