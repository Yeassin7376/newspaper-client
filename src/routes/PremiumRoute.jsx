import React from 'react';
import { Navigate } from 'react-router';
import useUserProfile from '../hooks/useUserProfile';
import useAuth from '../hooks/useAuth';
import Loading from '../shared/Loading/Loading';

const PremiumRoute = ({ children }) => {
  const { isLoading: authLoading } = useAuth();
  const { userFromDB, isLoading: profileLoading } = useUserProfile();

  // 💡 Wait until Firebase & profile are both fully loaded
  if (authLoading || profileLoading || !userFromDB) {
    return <Loading />;
  }

  // ✅ Parse date correctly and handle timezone/format issues
  const now = new Date();
  const expiresAt = new Date(userFromDB.premiumExpiresAt);

  const isPremium = userFromDB.premiumExpiresAt && !isNaN(expiresAt) && expiresAt > now;

  if (!isPremium) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default PremiumRoute;
