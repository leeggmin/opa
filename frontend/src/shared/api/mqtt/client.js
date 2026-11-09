import mqtt from 'mqtt';

/**
 * Mqtt class
 */
export class MqttClient {
  constructor(path, user, pass) {
    this.client = null; //클라이언트
    this.url = path; //주소
    this.sub = []; //토픽 한주소면 배열가능
    this.callback = () => {}; //message 올때 콜백 함수(사용자함수)
    this.conCallback = () => {}; // connect 콜백
    this.reConCallback = () => {}; // 재연결 콜백
    this.errCallback = () => {}; //에러콜백
    this.config = {
      url: path,
      options: {
        username: user,
        password: pass,
        keepalive: 30,
        protocolId: 'MQTT',
        protocolVersion: 4,
        clean: true,
        reconnectPeriod: 1000,
        connectTimeout: 30 * 1000,
        will: {
          topic: 'WillMsg',
          payload: 'Connection Closed abnormally..!',
          qos: 0,
          retain: false,
        },
        rejectUnauthorized: false,
      },
    };
  }
  /**
   * Mqtt 연결
   */
  conn = (/*path, user, pass*/) => {
    const { url, options } = this.config;
    this.client = mqtt.connect(url, options);
    this.client.on('connect', (e) => {
      mq.conCallback(e);
    });
    this.client.on('error', (err) => {
      mq.errCallback(err);
      this.client.end();
    });
    this.client.on('reconnect', (e) => {
      mq.reConCallback(e);
    });
    this.client.on('end', () => {});
    this.client.on('message', (topic, message) => {
      mq.callback(topic, message.toString());
    });
  };
  //커넥트이벤트는 전부콜백필요
  onConnect = (callback) => {
    this.conCallback = callback;
  }; 
  onError = (callback) => {
    this.errCallback = callback;
  };
  onReconnect = (callback) => {
    this.reConCallback = callback;
  };
  /**
   * 메세지 받는 메서트
   */
  onMessage = (callback) => {
    this.callback = callback;
  };

  /**
   * Mqtt 연결 해제
   */
  async onDisConnect() {
    return new Promise((resolve) => {
      if (this.client) {
        this.client.end();
      } else {
        resolve();
      }
    });
  }
  getUrl = () => {
    return this.url;
  };
  getSub = () => {
    return this.sub;
  };
  /**
   * 토픽 설정
   */
  setSub = (record) => {
    this.sub.push(record);
    if (this.client == null) {
      return;
    }
    const { topic, qos } = record;
    this.client.subscribe(topic, { qos }, (error) => {
      if (error) {
        return;
      }
    });
  };
  /**
   * 토픽 해제
   */
  setUnSub = (record) => {
    if (this.client == null) {
      return;
    }
    const { topic } = record;
    this.client.unsubscribe(topic, (error) => {
      if (error) {
        return;
      }
    });
  };
  /**
   *  메세지 전송
   */
  setPub = (record, context) => {
    if (this.client == null) {
      return;
    }
    const { topic, qos } = record;
    const payload = context;
    this.client.publish(topic, payload, { qos });
  };
  /**
   * mqtt 삭제
   */
  destory = (record) => {
    if (this.client == null) {
      return;
    }
    this.setUnSub(record);
    this.onDisConnect();
  };
}

export default MqttClient;
