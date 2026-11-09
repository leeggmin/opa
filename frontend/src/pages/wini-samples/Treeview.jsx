import { useState, useRef, useEffect } from 'react';
import { Tree } from 'react-arborist';
// import styles from './CustomNode.module.css'
import {
  DescriptionIcon,
  FolderIcon,
  ArrowDropDownIcon,
  ArrowRightIcon,
} from '@/shared/lib';
// import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  WiniTypography,
  WiniTreeItem,
  WiniTreeView,
  WiniBox,
  WiniButton,
  WiniTreeCheckItem,
  WiniStack,
  WiniText,
  WiniDivider,
} from '@/shared/ui/wini';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';
import treedata from './treedata.json';
import { winiCom } from '@/shared/lib';
const data = [
  { id: '1', name: 'Unread', chk: true },
  { id: '2', name: 'Threads', chk: false },
  {
    id: '3',
    name: 'Chat Rooms',
    chk: false,
    children: [
      { id: 'c1', name: 'General', chk: false },
      { id: 'c2', name: 'Random', chk: false },
      { id: 'c3', name: 'Open Source Projects', chk: false },
    ],
  },
  {
    id: '4',
    name: 'Direct Messages',
    chk: false,
    children: [
      { id: 'd1', name: 'Alice', chk: false },
      { id: 'd2', name: 'Bob', chk: false },
      { id: 'd3', name: 'Charlie', chk: true },
    ],
  },
];

/*** 트리사용시 주의사항
 * 상단에 있는 data 형식을 맞추어야 트리에 나타남
 */
function Treeview() {
  const treeref = useRef();
  const treeref2 = useRef();
  const [list, setList] = useState(data);
  const [transfer, setTransfer] = useState([]);
  const [selectnode, setSelectNode] = useState();

  const fn_select = (e) => {
    setSelectNode(e);
  };
  const toggleNodeCheck = (id, isChecked) => {
    const updateCheckStatus = (nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          node.chk = isChecked;
        }
        if (node.children) {
          node.children = updateCheckStatus(node.children);
        }
        return node;
      });

    setList(updateCheckStatus(list));
  };
  function createTree(data, col) {
    let level = col;
    // 각 아이템에 children 속성을 기본적으로 null로 설정
    data.forEach((item) => {
      item.children = null;
    });
    // 루트 노드를 저장할 배열
    let root = [];

    // 각 데이터를 처리하며 트리 구조를 생성
    data.forEach((item) => {
      // 현재 노드
      let currentNode = item;

      // 루트 레벨인 경우
      if (currentNode[level] === 1) {
        // 루트에 추가
        root.push(currentNode);
      } else {
        // 부모 노드를 찾기 위해 루트부터 탐색
        findParentAndAddChild(root, currentNode, col);
      }
    });

    return root;
  }
  // 부모 노드를 찾아서 자식으로 추가하는 함수
  function findParentAndAddChild(nodes, childNode, col, visited = new Set()) {
    let level = col;
    //반대로돌아야 마지막에 맞는거에 붙음..!
    for (let node of nodes.slice().reverse()) {
      if (visited.has(node)) continue; // 이미 방문한 노드는 건너뛰기
      visited.add(node); // 방문 표시

      if (node.children) {
        // 재귀적으로 하위 노드 탐색
        if (findParentAndAddChild(node.children, childNode, col, visited)) {
          return true;
        }
      }

      // 부모 노드가 맞을 경우 자식으로 추가
      if (node[level] === childNode[level] - 1) {
        if (!node.children) {
          node.children = [];
        }
        node.children.push(childNode);
        return true;
      }
    }

    return false;
  }
  const click = () => {
    let rawData = treedata.result.list;

    // let b = createTree()
    //* 기존 데이터 현재 트리데이터셋으로 바꾸는 함수
    let b = winiCom.createTreeSet(rawData, 'lev');
    setTransfer(b);
  };

  useEffect(() => {}, [list]);
  useEffect(() => {
  }, []);

  return (
    <WiniFormEmpty>
      <WiniStack direction={'row'} justifyContent={'center'}>
        <WiniBox sx={{ width: 500, p: 1 }}>
          조회용 트리
          <WiniTreeView
            ref={treeref}
            // winiData={datalist}// winiData에 형식ㅇ ㅔ맞게 넣어야 move 시에 제대로 작동함!
            winiData={data}
            // winiData={data}
            // openByDefault={false}// 기본값은 true 모두 열림상태
            width={600}
            height={400}
            // indent={24}
            // rowHeight={32}//안쓰면 기본값 32
            // paddingTop={30}
            // paddingBottom={10}
            padding={25 /* sets both */}
            disableDrag={false} //적지 않으면 기본이 true라 움직일수 없음
            onSelect={fn_select} //노드 선택이벤트
          >
            {/* 노드를 커스텀 하고 싶으면 직접 만들어 사용 가능  */}
            {/* {WiniTreeItem} */}
            {(props) => (
              // props : 필수로 보내야합니다. 트리관련 데이터
              // 아래부턴 옵션
              // name : 해당 필드로 라벨 보여줌. 보내지 않으면 "name 이라는 필드로 라벨 바인드"
              // branch : 폴더로 지정할 값지정. 안주면 그냥 children 있으면 폴더가됨!
              //		 예제)  branch = {{column:'menuType',value:'MENU'}}   예제 설멍 -> menuType 이라는 필드 값이'MENU' 이면 폴더 아니면 일반노드
              //				column:은 구분자 컬럼 구분자가  ex( menuType 이라는 필드)
              //				value: 폴더가 될 필드의 값값(ex :'MENU')
              //				->해당 컬럼과 값으로 구분하여 폴더또는 파일 로 구분
              <WiniTreeItem {...props} name={'name'} />
            )}
          </WiniTreeView>
        </WiniBox>
        <WiniBox>
          체크 트리
          <WiniTreeView
            ref={treeref2}
            // winiData={datalist}// winiData에 형식ㅇ ㅔ맞게 넣어야 move 시에 제대로 작동함!
            winiData={list}
            // openByDefault={false}// 기본값은 true 모두 열림상태
            width={600}
            height={400}
            // indent={24}
            // rowHeight={32}//안쓰면 기본값 32
            // paddingTop={30}
            // paddingBottom={10}
            // padding={25 /* sets both */}
            disableDrag={false} //적지 않으면 기본이 true라 움직일수 없음
            // onSelect={fn_select} //노드 선택이벤트
            onChange={(newData) => setList(newData)} // 값이 변경되는경우떄문에 업데이트 되로록 ! 조회일떈 필요없음이거 안해주면 바꿔도 안됌!
          >
            {/* 노드를 커스텀 하고 싶으면 직접 만들어 사용 가능  */}
            {(props) => (
              // props : 필수로 보내야합니다. 트리관련 데이터
              // 아래부턴 옵션
              // name : 해당 필드로 라벨 보여줌. 보내지 않으면 "name 이라는 필드로 라벨 바인드"
              // branch : 폴더로 지정할 값지정. 안주면 그냥 children 있으면 폴더가됨!
              //		 예제)  branch = {{column:'menuType',value:'MENU'}}   예제 설멍 -> menuType 이라는 필드 값이'MENU' 이면 폴더 아니면 일반노드
              //				column:은 구분자 컬럼 구분자가  ex( menuType 이라는 필드)
              //				value: 폴더가 될 필드 (ex :'MENU')
              //				->해당 컬럼과 값으로 구분하여 폴더또는 파일 로 구분
              //field : chekbox 바인딩 필드명. 안보내면 기본 chk
              //toggleCheck : checkbox 변경이벤트
              <WiniTreeCheckItem
                {...props}
                name={'name'}
                field={'chk'}
                toggleCheck={toggleNodeCheck}
              />
              // <WiniTreeCheckItem {...props} name = {'name'} branch={{column:'컬럼',value:'값'}} field = {'check'} toggleCheck={toggleNodeCheck} />
            )}
          </WiniTreeView>
        </WiniBox>
      </WiniStack>
      <WiniDivider />
      <WiniBox> 트리값 변환 함수 (왼쪽 기존 도시공사 메뉴 데이터구조)</WiniBox>
      <WiniStack direction={'row'}>
        <WiniBox>
          <WiniText
            multiline
            value={JSON.stringify(treedata.result.list).toString()}
            sx={{ overflowY: 'auto', maxHeight: 400, width: 600 }}
          />
        </WiniBox>
        <WiniButton variant="outlined" color="primary" onClick={click}>
          변환
        </WiniButton>
        <WiniBox>
          <WiniText
            multiline
            value={JSON.stringify(transfer).toString()}
            sx={{ overflowY: 'auto', maxHeight: 400, width: 600 }}
          />
        </WiniBox>
        <WiniBox sx={{ border: '1px solid #eaeaea', ml: 1 }}>
          변환한거 트리바인딩
          <WiniTreeView
            ref={treeref}
            // winiData={datalist}// winiData에 형식ㅇ ㅔ맞게 넣어야 move 시에 제대로 작동함!
            winiData={transfer}
            // winiData={data}
            // openByDefault={false}// 기본값은 true 모두 열림상태
            width={400}
            height={400}
            // indent={24}
            // rowHeight={32}//안쓰면 기본값 32
            // paddingTop={30}
            // paddingBottom={10}
            padding={25 /* sets both */}
            disableDrag={false} //적지 않으면 기본이 true라 움직일수 없음
            onSelect={fn_select} //노드 선택이벤트
          >
            {/* 노드를 커스텀 하고 싶으면 직접 만들어 사용 가능  */}
            {/* {WiniTreeItem} */}
            {(props) => <WiniTreeItem {...props} name={'menuNm'} />}
          </WiniTreeView>
        </WiniBox>
      </WiniStack>
    </WiniFormEmpty>
  );
}

export default Treeview;
