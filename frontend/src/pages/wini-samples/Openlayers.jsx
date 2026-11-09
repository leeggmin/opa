import { useState, useRef, useEffect } from 'react';

// openlayers
import './olyrs.css';
import { Feature, Image, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { defaults as defaultControls } from 'ol/control';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { LineString, Point, Circle } from 'ol/geom';
import { fromLonLat, toLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import { Icon, Stroke, Fill, Text } from 'ol/style';
import { Select } from 'ol/interaction';
import Overlay from 'ol/Overlay';
import { getDistance } from 'ol/sphere';
import { WiniBox, WiniButton } from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import iconX from '@/shared/assets/icons/circlex_r.png';

export default function Openlayers() {
  const mapEl = useRef();
  const animationRef = useRef();
  // const startCoord = fromLonLat([126.9784, 37.5665]); // 서울
  // const endCoord = fromLonLat([127.0276, 37.4979]);   // 강남
  const startCoord = [127.0276, 37.4979]; // 강남
  const endCoord = [126.9784, 37.5665]; // 서울

  const route = new LineString([startCoord, endCoord]);
  // routeRef.current = route;

  // 반경 (단위: degrees — EPSG:4326 기준이라서 km로 정확히 표현하려면 약간 보정 필요)
  const radiusDegrees = 0.01; // 대략 1km 정도 (위도 기준)
  const circleFeature = new Feature(new Circle(endCoord, radiusDegrees));
  circleFeature.setStyle(
    new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 2,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    }),
  );
  const routeFeature = new Feature({ geometry: route });
  routeFeature.setStyle(
    new Style({
      stroke: new Stroke({
        color: 'transparent', //'#ffcc33',
        // color: '#ffcc33',
        width: 1,
      }),
    }),
  );

  const pointFeature = new Feature({
    geometry: new Point(startCoord),
  });

  pointFeature.setStyle(
    new Style({
      image: new Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
        scale: 0.5,
        anchor: [0.5, 1],
      }),
    }),
  );
  const point = new Feature({
    geometry: new Point(endCoord),
  });

  point.setStyle(
    new Style({
      image: new Icon({
        src: 'https://openlayers.org/en/latest/examples/data/icons/emoticon-cool.svg',
        scale: 2,
        anchor: [0.5, 1],
      }),
      text: new Text({
        text: '사고지점',
        offsetY: 20,
        font: '14px Calibri,sans-serif',
        fill: new Fill({
          color: '#000',
        }),
      }),
    }),
  );

  const vectorSource = new VectorSource({
    features: [circleFeature, point, pointFeature, routeFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      stroke: new Stroke({
        color: '#ff0000',
        width: 2,
      }),
    }),
  });

  const [olMap, setolMap] = useState(
    new Map({
      target: null,
      controls: defaultControls({ attribution: false }),
      layers: [],
      view: new View({
        projection: 'EPSG:4326',
        // center: [107.851937, 4.633353],
        center: endCoord, //[126.9649, 37.53045],
        zoom: 13,
      }),
    }),
  );
  const baseMap = new TileLayer({
    source: new OSM(),
  });

  // const removeOverlay = (overlay) => {
  //     olMap.removeOverlay(overlay);
  // }

  // const removeAllOverlay = () => {
  //     while (olMap.getOverlays().getArray().length > 0) {
  //         olMap.removeOverlay(olMap.getOverlays().getArray()[0])
  //     }
  //     //타임아웃 다날리기
  //     Object.keys(timeoutInfo).map((id) => {
  //         timeoutInfo[id].timeid.map((item) => clearTimeout(item))
  //     })
  //     timeoutInfo = {};
  // }

  // 리사이즈 함수
  const observer = new ResizeObserver((entries) => {
    // 관찰 중인 배열 형식의 객체 리스트
    entries.forEach((entry) => {
      olMap.updateSize();
    });
  });

  //랜덤하게 해당 키로수에 따라 좌표 찍는 함수
  function generatePointsAround(center, radiusMeters, count = 8) {
    const [lon, lat] = center;
    const earthRadius = 6371000; // meters
    const points = [];

    for (let i = 0; i < count; i++) {
      const angle = (2 * Math.PI * i) / count;
      const dx = radiusMeters * Math.cos(angle);
      const dy = radiusMeters * Math.sin(angle);

      // 변환: 거리 → 위경도 (EPSG:4326 기준 단순 변환)
      const deltaLat = (dy / earthRadius) * (180 / Math.PI);
      const deltaLon =
        (dx / (earthRadius * Math.cos((lat * Math.PI) / 180))) *
        (180 / Math.PI);

      points.push([lon + deltaLon, lat + deltaLat]);
    }

    return points;
  }
  // 랜덤하게 해당 키로수에 따라 좌표 찍는 함수
  const randomPoint = () => {
    const random = new VectorSource({
      features: [],
    });
    const samplePoints = generatePointsAround(startCoord, 1000);
    for (let i = 0; i < samplePoints.length; i++) {
      const pointFeature = new Feature({
        geometry: new Point(samplePoints[i]),
      });

      pointFeature.setStyle(
        new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            scale: 0.5,
            anchor: [0.5, 1],
          }),
        }),
      );
      random.addFeature(pointFeature);
    }
    const features = new VectorLayer({
      source: random,
      // style: new Style({
      //     stroke: new Stroke({
      //     color: "#ff0000",
      //     width: 2,
      //     }),
      // }),
    });
    olMap.addLayer(features);
  };
  const movepin = () => {
    // 애니메이션 함수
    // 애니메이션: 선 따라 이동 (EPSG:4326 기준)
    const routeLength = getGeoLength(route); // EPSG:4326 길이 직접 계산
    let startTime;

    function moveFeature(event) {
      const elapsed = event.frameState.time - startTime;
      // const speed = 0.01; // degrees per second (rough estimate)
      const speed = 0.02;
      const distance = (speed * elapsed) / 1000;

      if (distance < 1) {
        const coord = route.getCoordinateAt(distance);
        pointFeature.getGeometry().setCoordinates(coord);
        olMap.render();
      } else {
        olMap.un('postrender', moveFeature);
      }
    }

    function startAnimation() {
      startTime = new Date().getTime();
      olMap.on('postrender', moveFeature);
      olMap.render();
    }

    setTimeout(startAnimation, 1000);
    // startAnimation()
  };
  useEffect(() => {
    olMap.updateSize();
  }, [mapEl]);

  useEffect(() => {
    olMap.setTarget(mapEl.current);
    olMap.addLayer(baseMap);
    olMap.addLayer(vectorLayer);

    //select function
    let selectMap = new Select({});
    olMap.addInteraction(selectMap);
    selectMap.on('select', function (e) {
      if (e.selected[0] === undefined) {
        return;
      } else {
        const target = e.selected[0].values_;
        fetchData(target);
      }
    });
    olMap.on('click', function (event) {
      let coordinated = toLonLat(event.coordinate);
      // coordinated[0] = coordinated[0].toFixed(6)
      // coordinated[1] = coordinated[1].toFixed(6)
      // // onClickEvent(coordinated)
      // popup.setPosition(event.coordinate);
      // olmap.addOverlay(popup);
      // if(props.onChange){
      //     props.onChange({latitude :coordinated[1], longitude:coordinated[0]})
      // }
    });

    observer.observe(mapEl.current); //리사이즈 지켜볼 친구적용

    return () => {
      olMap.setTarget(null);
    };
  }, []);
  const addoverlay = () => {
    olMap.getOverlays().clear(); // 전체지우기

    ////id 골라서 오버레이 지우기
    // olMap.getOverlays().getArray().forEach((item)=>{
    //     if(item.id=='aa'){
    //         olMap.removeOverlay(item)
    //     }
    // })
    const coordinate = [126.95402408447266, 37.57516889953613];
    const popupElement = document.createElement('div');
    popupElement.innerHTML = `<img src = ${iconX} style="width:50px"/>`;
    // popupElement.innerHTML=`<div class="spot_item" >
    //     <div class="radius_box" style="width: 500px; height: 500px;">
    //         <i class="item-gis ico ico-spot">사고 위치</i>
    //     </div>
    // </div>`;

    // const popupElement = document.createElement('i');
    // popupElement.className = 'icon1';

    let overlay = new Overlay({
      id: 'aa', //여기 아이디를 주면 오버레이 구분가능~!
      element: popupElement,
      position: coordinate,
      positioning: 'center-center',
    });
    olMap.addOverlay(overlay);
  };
  // 단순 거리 비율용 길이 계산 (EPSG:4326에서는 단위가 degree이므로 간단하게 계산)
  function getGeoLength(line) {
    const coords = line.getCoordinates();
    let total = 0;
    for (let i = 1; i < coords.length; i++) {
      const dx = coords[i][0] - coords[i - 1][0];
      const dy = coords[i][1] - coords[i - 1][1];
      total += Math.sqrt(dx * dx + dy * dy);
    }
    return total;
  }

  return (
    <WiniFormEmpty>
      오픈레이어스를 사용한 샘플입니다.
      <WiniBox display={'flex'} gap={1} sx={{ my: 1 }}>
        <WiniButton variant="contained" onClick={randomPoint}>
          랜덤포인트
        </WiniButton>
        <WiniButton variant="contained" onClick={movepin}>
          이동(이이동은 2개의 위경도를 찍고 직선을 그은다음 그직선에따라
          움직이도록 한것임)
        </WiniButton>
        <WiniButton variant="contained" onClick={addoverlay}>
          overlay
        </WiniButton>
      </WiniBox>
      <WiniBox sx={{ display: 'flex', flexGrow: 1 }}>
        <WiniBox
          name="map"
          /* className={'mapHeight'}*/ style={{
            width: window.innerWidth - 200,
            height: window.innerHeight - 200,
          }}
          ref={mapEl}
        >
          {/* <div className="area-gis-util">
                        <div className="area-btn">
                            <button className="btn-ico type-line-gray"><i className="item-ico ico-plus co-main">확대</i></button>
                            <button className="btn-ico type-line-gray"><i className="item-ico ico-minus co-main">축소</i></button>
                            <button className="btn-ico type-line-gray"><i className="item-ico ico-refresh2 co-main">새로고침</i></button>
                        </div>
                    </div> */}
        </WiniBox>
      </WiniBox>
    </WiniFormEmpty>
  );
}
