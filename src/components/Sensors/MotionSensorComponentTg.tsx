// import React, { useEffect, useState } from 'react';

// const MotionSensorComponent = () => {
//   const [motionData, setMotionData] = useState(null);
  
//   useEffect(() => {

//     // Проверяем, что мы в Telegram Mini App
//     if (window.Telegram && window.Telegram.WebApp) {
//       const tg = window.Telegram.WebApp;

//     //   try {
//     //     tg.enableDeviceMotion();
//     //     } catch (error) {
//     //     console.error('Ошибка доступа к датчикам:', error);
//     //     // Показать пользователю сообщение об ошибке
//     //     }
      
//     //   // Запрашиваем разрешение на доступ к датчикам
//     //   tg.requestPermission('motion', (granted) => {
//     //     if (granted) {
//     //       // Подписываемся на данные датчиков
//     //       tg.listenEvent('device_motion', (eventData) => {
//     //         setMotionData(eventData);
//     //       });
          
//     //       // Включаем датчики
//     //       tg.enableDeviceMotion();
//     //     } else {
//     //       console.log('Доступ к датчикам движения не предоставлен');
//     //     }
//     //   });
//     }
    
//     return () => {
//       // Отписываемся от событий при размонтировании
//       if (window.Telegram && window.Telegram.WebApp) {
//         window.Telegram.WebApp.disableDeviceMotion();
//       }
//     };
//   }, []);
  
//   return (
//     <div>
//       <h2>Данные датчика движения</h2>
//       {motionData ? (
//         <pre>{JSON.stringify(motionData, null, 2)}</pre>
//       ) : (
//         <p>Ожидание данных датчика...</p>
//       )}
//     </div>
//   );
// };

// export default MotionSensorComponent;