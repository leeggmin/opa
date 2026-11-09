import { forwardRef } from 'react';
import Tabs from '@mui/material/Tabs';
import { cn } from '@/shared/lib/cn';
import { getUiTokens, mergeUiSlotSxByTokens } from '@/shared/config/theme/uiTokens';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';

const baseSx = {
    // ui : 기본 MuiTabs-root

    '&': {
        position: 'relative',
        minHeight: size.objH.md,
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: '100%',
        left: 0,
        bottom: 0,
        height: '1px',
        backgroundColor: color.background.main,
        zIndex: 1,
    },
    '&.winitabs--bar:before, &.winitabs--barfull:before':{
        backgroundColor: color.background.divider,
    },
    '& .MuiTabs-indicator': {
       display: 'none',
    },

    '& .MuiTabs-list': {
        gap: size.margin.sm,
    },
    
};

const UI_SX = {
    line: {
        root: {
            '&.winitabs--line': {
            },

            '&.winitabs--line .MuiTab-root': {
                backgroundColor: color.gray.c_eee,
            },

            '&.winitabs--line .MuiTab-root.Mui-selected': {
                position: 'relative',
                color: color.text.main,
                backgroundColor: color.background.white,
                border: `1px solid ${color.background.main}`,
                borderBottom: 'none',
            },
            '&.winitabs--line .MuiTab-root.Mui-selected:before': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: color.background.white,
                zIndex: 1,
            },
        },
    },
    full: {
        root: {
            '&.winitabs--full': {
            },

            '&.winitabs--full .MuiTab-root': {
                flex: 1,
                maxWidth: 'unset',
                minWidth: 'unset',
                width: '100%',
            }
        },
    },
    linefull: {
        root: {
            '&.winitabs--linefull': {
            },

            '&.winitabs--linefull .MuiTab-root': {
                flex:1,
                maxWidth: 'unset',
                minWidth: 'unset',
                backgroundColor: color.gray.c_eee,
            },
            '&.winitabs--linefull .MuiTab-root.Mui-selected': {
                position: 'relative',
                color: color.text.main,
                backgroundColor: color.background.white,
                border: `1px solid ${color.background.main}`,
                borderBottom: 'none',
            },
            '&.winitabs--linefull .MuiTab-root.Mui-selected:before': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'block',
                width: '100%',
                height: '2px',
                backgroundColor: color.background.white,
                zIndex: 1,
            },
        },
    },
    bar: {
        root: {
            '&.winitabs--bar': {
            },
            '&.winitabs--bar .MuiTab-root': {
                backgroundColor: color.background.white,
                border: `none`,
            },
            '&.winitabs--bar .MuiTab-root.Mui-selected': {
                position: 'relative',
                color: color.text.main,
            },
            '&.winitabs--bar .MuiTab-root.Mui-selected:before': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'block',
                width: '100%',
                height: '4px',
                backgroundColor: color.background.main,
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                zIndex: 1,
            },
            '&.winitabs--bar .MuiTabs-indicator': {
                backgroundColor: color.background.divider,
            }
        }
    },
    barfull: {
        root: {
            '&.winitabs--barfull': {
            },
            '&.winitabs--barfull .MuiTab-root': {
                flex: 1,
                maxWidth: 'unset',
                minWidth: 'unset',
                border: `none`,
                backgroundColor: color.background.white,
            },
            '&.winitabs--barfull .MuiTab-root.Mui-selected': {
                position: 'relative',
                color: color.text.main,
            },
            '&.winitabs--barfull .MuiTab-root.Mui-selected:before': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                display: 'block',
                width: '100%',
                height: '4px',
                backgroundColor: color.background.main,
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                zIndex: 1,
            },
            '&.winitabs--barfull .MuiTabs-indicator': {
                backgroundColor: color.background.divider,
            }
        }
    }
};

const WiniTabs = forwardRef(
    (
        {
            ui,
            value,
            variant,
            children,
            className,
            onChange,
            scrollButtons,
            // PaperProps: paperProps = {},
            ...props
        }, ref
    ) => {

        const uiTokens = getUiTokens(ui, 'default');
        const uiRootSx = mergeUiSlotSxByTokens(uiTokens, UI_SX, 'root');

        const mergedClassName = cn(
            'winicomponent winitabs',
            uiTokens.map((token) => `winitabs--${token}`),
            uiTokens.map((token) => `winitabs--layout-${token}`),
            className,
        );
        return (
            <Tabs
                ref={ref}
                value={value}
                onChange={onChange}
                variant={variant}
                scrollButtons={scrollButtons}
                className={mergedClassName}
                {...props}

                sx={(theme) => ({
                    ...baseSx,
                    ...(uiRootSx ?? {}),
                })}
            >
                {children}
            </Tabs>
        );
    }
)

export default WiniTabs
