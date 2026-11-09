import { forwardRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { color } from '@/shared/config/theme';
import { size } from '@/shared/config/theme';
import WiniIconButton from '../IconButton/WiniIconButton';

const WiniDialogTitle = forwardRef(

    // onClose를 넘기면 제목 오른쪽에 닫기 버튼을 그린다 (넘기지 않으면 버튼 없음)
    ({ children, purpose = "alert", onClose, closeLabel = '닫기', ...props }, ref) => {
    let className = "winicomponent winidialogtitle ";
    if(props.className!==undefined && props.className!==null){
        className += props.className
    }
        
    const isEmergency = purpose === "emergency";
        
    return (
        <DialogTitle
            {...props}
            ref={ref}
            className={className}
            sx={(theme) => ({

                '&.MuiDialogTitle-root': {
                    position: 'relative',
                    minHeight: size.objH.sm,
                    padding: `${size.margin.lg} ${size.margin.xl}`,
                    color: color.text.main,
                    fontSize: size.text.lg,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    borderRadius: `12px 12px 0 0`,
                },
                '.winidialog--btn &.MuiDialogTitle-root': {
                    color: color.text.white,
                    borderRadius: 0,
                    borderTopLeftRadius: '12px',
                    borderTopRightRadius: '12px',
                    backgroundColor : color.background.main,
                },
    
                '&.MuiDialogTitle-root .MuiButton-DialogClose': {
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 24,
                    minWidth: 24,
                    height: 24,
                    borderRadius: 0,
                    padding: 0,
                    cursor: 'pointer',
                },
                '&.MuiDialogTitle-root .MuiButton-DialogClose svg': {
                    width: '100%',
                    height: '100%',
                    color: color.text.main,
                },
                // ui : 기본, color : caution 아이콘 색상
                '.winidialog--caution &.MuiDialogTitle-root .MuiButton-DialogClose svg': {
                    color: color.state.caution,
                },

                // ui : 기본, color : error 아이콘 색상
                '.winidialog--error &.MuiDialogTitle-root .MuiButton-DialogClose svg': {
                    color: color.state.error,
                },

                // ui : 버튼형, 기본 아이콘 색상
                '.winidialog--btn &.MuiDialogTitle-root .MuiButton-DialogClose svg': {
                    color: color.text.white,
                },

                // ui : 버튼형, color : error 타이틀 배경색
                '.winidialog--btn.winidialog--error &.MuiDialogTitle-root': {
                    color: color.text.white,
                    backgroundColor: color.state.error,
                },

                // ui : 버튼형, color : caution 타이틀 배경색
                '.winidialog--btn.winidialog--caution &.MuiDialogTitle-root': {
                    color: color.text.white,
                    backgroundColor: color.state.caution,
                },
            })}
        >
            {children}
            {onClose ? (
                <WiniIconButton className="MuiButton-DialogClose" icon="close" iconOnly aria-label={closeLabel} onClick={onClose} />
            ) : null}
        </DialogTitle>
    );
})
export default WiniDialogTitle
