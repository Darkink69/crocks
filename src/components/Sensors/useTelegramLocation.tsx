import { useEffect, useState } from 'react';

// Типы для местоположения
type Location = {
  latitude: number;
  longitude: number;
  accuracy?: number;
};

// Типы для Telegram WebApp
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        requestPermission(arg0: string, arg1: (granted: any) => void): unknown;
        isLocationRequested: boolean;
        sendData: (data: string) => void;
        onEvent: (event: string, callback: (data: string) => void) => void;
        offEvent: (event: string, callback: (data: string) => void) => void;
      };
    };
  }
}

export const useTelegramLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Функция для запроса местоположения через Telegram API
  const requestTelegramLocation = () => {
    if (!window.Telegram?.WebApp) {
      setError('Telegram WebApp API не доступен');
      return;
    }

    const tg = window.Telegram.WebApp;
    setIsLoading(true);
    setError(null);

    if (tg.isLocationRequested) {
      const handleLocationChanged = (data: string) => {
        try {
          const loc = JSON.parse(data) as Location;
          setLocation(loc);
          tg.offEvent('locationChanged', handleLocationChanged);
        } catch (e) {
          setError('Ошибка парсинга местоположения');
        } finally {
          setIsLoading(false);
        }
      };

      tg.onEvent('locationChanged', handleLocationChanged);
      tg.sendData(JSON.stringify({ command: 'request_location' }));
    } else {
      setError('Функция запроса местоположения не доступна');
      setIsLoading(false);
    }
  };

  // Функция для запроса местоположения через браузерное API
  const requestBrowserLocation = () => {
    if (!navigator.geolocation) {
      setError('Геолокация не поддерживается браузером');
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setIsLoading(false);
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
      }
    );
  };

  // Автоматически запрашиваем местоположение при монтировании
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      requestTelegramLocation();
    } else {
      requestBrowserLocation();
    }

    return () => {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.offEvent('locationChanged', () => {});
      }
    };
  }, []);

  return { location, error, isLoading, requestTelegramLocation, requestBrowserLocation };
};

// Пример использования компонента
export const LocationComponent = () => {
  const { location, error, isLoading, requestTelegramLocation, requestBrowserLocation } = useTelegramLocation();

  return (
    <div className='text-black'>
      <h2>Информация о местоположении</h2>
      
      {isLoading && <p>Загрузка местоположения...</p>}
      
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
      
      {location && (
        <div>
          <p>Широта: {location.latitude}</p>
          <p>Долгота: {location.longitude}</p>
          {location.accuracy && <p>Точность: {location.accuracy} метров</p>}
        </div>
      )}
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={requestTelegramLocation} disabled={isLoading || !window.Telegram?.WebApp}>
          Запросить через Telegram
        </button>
        <button onClick={requestBrowserLocation} disabled={isLoading}>
          Запросить через браузер
        </button>
      </div>
    </div>
  );
};