import { useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';

const useWalletSocket = (userId, onWalletUpdate) => {
  const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');

  const handleWalletUpdate = useCallback((data) => {
    if (onWalletUpdate) {
      onWalletUpdate(data);
    }
  }, [onWalletUpdate]);

  useEffect(() => {
    if (!userId) return;

    // Listen for wallet updates
    socket.on(`wallet-update-${userId}`, handleWalletUpdate);

    return () => {
      socket.off(`wallet-update-${userId}`, handleWalletUpdate);
      socket.disconnect();
    };
  }, [userId, handleWalletUpdate, socket]);

  return socket;
};

export default useWalletSocket; 