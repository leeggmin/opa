import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

export default function WiniDragDialog(props) {
    const title = !!props.title? props.title:'';
    const x = !!props.position? props.position.x : 800;
    const y = !!props.position? props.position.y : 100;
    const width = !!props.width? props.width : 300;
    const height = !!props.height? props.height : 300;
    const resizeyn = !!props.resize? props.resize: false;
    const [resize, setRisize] = React.useState(resizeyn);
    const [visible, setVisible] = React.useState(props.open);
    const [position, setPosition] = React.useState({ x: x, y: y });
    const [size, setSize] = React.useState({ width: 'auto', height: 'auto' });
    const popupRef = React.useRef(null);
    const isDragging = React.useRef(false);
    const offset = React.useRef({ x: 0, y: 0 });
    const firstSize = React.useRef();

    // 마우스 이벤트 핸들러
    const onMouseDown = (e) => {
        isDragging.current = true;
        const rect = popupRef.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y,
        });
    };

    const onMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
     // --- 리사이즈 ---
    const onResizeMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation(); // 드래그 이벤트와 충돌 방지
          // 현재 DOM 크기 가져오기
        const rect = popupRef.current.getBoundingClientRect();
        const startWidth = rect.width;
        const startHeight = rect.height;

        const startX = e.clientX;
        const startY = e.clientY;

        const content = popupRef.current.querySelector('div:nth-child(2)'); // 내용 영역
        let minWidth = content.scrollWidth + 10 // padding이나 스크롤 공간 포함
        let minHeight = content.scrollHeight + 47;
        if(firstSize.current===undefined){
            firstSize.current={
                width:minWidth,
                height:minHeight
            }
        }
        const onMouseMove = (e) => {
            // console.log(firstSize)
            setSize({
                width: Math.max(firstSize.current?.width, startWidth + (e.clientX - startX)),
                height: Math.max(firstSize.current?.height, startHeight + (e.clientY - startY)),
            });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };


    // React.useEffect(() => {
    //     //esc 눌렀을떄 끄기 
    //     const handleKeyDown = (e) => {
    //         if (e.key === 'Escape') {
    //             setVisible(false);
    //             if (props.setOpen) props.setOpen(false);
    //         }
    //     };

    //     document.addEventListener('keydown', handleKeyDown);
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);
    


    React.useEffect(()=>{
        // setVisible(props.open)
        setVisible(props.open)
        if(props.position){
            setPosition({
                x:props.position.x ? props.position.x : 300, 
                y:props.position.y ? props.position.y : 100, 
            })
        }
    },[props.open])

    return (
        <div style={{ padding: 0 }}>
            {/* <button onClick={() => setVisible(true)}>팝업 열기</button> */}

            {visible && (
                <div
                    ref={popupRef}
                    style={{
                        position: 'fixed',
                        top: position.y,
                        left: position.x,
                        width: size.width,
                        height: size.height,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: 8,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        minWidth: 300,
                        // zIndex: 20,
                        zIndex: 1200,
                        padding:4,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* 드래그 가능한 헤더 */}
                    <div
                        onMouseDown={onMouseDown}
                        onDoubleClick={()=>{props.setOpen(!props.open)}}
                        className={'bg-[linear-gradient(135deg,#2A55A3_0%,#26778D_100%)]'}
                        style={{
                            // padding: 5,
                            // padding
                            // background: '#333',
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                            userSelect: 'none',
                            // cursor: 'move',
                            // fontWeight: 'bold',
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'space-between',
                            // height:40,
                            alignItems:'center'
                        }}
                    >
                        <span style={{flex:1,color:'white',padding:'8px 16px',fontSize:'18px', fontWeight:'600'}}>{title}</span>
                        
                        {/*  */}
                        <button  style={{padding:0,backgroundColor:'transparent',border:'none',marginRight:12,cursor:'pointer'}}onClick={()=>{props.setOpen(!props.open)}}><CloseIcon sx={{color:'#fff'}}/></button>
                    </div>

                    {/* 내용 영역 */}
                    <div style={{display: 'flex',flexDirection: 'column'}}>
                        {/* <p>이건 모달이 아닌, 드래그 가능한 팝업입니다.</p>
                        <button onClick={() => setVisible(false)}>닫기</button> */}
                        {/* {(()=>{
                            // debugger
                            return(<>{}</>)

                        })()} */}
                        {props.children}
                    </div>
                     {/* 리사이즈 핸들 */}
                    {
                        resize && (
                            <div
                                onMouseDown={onResizeMouseDown}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 0,
                                    width: 16,
                                    height: 16,
                                    cursor: 'nwse-resize',
                                    background: 'transparent',
                                }}
                            />
                        )
                    }
                </div>
            )}
        </div>
    );
}
