import { forwardRef } from 'react';
import Tab from '@mui/material/Tab';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const baseSx = {
    // ui : 기본 MuiTab-root
    '&.winitab': {
        minHeight: size.objH.md,
        padding: `${size.margin.md} ${size.margin.xl}`,
        color: color.text.default,
        fontSize : size.text.md,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        border: `1px solid ${color.background.divider}`,
        borderBottom: '0',
        backgroundColor: color.background.white,
    },

    '&.Mui-selected': {
        color: color.text.white,
        fontWeight : '600',
        backgroundColor: color.background.main,
        // fontWeight: fontWeight.medium,
        border: 'none',
    },
};

const WiniTab = forwardRef(({ children, ...props }, ref) => {
    let className = "winicomponent winitab ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
    return (
        <Tab {...props}
            className={className}
            ref={ref}
            sx={(theme) => ({
                ...baseSx,
            })}
        >
            {children}
        </Tab>
    );
})
export default WiniTab