import { WiniAgGridReact, WiniBox } from '@/shared/ui';

export const Grid = ({ gridApiRef, orgList, onSelectionChanged, onCellDoubleClicked }) => {
  return (
    <WiniBox>
      <WiniBox className='h-[730px] mt-0'>
        <WiniAgGridReact
          ref={gridApiRef}
          columnDefs={[
            { field: 'organizationCode', headerName: '조직코드', flex: 1, cellStyle: { textAlign: 'center' } },
            { field: 'organizationName', headerName: '조직 명', flex: 2, cellStyle: { textAlign: 'center' } },
          ]}
          rowSelection={'single'}
          rowStyle={{ lineHeight: 20 }}
          rowData={orgList}
          onSelectionChanged={onSelectionChanged}
          onCellDoubleClicked={onCellDoubleClicked}
        />
      </WiniBox>
    </WiniBox>
  )
}

// export default Grid