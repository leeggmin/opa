import { WiniAgGridReact, WiniBox } from '@/shared/ui/wini';
import { DeleteOutlineIcon as DeleteIcon } from '@/shared/lib';
import { useState, useRef, useCallback, useEffect } from 'react';
const data = [
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Toyota', model: 'Celica', price: 35000 },
  { make: 'Toyota', model: 'Mondeo', price: 32000 },
  { make: 'Ford', model: 'Mondeo', price: 32000 },
  { make: 'Ford', model: 'Mondeo1', price: 32000 },
  { make: 'Porsche', model: 'Boxster', price: 72000 },
  { make: 'aa', model: 'aaa', price: 0 },
  { make: 'aab', model: 'aaab', price: 0 },
];

function buildGroupedData(data, collapsedGroups) {
  const groupedRows = [];
  const groups = {};

  // Group by 'make'
  data.forEach((item) => {
    if (item.isGroup) return; // <-- 기존 그룹 row는 무시
    const key = item.make;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  Object.entries(groups).forEach(([groupName, items], index) => {
    const groupId = `group-${groupName}`;
    const isCollapsed = collapsedGroups[groupId] || false;

    groupedRows.push({
      isGroup: true,
      groupName,
      groupId,
      isCollapsed,
    });

    if (!isCollapsed) {
      groupedRows.push(...items);
    }
  });

  return groupedRows;
}

export default function GridSample() {
  const originalOrderRef = useRef(data);
  const gridRef = useRef(null);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [rowData, setRowData] = useState(() => {
    const initial = buildGroupedData(data, {});
    return initial;
  });

  const [rowSpans, setRowSpans] = useState(() =>
    generateRowSpans(buildGroupedData(data, {}), 'make'),
  );

  const [draggingMake, setDraggingMake] = useState(null);
  // 1. 먼저 각 행이 몇 칸을 span해야 하는지 계산
  function calculateRowSpans(data, field) {
    const spans = Array(data.length).fill(1);
    let start = 0;

    for (let i = 1; i <= data.length; i++) {
      if (i === data.length || data[i][field] !== data[start][field]) {
        const span = i - start;
        spans[start] = span;
        for (let j = start + 1; j < i; j++) {
          spans[j] = 0; // 나머지는 숨김 처리용
        }
        start = i;
      }
    }

    return spans;
  }
  // function generateRowSpans(data, field) {
  //     const spans = Array(data.length).fill(1); // 기본 rowSpan은 1
  //     let start = 0;

  //     for (let i = 1; i <= data.length; i++) {
  //         const isEnd = i === data.length;
  //         const isDiff = !isEnd && data[i][field] !== data[start][field];

  //         if (isEnd || isDiff) {
  //         const span = i - start;
  //         spans[start] = span;           // 시작 위치에 span 설정
  //         for (let j = start + 1; j < i; j++) {
  //             spans[j] = 0;                // 나머지는 숨김 처리
  //         }
  //         start = i;
  //         }
  //     }

  //     return spans;
  // }
  function generateRowSpans(rowData, field) {
    const spans = Array(rowData.length).fill(1);
    let start = -1;

    for (let i = 0; i < rowData.length; i++) {
      const row = rowData[i];

      if (row.isGroup) {
        start = -1;
        spans[i] = 1;
        continue;
      }

      if (start === -1) {
        start = i;
      }

      const nextRow = rowData[i + 1];
      const isLast = i === rowData.length - 1;
      const isGroupBoundary =
        !nextRow || nextRow.isGroup || nextRow[field] !== row[field];

      if (isGroupBoundary) {
        const span = i - start + 1;
        spans[start] = span;
        for (let j = start + 1; j <= i; j++) {
          spans[j] = 0;
        }
        start = -1;
      }
    }

    return spans;
  }

  // const rowSpans = generateRowSpans(data, 'make');

  const toggleGroup = useCallback(
    (groupId) => {
      const updatedGroups = {
        ...collapsedGroups,
        [groupId]: !collapsedGroups[groupId],
      };
      const updatedRowData = buildGroupedData(data, updatedGroups);
      setCollapsedGroups(updatedGroups);
      setRowData(updatedRowData);
      setRowSpans(generateRowSpans(updatedRowData, 'make'));
    },
    [collapsedGroups],
  );

  const onGridReady = (params) => {
    const original = [];
    params.api.forEachNode((node) => {
      original.push(node.data);
    });
    originalOrderRef.current = original;
  };

  const onRowDragEnd = (event) => {
    const movingRow = event.node.data;
    const targetIndex = event.overIndex;

    const originalTarget = originalOrderRef.current[targetIndex];
    // const originalTargetNext = originalOrderRef.current[targetIndex+1];
    // console.log('originalTarget',originalTarget)

    // const fromMake = movingRow.make;
    // const toMake = originalTarget?.make;
    // const toMakeNext = originalTargetNext?.make;

    // const isSameGroup = fromMake === toMake || fromMake === toMakeNext;
    // if (!isSameGroup) {
    //     // ✅ 이건 그룹 경계니까 이동 허용
    //     // console.log("다른 그룹 사이로 이동 - 허용됨");
    //     // return;
    //     // ✅ 허용 → 새 순서 저장
    //     const newOrder = [];
    //     event.api.forEachNode((node) => {
    //         newOrder.push(node.data);
    //     });
    //     originalOrderRef.current = [...newOrder];
    //     setRowData([...newOrder]);
    // }

    // if (fromMake !== toMake) {
    //     // ❌ 그룹 다르면 복구
    //     console.log("다른 그룹으로 이동 시도 - 복구");
    //     setRowData([...originalOrderRef.current]); // 복원
    //     // gridRef.current?.api.clearFocusedCell();
    //     // gridRef.current?.api.redrawRows();
    // }

    // 🚫 make가 다르면 복구
    if (!originalTarget || movingRow.make !== originalTarget.make) {
      // console.warn("🚫 다른 make로 이동 불가 → 복구");
      setRowData([...originalOrderRef.current]); // 복원
    } else {
      // ✅ 허용 → 새 순서 저장
      const newOrder = [];
      event.api.forEachNode((node) => {
        newOrder.push(node.data);
      });
      originalOrderRef.current = [...newOrder];
      setRowData([...newOrder]);
    }

    setDraggingMake(null);
    const gridElement = document.querySelector('.ag-root');
    if (gridElement) {
      gridElement.style.cursor = 'default';
    }

    const overlay = document.getElementById('x-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  };
  const getRowId = (params) => `${params.data.make}-${params.data.model}`;

  const onRowDragEnter = (event) => {
    setDraggingMake(event.node.data.make);
  };
  const onRowDragMove = (event) => {
    // const sourceMake = event.node.data.make;
    // const overMake = event.overNode?.data?.make;
    // if (sourceMake !== overMake) {
    const movingRow = event.node.data;
    const targetIndex = event.overIndex;

    const originalTarget = originalOrderRef.current[targetIndex];

    // 🚫 make가 다르면 복구
    if (!originalTarget || movingRow.make !== originalTarget.make) {
      // console.log("다른 make로 이동 시도 → 막음");
      // event.veto = true; // ✅ 같은 make가 아닐 경우 드래그 제한
      // 원래 데이터로 복원
      // const originalData = [];
      // event.api.forEachNode((node) => {
      //     originalData.push(node.data);
      // });
      // event.api.applyTransaction({ set: originalData });

      const overNode = event.overNode;
      if (!overNode || !overNode.data) return;
      const targetMake = overNode.data.make;
      const isSameGroup = draggingMake === targetMake;

      // 커서 변경
      const gridElement = document.querySelector('.ag-root');
      if (gridElement) {
        gridElement.style.cursor = isSameGroup ? 'grabbing' : 'not-allowed';
      }

      // ❌ 오버레이 표시
      const overlay = document.getElementById('x-overlay');
      if (overlay) {
        overlay.style.display = isSameGroup ? 'none' : 'block';
        overlay.style.left = `${event.event.clientX + 0}px`;
        overlay.style.top = `${(event.event.clientY + m, 2)}px`;
        // overlay.style.transform = `translate(${event.event.clientX + 20}px, ${event.event.clientY - 40}px)`;
      }
    } else {
      const overlay = document.getElementById('x-overlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
  };
  // const getRowHeight = (params) => {
  //     return params.data.isGroup ? 22 : 25;
  // };
  const click = (params) => {
    setRowData((prevData) => {
      // return [...prevData,]
      prevData.splice(2, 0, { make: 'Toyota', model: '', price: 0 });

      // 3. group 상태 반영
      const groupedData = buildGroupedData(prevData, {});
      originalOrderRef.current = groupedData;
      // setRowData(groupedData); // 새로운 rowData 반영
      // const data = generateRowSpans(buildGroupedData(prevData, {}), 'make')
      return groupedData;
    });
  };
  const deleteClick = (params) => {
    setRowData((prevData) => {
      // return [...prevData,]
      prevData.splice(params.api.getSelectedNodes()[0].rowIndex, 1);

      // 3. group 상태 반영
      const groupedData = buildGroupedData(prevData, {});
      originalOrderRef.current = groupedData;
      // setRowData(groupedData); // 새로운 rowData 반영
      // const data = generateRowSpans(buildGroupedData(prevData, {}), 'make')
      return groupedData;
    });
  };
  useEffect(() => {
    const overlay = document.createElement('div');
    overlay.id = 'x-overlay';
    overlay.style.position = 'fixed';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = 10000;
    overlay.style.fontSize = '20px';
    overlay.style.color = 'red';
    overlay.style.display = 'none';
    // overlay.innerHTML = "<div style={{background':'white'}}>"+"❌"+"<div>";
    overlay.innerHTML = "<div style={{background':'white'}}>" + '🚫' + '<div>';
    document.body.appendChild(overlay);

    return () => {
      overlay.remove();
    };
  }, []);
  useEffect(() => {
    if (!gridRef.current) return;

    // 2. rowSpan 재계산
    const newSpans = generateRowSpans(rowData, 'make');
    setRowSpans(newSpans); // 🔄 useState로 관리 중이면
    // originalOrderRef.current = rowData;// 원래순서 저장
    // dry
    setTimeout(() => {
      gridRef.current?.api.redrawRows();
    }, 100);
    // gridRef.current.api.redrawRows();
  }, [rowData]);
  return (
    <WiniBox sx={{ width: 700, height: 700 }}>
      <WiniAgGridReact
        ref={gridRef}
        rowData={rowData}
        suppressRowTransform={true}
        // enableCellSpan= {true}
        // rowHeight={25}
        rowDragManaged={true}
        rowDragEntireRow={true}
        rowDragMultiRow={true}
        animateRows={true}
        onRowDragEnd={onRowDragEnd}
        onRowDragMove={onRowDragMove}
        onGridReady={onGridReady}
        // getRowHeight={getRowHeight}
        columnDefs={[
          {
            field: 'make',
            width: 150,
            filter: false,
            sortable: false,
            colSpan: (params) => (params.data.isGroup ? 4 : 1),
            // spanRows: true, // 우리버전에 없음
            rowSpan: (params) => rowSpans[params.node.rowIndex],
            cellClassRules: {
              'cell-span': (params) => {
                return rowSpans[params.node.rowIndex] > 1;
              },
              'cell-hidden': (params) => rowSpans[params.node.rowIndex] === 0,
            },
            valueGetter: (params) => {
              if (params.data.isGroup)
                return `${params.data.isCollapsed ? '▶' : '▼'} ${params.data.groupName}`;
              return params.data.make;
            },
            cellStyle: (params) => {
              if (params.data.isGroup) {
                return {
                  fontWeight: 'bold',
                  backgroundColor: '#eaeaea',
                  cursor: 'pointer',
                  // height:30
                };
              }
              return {};
            },
            onCellClicked: (params) => {
              if (params.data.isGroup) {
                toggleGroup(params.data.groupId);
              }
            },
            //0 rowSpan: params =>  params.data.make === 'Toyota' ? 2 : 1,
            // cellStyle: params => {
            //     if (params.node.rowIndex === 0 && params.data.make === 'Toyota') {
            //       return { backgroundColor: 'white' }; // 첫 번째 셀에만 배경색 흰색
            //     }
            //     return {};
            // },
            // valueGetter: params => {
            //     // 첫 줄만 값 보이게 하고, 병합된 아래줄은 빈칸!
            //     if (params.node.rowIndex > 0 && params.api.getDisplayedRowAtIndex(params.node.rowIndex - 1)?.data?.make === 'Toyota') {
            //         return null;
            //     }
            //     return params.data.make;
            // },
            // cellClassRules: {
            //     'cell-span': 'value !== undefined',
            //     'ag-grid-rospan-white-background': params => params.data.make === 'Toyota' && params.node.rowIndex === 0,

            // },
            // valueGetter: params => {
            //     const rowIndex = params.node.rowIndex;
            //     const currentValue = params.data.make;
            //     const prevRow = params.api.getDisplayedRowAtIndex(rowIndex - 1);

            //     if (prevRow?.data?.make === currentValue) {
            //       // 위 셀이랑 같으면 안 보이게
            //       return null;
            //     }
            //     return currentValue;
            //   },
            //   cellClassRules: {
            //     'cell-hidden-border': params => {
            //       const rowIndex = params.node.rowIndex;
            //       const currentValue = params.data.make;
            //       const prevRow = params.api.getDisplayedRowAtIndex(rowIndex - 1);
            //       return prevRow?.data?.make === currentValue;
            //     }
            //   }
          },
          { field: 'model', rowDrag: true, filter: false, sortable: false },
          {
            field: 'price',
            filter: false,
            sortable: false,
            headerComponent: (params) => {
              // return params.displayName
              return (
                <WiniBox
                  sx={{
                    display: 'flex',
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContents: 'center',
                    postion: 'relative',
                    textAlign: 'center',
                  }}
                >
                  <WiniBox
                    sx={{
                      position: 'absolute',
                      right: 0,
                      border: '1px solid #eaeaea',
                      width: 15,
                      height: 15,
                      textAlign: 'center',
                      fontSize: '18px',
                      cursor: 'pointer',
                    }}
                    onClick={click}
                  >
                    <span>{'+'}</span>
                  </WiniBox>
                  <span style={{ textAlign: 'center' }}>
                    {params.displayName}
                  </span>
                </WiniBox>
              );
            },
          },
          {
            field: 'delete',
            flex: 1,
            cellRenderer: (params) => {
              return (
                <WiniBox
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <DeleteIcon
                    sx={{ color: '#ff6262', cursor: 'pointer' }}
                    onClick={(e) => {
                      deleteClick(params, e);
                    }}
                  />
                </WiniBox>
              );
            },
          },
        ]}
        //   // ✅ 이벤트는 여기!
        // onRowDragEnd={(event) => {
        //     const movingRow = event.node;
        //     const targetIndex = event.overIndex;

        //     const movingMake = movingRow.data.make;
        //     const targetRow = event.api.getDisplayedRowAtIndex(targetIndex);

        //     if (!targetRow || movingMake !== targetRow.data.make) {
        //     console.warn("🚫 다른 make로는 이동 불가!");
        //     event.api.setRowData([...event.api.getModel().rowsToDisplay.map(r => r.data)]); // 강제로 초기화
        //     }
        // }}

        // onRowDragMove={(event) => {
        //     const sourceMake = event.node.data.make;
        //     const overRow = event.overNode?.data;

        //     if (overRow && sourceMake !== overRow.make) {
        //         // event.veto = true; // 👉 이렇게 하면 드래그 자체가 막힘
        //     }
        // }}
      />
    </WiniBox>
  );
}
