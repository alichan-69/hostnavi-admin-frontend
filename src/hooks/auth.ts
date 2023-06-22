import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const jwt = Cookies.get('X-AUTH-TOKEN') as string;
    let decodedJwt = null;
    if (jwt) {
      decodedJwt = jwt_decode<{
        iss: string;
        id: number;
      }>(jwt);
    }

    setUserId(decodedJwt?.id || null);
  }, [Cookies.get('X-AUTH-TOKEN')]);

  return { userId };
};
