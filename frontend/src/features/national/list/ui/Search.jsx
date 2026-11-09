import { WiniBox, WiniButton, WiniText, WiniGridLayout, WiniGridItem } from '@/shared/ui/wini';
import { winiCom } from '@/shared/lib';

export const Search = (props) => {
    return (
        <WiniGridLayout container>
            <WiniGridItem xs={12}>
                <WiniBox ui="search">
                    <WiniText
                        ui="row"
                        label="code"
                        variant="outlined"
                        slotProps={{ inputLabel: { shrink: true } }}
                        name="nationalCode"
                        value={props.searchData?.nationalCode || ''}
                        onChange={props.onSearchChange}
                    />
                    <WiniText
                        ui="row"
                        label="name"
                        variant="outlined"
                        slotProps={{ inputLabel: { shrink: true } }}
                        name="nationalName"
                        value={props.searchData?.nationalName || ''}
                        onChange={props.onSearchChange}
                    />
                    {winiCom.checkMenuAut(
                        'select',
                        <WiniButton onClick={props.onSearch}>
                            조회
                        </WiniButton>
                    )}
                    {winiCom.checkMenuAut(
                        'insert',
                        <WiniButton onClick={props.onInsert}>
                            등록
                        </WiniButton>
                    )}
                </WiniBox>
            </WiniGridItem>
        </WiniGridLayout>
    );
}
