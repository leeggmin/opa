import { useState, useRef, useEffect } from 'react';

import { MqttClient as Mqtt } from '@/shared/api';
const enums = {
  'call2/stt/1002': 'stt',
  'call2/location/1002': '사고위치',
  'call2/incidentType/1002': '종별',
  'call2/urgency/1002': '긴급도',
  'call2/end/1002': '종료',
  'call2/info/1002': '시작',
  'call2/recQuestion/1002': '추천질의',
  //call3
  'call3/stt/1002': 'stt',
  'call3/llm/1002': 'llm',
  'call3/location/1002': '사고위치',
  'call3/incidentType/1002': '종별',
  'call3/urgency/1002': '긴급도',
};

export default function MqttSample() {
  const [id, setId] = useState('');
  const [mqtopicset, setMqTopicset] = useState('');
  const [mqdataset, setMqDataset] = useState('');
  const [callbotText, setCallbotText] = useState(
    '현재 정확한 화재 위치가 어디신가요? 신고자분은 안전한곳에 계신가요?',
  );
  const [callerText, setCallerText] = useState('여기 화재가 났어요!!');

  const [mq, setMq] = useState(null);
  const [mqSubscribeData, setMqSubscribeData] = useState('');
  const [mqtopic, setMqTopic] = useState('');
  const refMq = useRef();
  const topic1 = 'call2/+/1002/#';
  const topic2 = 'call3/#';
  useEffect(() => {
    refMq.current = mq;
  });
  useEffect(() => {
    // let newMq = new Mqtt( import.meta.env.VITE_INTERNAL_MQTT_URL,'','')// stt꺼
    let newMq = new Mqtt('wss://svc-mq.cloud-winitech.com:28084/mqtt', '', ''); // 우리팀꺼
    setMq(newMq); // 우리팀꺼

    return () => {
      try {
        setMq(null);
        if (refMq.current == null) return;
        refMq.current.onDisConnect();
      } catch {
        // 정리 중 오류 무시
      }
    };
  }, []);
  useEffect(() => {
    //setMq(new Mqtt(`ws://192.168.110.230:9097/mqtt`,'winirnd','winitech@12345'));
    if (mq == null) return;
    mq.conn();
    mq.setSub({ topic: topic2, qos: 0 });
    mq.setSub({ topic: topic1, qos: 0 });
    // mq.setSub({topic: 'call3/+' ,qos:0})
    mq.onMessage((topic, data) => {
      mqdata(topic, data);
    });
  }, [mq]);
  const mqdata = (topic, data) => {
    setMqTopic(topic);
    setMqSubscribeData(JSON.parse(data));
  };
  const sendMqtt = () => {
    if (mq == null) return;
    // mq.setPub({topic: topic2 ,qos:0},JSON.stringify({test:'보내는데이터'}))
  };

  const EndCallButton = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      { topic: 'call2/end/1002', qos: 0 },
      JSON.stringify({
        date: '',
        callerNo: '1000',
        calleeNo: '1001',
        session: id,
        type: 'start',
      }),
    );
  };
  const StartCallButton = () => {
    mq.setPub(
      { topic: 'call2/info/1002', qos: 0 },
      JSON.stringify({
        date: '',
        callerNo: '1000',
        calleeNo: '1001',
        session: id,
        type: 'end',
      }),
    );
  };

  const locationButton1 = () => {
    // if( id=='') alert('session id를 입력하세요')
    //동대구역
    mq.setPub(
      {
        topic: 'call2/location/1002',
        qos: 0,
      },
      JSON.stringify({
        lat: '35.882828162565325',
        lon: '128.62631304037208',
        session: id,
        address_e: '동대구역 화성 파크 드림',
      }),
    );
  };
  const locationButton2 = () => {
    // if( id=='') alert('session id를 입력하세요')
    //반월당
    mq.setPub(
      {
        topic: 'call2/location/1002',
        qos: 0,
      },
      JSON.stringify({
        lat: '35.866680509213374',
        lon: '128.59062288793402',
        session: id,
        address_e: '반월당 현대백화점',
      }),
    );
  };
  const locationButton3 = () => {
    // if( id=='') alert('session id를 입력하세요')
    //exco
    mq.setPub(
      {
        topic: 'call2/location/1002',
        qos: 0,
      },
      JSON.stringify({
        lat: '35.90710622559365',
        lon: '128.61105700871613',
        session: id,
        address_e: '검단 인터불고 호텔',
      }),
    );
  };
  const locationButton4 = () => {
    //경대
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call2/location/1002',
        qos: 0,
      },
      JSON.stringify({
        lat: '35.89188483440969',
        lon: '128.61215365460055',
        session: id,
        address_e: '경북대학교 도서관',
      }),
    );
  };
  const callerStt = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/stt/1002',
        qos: 0,
      },
      JSON.stringify({
        stt: callerText == '' ? '여기 화재가 났어요요!!' : callerText,
        callerOrCallee: '0',
        callerNo: '1000',
        calleeNo: '1002',
        session: id,
        date: '20240812104918',
        sid: '0',
        stype: '1',
      }),
    );
  };
  const callbotStt = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/llm/1002',
        qos: 0,
      },
      JSON.stringify({
        stt: callbotText == '' ? '현재 정확한 위치가 어디신가요?' : callbotText,
        callerOrCallee: '1',
        callerNo: '',
        calleeNo: '',
        session: id,
        date: '20240812104918',
        sid: '0',
        stype: '1',
      }),
    );
  };
  const locationCall3_1 = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/location/1002',
        qos: 0,
      },
      JSON.stringify({
        lat: '35.90710622559365',
        lon: '128.61105700871613',
        session: id,
        address_e: '검단 인터불고 호텔',
      }),
    );
  };
  const locationCall3_2 = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/location/1002',
        qos: 0,
      },
      JSON.stringify({
        lat: '35.89188483440969',
        lon: '128.61215365460055',
        session: id,
        address_e: '경북대학교 도서관',
      }),
    );
  };
  const locationCall3_3 = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/location/1002',
        qos: 0,
      },
      JSON.stringify({
        lat: '35.866680509213374',
        lon: '128.59062288793402',
        session: id,
        address_e: '반월당 현대백화점',
      }),
    );
  };
  const locationCall3_4 = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/location/1002',
        qos: 0,
      },
      JSON.stringify({
        lat: '35.882828162565325',
        lon: '128.62631304037208',
        session: id,
        address_e: '동대구역 화성 파크 드림',
      }),
    );
  };
  const kindSettingCallbot = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/incidentType/1002',
        qos: 0,
      },
      JSON.stringify({
        session: id,
        incidentType: [
          {
            category: '화재',
            sub_category: '위험물 화재',
            probability: 100,
            explanation:
              "신고자가 '페인트 공장 혼합 탱크가 터지면서 불이 났다'고 하여 유기용제 등 위험물 관련 시설에서의 폭발 및 화재 상황임을 명확히 함.",
          },
        ],
      }),
    );
  };
  const kindSettingCallbot2 = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/incidentType/1002',
        qos: 0,
      },
      JSON.stringify({
        session: id,
        incidentType: [
          {
            category: '기타',
            sub_category: '기타',
            probability: 100,
            explanation:
              "신고자가 '페인트 공장 혼합 탱크가 터지면서 불이 났다'고 하여 유기용제 등 위험물 관련 시설에서의 폭발 및 화재 상황임을 명확히 함.",
          },
        ],
      }),
    );
  };
  const kindSettingCallbot3 = () => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/incidentType/1002',
        qos: 0,
      },
      JSON.stringify({
        session: id,
        incidentType: [
          {
            category: '구조',
            sub_category: '통물포획',
            probability: 80,
            explanation:
              "신고자가 '페인트 공장 혼합 탱크가 터지면서 불이 났다'고 하여 유기용제 등 위험물 관련 시설에서의 폭발 및 화재 상황임을 명확히 함.",
          },
          {
            category: '기타',
            sub_category: '기타',
            probability: 20,
            explanation:
              "신고자가 '페인트 공장 혼합 탱크가 터지면서 불이 났다'고 하여 유기용제 등 위험물 관련 시설에서의 폭발 및 화재 상황임을 명확히 함.",
          },
        ],
      }),
    );
  };

  const levelCallbot = (level) => {
    // if( id=='') alert('session id를 입력하세요')
    mq.setPub(
      {
        topic: 'call3/urgency/1002',
        qos: 0,
      },
      JSON.stringify({
        session: id,
        urgency: level == '0' ? '비긴급' : `대응 ${level}단계`, //"대응 0단계"=>"비긴급"으로 바꿔야함
      }),
    );
  };
  const buttonStyle = {
    border: '1px solid gray',
    borderRadius: 5,
    margin: 3,
    padding: 2,
  };
  return (
    <div style={{ padding: 10 }}>
      {/* <div>
                <button onClick={sendMqtt}>보내기</button>
            </div> */}
      <div style={{ height: 300, overflowY: 'auto' }}>
        <span>
          topic: {mqtopic} {enums[mqtopic] == false ? '' : enums[mqtopic]}
        </span>
        <div>받은 메세지</div>
        <span>
          {Object.keys(mqSubscribeData).map((item, idx) => {
            return (
              <div key={idx}>
                {item} : {JSON.stringify(mqSubscribeData[item])}
              </div>
            );
          })}
        </span>
      </div>
      ------------------------------------------------------------
      <br />
      mqlist <br />
      ------------------------------------------------------------
      <br />
      <div>
        <input
          type="text"
          onChange={(e) => {
            setId(e.target.value);
          }}
          label="session"
          style={{ width: 400 }}
        />
      </div>
      <div>
        사고위치 mq
        <br />
        <button style={buttonStyle} onClick={locationButton1}>
          {' '}
          동대구역 화성 파크드림
        </button>
        <button style={buttonStyle} onClick={locationButton2}>
          {' '}
          더현대
        </button>
        <button style={buttonStyle} onClick={locationButton3}>
          {' '}
          exco
        </button>
        <button style={buttonStyle} onClick={locationButton4}>
          {' '}
          경북대학교
        </button>
      </div>
      <div>
        <button style={buttonStyle} onClick={StartCallButton}>
          {' '}
          신고시작
        </button>
        <button style={buttonStyle} onClick={EndCallButton}>
          {' '}
          신고종료
        </button>
      </div>
      ------------------------------------------------------------
      <br />
      callbot용
      <br />
      ------------------------------------------------------------
      <br />
      <div>
        세션아이디는 저 텍스트 박스 공유중
        <br />
        신고자
        <input
          type="text"
          onChange={(e) => {
            setCallerText(e.target.value);
          }}
          label="session"
          style={{ width: 400 }}
          value={callerText}
        />
        <button style={buttonStyle} onClick={callerStt}>
          전송
        </button>
        <br />
        콜보옷
        <input
          type="text"
          onChange={(e) => {
            setCallbotText(e.target.value);
          }}
          label="session"
          style={{ width: 400 }}
          value={callbotText}
        />
        <button style={buttonStyle} onClick={callbotStt}>
          전송
        </button>
      </div>
      <button style={buttonStyle} onClick={kindSettingCallbot}>
        종별(화재)
      </button>
      <button style={buttonStyle} onClick={kindSettingCallbot2}>
        종별(기타)
      </button>
      <button style={buttonStyle} onClick={kindSettingCallbot3}>
        종별(구조8/기타2)
      </button>
      <br />
      <button style={buttonStyle} onClick={locationCall3_1}>
        사고위치(exco)
      </button>
      <button style={buttonStyle} onClick={locationCall3_2}>
        사고위치(경대)
      </button>
      <button style={buttonStyle} onClick={locationCall3_3}>
        사고위치(현백)
      </button>
      <button style={buttonStyle} onClick={locationCall3_4}>
        사고위치(동대구화성)
      </button>
      <br />
      <button
        style={buttonStyle}
        onClick={() => {
          levelCallbot('0');
        }}
      >
        긴급도(비긴급)
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          levelCallbot('1');
        }}
      >
        긴급도(1)
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          levelCallbot('2');
        }}
      >
        긴급도(2)
      </button>
      <button
        style={buttonStyle}
        onClick={() => {
          levelCallbot('3');
        }}
      >
        긴급도(3)
      </button>
      <br />
      ------------------------------------------------------------
      <br />
      {/* 그냥보내기<br/>
            토픽
                <input type = "text" onChange={((e)=>{setMqTopicset(e.target.value)})} label='session' style={{width:400}} value={mqtopicset}/><br/>
            내용
            <textarea rows={10} onChange={(e)=>{setMqDataset(e.target.value)}} style={{width:400}} value = {mqdataset}/><br/>
            <button style={buttonStyle} onClick={()=>{
                let data = JSON.parse(mqdataset.replace(/'/g,'"'))
                mq.setPub({topic: mqtopicset ,qos:0}, JSON.stringify(data))
                // mq.setPub({topic: mqtopicset ,qos:0}, JSON.stringify(mqdataset.replace(/\n/g,'').replace(/ /g,'').replace(/'/g,'"')))
            }}>전송</button><br/> */}
    </div>
  );
}
