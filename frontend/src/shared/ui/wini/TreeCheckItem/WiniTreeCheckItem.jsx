import { useState, useMemo, useEffect } from 'react';
import styles from './WiniTreeCheckItem.module.css';
import { cn } from '@/shared/lib/cn';
// import ListAltIcon from "@mui/icons-material/ListAlt";
import WiniIcon from '../Icon/WiniIcon';
import WiniBox from '../Box/WiniBox'
import WiniTypography from '../Typography/WiniTypography';
import FolderCloseIcon from '@/shared/assets/img/folderclose.svg?react';
import FolderOpenIcon from '@/shared/assets/img/folderopen.svg?react';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
// import { backgroundClip } from 'html2canvas/dist/types/css/property-descriptors/background-clip';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const baseSx = {
    
    '& .treeRow': {
        display: 'flex',
        flexDirection: 'row',
        height: 20,
        alignItems: 'center',
        gap: size.margin.sm,
        fontSize: 0,
    },

    '& .treeIcon': {
        width: 20,
    },
    '& .treeIcon svg': {
        scale: '1.6',
        fontSize: 20,
        fill: color.gray.c_666,
    },

    '& .treeRow input': {
        width: 16,
        height: 16, 
    },

    '& .treeRow > svg': {
        marginLeft: size.margin.sm,
    },

    '& .treeRow > .MuiSvgIcon-root': {
        paddingLeft: 0,
    },
    
    '& .treeRow > .MuiTypography-root': {
        color: color.text.dark,
        fontSize: size.text.sm,
    },
};

const WiniTreeCheckItem=(props, iconProps = {})=>{
    const branchSet = {column:'',value:''}
    const nameset = 'name';
    const defaultCheckfield = "chk";
    const { node, style, dragHandle , toggleCheck =()=>{}} = props;
    const checkfield = props.field || defaultCheckfield;
    const [chk,setChk] = useState(() => Boolean(node.data?.[checkfield]));
    const [branch, setBranch] = useState(branchSet);
    const { className: iconClassName, ...rest } = iconProps;
    
    const isBranchMatch = useMemo(() => {
        if (!branch.column) return true;
        return node?.data?.[branch.column] === branch.value;
    }, [branch, node?.data]);

    const isDocIcon = useMemo(() => node.isLeaf || !isBranchMatch, [node.isLeaf, isBranchMatch]);
    const folderIconComponent = useMemo(() => (
        node.isOpen ? FolderOpenIcon : FolderCloseIcon
    ), [node.isOpen]);

    let name = nameset

    let className = `winitreecheckitem ${styles.treenode} ${node.isSelected ? styles.selectednode : ''} ${node.isFocused ? styles.focusednode : ''} `;
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    useEffect(()=>{
        if(!!props.name){
            name = props.name
        }
        if(!!props.branch && !!props.branch.value){
            setBranch({
                column : !!props.branch.column?props.branch.column:'',
                value : props.branch.value
            })
        }
    },[props.name, props.branch])

    // node.data의 체크 상태가 외부에서 변경될 경우 동기화
    useEffect(()=>{
        setChk(Boolean(node.data?.[checkfield]))
    },[node.data?.[checkfield]])

    return (
        <div className={className}
            onKeyDown={(e) => {
            if(e.code==13) node.toggle;
        }}>
            <WiniBox
                style={style}
                ref={dragHandle}
                sx={(theme) => ({
                    ...baseSx,
                })}
            >
                {/* {node.isLeaf ? "🍁" : "🗀"} */}
                <WiniBox className="treeRow">
                    화살표영역
                    <WiniBox className="treeIcon" onClick={() => node.toggle()}>
                        {!node.isLeaf ? node.isOpen ?
                            <ArrowDropDownRoundedIcon/>
                            :
                            <ArrowRightRoundedIcon/> : "　"
                        }
                </WiniBox>
                <input
                    type='checkbox'
                    checked={chk === true}
                    onChange={(e) => {
                        const next = e.target.checked;
                        setChk(next);
                        toggleCheck(node.id, next, node.data);
                    }}
                />
                {isDocIcon ? (
                    <WiniIcon icon="doc2" className={cn(iconClassName, 'winiicon')} />
                ) : (
                    <WiniIcon
                        component={folderIconComponent}
                        inheritViewBox
                        className={cn(iconClassName, 'winiicon')}
                    />
                )}
                <WiniTypography> {node.data[name]}</WiniTypography>
            </WiniBox>
            
        </WiniBox>
        </div>
    );
}
export default WiniTreeCheckItem
