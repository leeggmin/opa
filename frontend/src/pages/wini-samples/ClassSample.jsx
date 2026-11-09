import { winiDate } from '@/shared/lib';
import { Component } from 'react';
class ClassSample extends Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      count: 0,
      time: null,
    };
  }

  clikcHandler = () => {
    // setState(count+1);
    this.setState((thisState) => {
      let state = { ...thisState };
      state.count = state.count + 1;
      return state;
    });
  };
  timeset = () => {
    this.setState((thisState) => {
      let state = { ...thisState };
      state.time = winiDate.now();
      return state;
    });
  };

  componentDidMount = () => {
    this.timeset();
  };
  
  //화면영역
  render() {
    return (
      <div>
        <div>화면영역</div>
        <p>State 예제 입니다.</p>
        <div>클릭수 {this.state.count}</div>
        <div>
          마지막 변경 시간{' '}
          {this.state.time == null
            ? ''
            : winiDate.dateFormat(this.state.time, 'YYYY-MM-DD HH:mm:ss')}
        </div>
        <button onClick={this.clikcHandler}> 클릭 </button>
      </div>
    );
  }
}

export default ClassSample;
