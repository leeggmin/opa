import { useState, useMemo, useEffect, forwardRef } from 'react';
import styles from './WiniTreeItem.module.css';
import { cn } from '@/shared/lib/cn';

import {
  DescriptionIcon,
  FolderIcon,
  ArrowDropDownIcon,
  ArrowRightIcon,
} from '@/shared/lib';
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import { WiniTypography } from '@/shared/ui/wini';

import WiniIcon from '../Icon/WiniIcon';
import WiniBox from '../Box/WiniBox';
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

  '& .treeRow > .MuiSvgIcon-root': {
    paddingLeft: 0,
  },

  '& .treeRow > .MuiTypography-root': {
    color: color.text.dark,
    fontSize: size.text.sm,
  },
};

// TreeItem.defaultProps = { classes:{label:'WiniTreeItem-label_mui'}}
// const WiniTreeItem = forwardRef(({ children, ...props }, ref) => {

//     return (
//         <TreeItem {...props} className ={"winitreeitem"} ref = {ref} >
//             {children}
//         </TreeItem>
//     );
// })

// export default WiniTreeItem
const WiniTreeItem = (props, iconProps = {}) => {
  const branchSet = { column: '', value: '' };
  const { node, style, dragHandle } = props;
  const [branch, setBranch] = useState(branchSet);
  const { className: iconClassName, ...rest } = iconProps;
  const name = props.name ? props.name : 'name';
  let className = `winitreeitem ${styles.treenode} ${node.isSelected ? styles.selectednode : ''} ${node.isFocused ? styles.focusednode : ''} `;
  if (props.className !== undefined && props.className !== null) {
    className += props.className;
  }

  const isBranchMatch = useMemo(() => {
    if (!branch.column) return true;
    return node?.data?.[branch.column] === branch.value;
  }, [branch, node?.data]);

  const isDocIcon = useMemo(() => node.isLeaf || !isBranchMatch, [node.isLeaf, isBranchMatch]);
  const folderIconComponent = useMemo(
    () => (node.isOpen ? FolderOpenIcon : FolderCloseIcon),
    [node.isOpen],
  );

  useEffect(() => {
    if (!!props.branch && !!props.branch.value) {
      setBranch({
        column: !!props.branch.column ? props.branch.column : '',
        value: props.branch.value,
      });
    }
  }, []);
  return (
    <WiniBox
      className={className}
      onKeyDown={(e) => {
        if (e.code == 13) node.toggle;
      }}
    >
      <WiniBox
        style={style}
        ref={dragHandle}
        sx={(theme) => ({
          ...baseSx,
        })}
      >
        {/* {node.isLeaf ? "🍁" : "🗀"} */}

        <WiniBox className="treeRow" onClick={() => node.toggle()}>
          <WiniBox className="treeIcon">
            {!node.isLeaf ? (
              node.isOpen ? (
                <ArrowDropDownRoundedIcon />
              ) : (
                <ArrowRightRoundedIcon />
              )
            ) : (
              '　'
            )}
          </WiniBox>
          {branch.column === '' ? <WiniTypography /> : <WiniTypography />}
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
    </WiniBox>
  );
};
export default WiniTreeItem;
