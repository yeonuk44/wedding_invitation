import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';
import data from 'data.json';
import { useEffect, useState } from 'react';

const KakaoMap = () => {
  const { lat, lon } = data.mapInfo;

  const offsetLat = 0.0012; // 위쪽으로 이동
  const offsetLng = -0.002; // 왼쪽으로 이동

  const [loaded, setLoaded] = useState(false);

  const [error] = useKakaoLoader({
    appkey: import.meta.env.VITE_APP_KAKAOMAP_JAVASCRIPT_KEY,
    libraries: ['services', 'clusterer'],
  });

  // SDK가 로드되면 loaded = true
  useEffect(() => {
    if (!error) {
      setLoaded(true);
    }
  }, [error]);

  // 스켈레톤 스타일
  const skeletonStyle = {
    width: '100%',
    height: '230px',
    borderRadius: '8px',
    background: 'linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 40%, #f0f0f0 80%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  };

  return (
    <>
      {!loaded ? (
        <div style={skeletonStyle} />
      ) : (
        <Map
          center={{ lat: lat + offsetLat, lng: lon + offsetLng }}
          style={{ width: '100%', height: '230px' }}
          level={4}>
          <MapMarker position={{ lat, lng: lon }} />
        </Map>
      )}
    </>
  );
};

export default KakaoMap;
