import { forwardRef } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const WiniAdapterDateFns = forwardRef(({ children, ...props }, ref) => {

    return (
        <AdapterDateFns {...props} className ={"winiadapterdatefns"} ref = {ref} >
            {children}
        </AdapterDateFns>
    );
})
export default WiniAdapterDateFns
