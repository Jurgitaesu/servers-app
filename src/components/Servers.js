import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Servers = () => {
  const [servers, setServers] = useState([]);
  const token = useSelector((state) => state.token.value);

  useEffect(() => {
    if (token) {
      fetchServers();
    }
  }, [token]); // eslint-disable-line

  const fetchServers = async () => {
    const response = await fetch('https://playground.tesonet.lt/v1/servers', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.length > 0) {
      setServers(data);
    }
  };

  const sortListAscending = (arg) => {
    const sortedList = [...servers];
    sortedList.sort((a, b) => {
      if (a[arg] < b[arg]) {
        return -1;
      }
      if (a[arg] > b[arg]) {
        return 1;
      }
      return 0;
    });
    setServers(sortedList);
  };

  const sortListDescending = (arg) => {
    const sortedList = [...servers];
    sortedList.sort((a, b) => {
      if (a[arg] > b[arg]) {
        return -1;
      }
      if (a[arg] > b[arg]) {
        return 1;
      }
      return 0;
    });
    setServers(sortedList);
  };

  return (
    <div>
      {servers.length > 0 ? (
        <div>
          <h1 className="py-20">Servers list</h1>
          <div className="d-flex space-btw bg-grey table-row">
            <h3 className="bg-grey">
              Name{' '}
              <span className="bg-grey cursor" onClick={() => sortListAscending('name')}>
                🡣
              </span>
              <span className="bg-grey cursor" onClick={() => sortListDescending('name')}>
                🡡
              </span>
            </h3>
            <h3 className="bg-grey">
              Distance{' '}
              <span className="bg-grey cursor" onClick={() => sortListAscending('distance')}>
                🡣
              </span>
              <span className="bg-grey cursor" onClick={() => sortListDescending('distance')}>
                🡡
              </span>
            </h3>
          </div>
          {servers.map((server, index) => {
            return (
              <div key={index} className="d-flex space-btw table-row">
                <div>{server.name}</div>
                <div>{server.distance}</div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Servers;
