import { WiniBox, WiniButton, WiniStack, WiniText } from '@/shared/ui/wini';

/**
 * 검색 Dialog 레이아웃 공통 컴포넌트
 * @param {string} keyword - 검색어
 * @param {function} setKeyword - 검색어 변경 함수
 * @param {function} onSearch - 조회 함수
 * @param {ReactNode} children - 검색 결과 영역 (Grid, TreeView 등)
 * @param {string} searchLabel - 검색 입력 필드 라벨 (기본값: '검색어')
 * @param {string} buttonText - 조회 버튼 텍스트 (기본값: '조회')
 * @param {number} width - Dialog 너비 (기본값: 500)
 * @param {number} height - Dialog 높이 (기본값: 450)
 */
export function SearchDialogLayout({
  keyword,
  setKeyword,
  onSearch,
  children,
  searchLabel = '검색어',
  buttonText = '조회',
  width = 500,
  height = 450,
}) {
  return (
    <WiniBox sx={{ height, width, p: 1 }}>
      <WiniStack direction={'row'} sx={{ mb: 1 }}>
        <WiniText
          label={searchLabel}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
        />
        <WiniButton
          variant="contained"
          style={{ height: 32, marginLeft: '5px' }}
          onClick={onSearch}
        >
          {buttonText}
        </WiniButton>
      </WiniStack>
      <WiniBox sx={{ height: height - 50 }}>{children}</WiniBox>
    </WiniBox>
  );
}
