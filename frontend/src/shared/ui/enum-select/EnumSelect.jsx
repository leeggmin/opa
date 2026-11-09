import { WiniSelect, WiniMenuItem } from '@/shared/ui/wini';

/**
 * Enum 객체를 기반으로 Select를 렌더링하는 공통 컴포넌트
 *
 * @param {string} label - Select 라벨
 * @param {string} name - Select name 속성
 * @param {string} value - 선택된 값
 * @param {function} onChange - 변경 핸들러
 * @param {object} enums - enum 객체 { key: displayValue }
 * @param {boolean} showAll - 'ALL' 옵션 표시 여부 (기본: false)
 * @param {string} allLabel - 'ALL' 옵션 라벨 (기본: 'ALL')
 * @param {string} className - 스타일 클래스 이름
 */
export const EnumSelect = ({
  label,
  name,
  value,
  onChange,
  enums,
  showAll = false,
  allLabel = 'ALL',
  className = 'w-full',
  ...rest
}) => {
  return (
    <WiniSelect
      label={label}
      name={name}
      value={value}
      labelProps={{ shrink: true }}
      displayEmpty
      defaultValue={''}
      onChange={onChange}
      className={className}
      {...rest}
    >
      {showAll && <WiniMenuItem value="">{allLabel}</WiniMenuItem>}
      {Object.keys(enums).map((item, idx) => (
        <WiniMenuItem value={item} key={`${item}_${idx}`}>
          {enums[item]}
        </WiniMenuItem>
      ))}
    </WiniSelect>
  );
};
