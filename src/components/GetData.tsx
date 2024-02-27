import { useState, useEffect } from 'react';
import {getUser } from 'src/apis/api';
import { UserData } from './TypesData';
import "../components/getdata.css"

const GetData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);


  const getUserData = async () => {
    try {
      const data = await getUser();
      setUserData(data);
      setLoading(false);
      localStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  useEffect(() => {
    getUserData();
  }, []);

  const { name, email, picture } = userData || {};
  const { title, first, last } = name || {};
  const { large } = picture || {};

  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await getUser();
      setUserData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className='user_main'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='user_data'>
          <h2 className='user_title'>{`${title} ${first} ${last}`}</h2>
          <p className='usermail'>Email: {email}</p>
          <img src={large} alt="User" />
          <div>
          <button className='user_button' onClick={refreshData}>Refresh</button>
          </div>
        </div>
      )}
    </div>

  );
};

export default GetData;
