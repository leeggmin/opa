import { forwardRef, useEffect, useState } from 'react';

import { winiCom } from '@/shared/lib';
import { winiMsg } from '@/shared/model';

import { WiniBox, WiniButton, WiniChip, WiniInputBase } from '@/shared/ui/wini';

const WiniHashTagInput = forwardRef(({ children, ...props }, ref) => {
  const [text, setText] = useState('');
  const [chips, setChips] = useState(props.chips);
  const [viewCount, setViewCount] = useState(5); // 보여줄 최소 갯수
  const [limitCount, setLimitCount] = useState(0); // 태그 추가할 수 있는 갯수
  const [readOnly, setReadOnly] = useState(false); // 입력없이 Hashtag 나열할 때만 사용
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    if (
      winiCom.toEmpty(props.viewCount) !== '' &&
      winiCom.isNumber(props.viewCount)
    ) {
      setViewCount(Number(props.viewCount));
      setShowAll(false);
    }
    if (
      winiCom.toEmpty(props.limitCount) !== '' &&
      winiCom.isNumber(props.limitCount)
    ) {
      setLimitCount(Number(props.limitCount));
    }
    if (props.readOnly !== undefined) {
      setReadOnly(props.readOnly);
    }
  }, []);
  useEffect(() => {
    if (props.onChange) {
      let newChip = [];
      chips.map((item) => {
        newChip.push(item.replace('#', ''));
      });
      props.onChange(newChip);
    }
  }, [chips]);

  useEffect(() => {
    if (readOnly) {
      setChips((prev) => props.chips);
    }
  }, [props.chips]);

  function handleDelete(chipToDelete) {
    setChips((prev) => prev.filter((chip) => chip !== chipToDelete));
  }

  function handleKey(e) {
    if (e.key === '#') {
      e.preventDefault();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (limitCount !== 0 && limitCount == chips.length) {
        winiMsg.showAlert(
          `추가할수 있는 해시 태그는 최대 ${limitCount}개입니다.`,
        );
        setChips((prev) => [...prev]);
        setText('');
        return;
      }

      let newHashtagName = text.trim();
      if (newHashtagName === '') return;
      if (chips.includes('#'.concat(newHashtagName))) {
        winiMsg.showAlert('이미 추가된 해시 태그입니다.');
        return;
      }
      setChips((prev) => [...prev, newHashtagName]);
      setText('');
    }
  }

  const Hashtag = (chip) => {
    let sx = { borderColor: 'rgba(25, 118, 210, 0.5)', color: '#1976d2' };
    let chipsProps = {};
    if (props.chipsProps) {
      chipsProps = props.chipsProps;
      if (props.sx) {
        sx = props.sx;
        sx[color] = sx.color ? sx.color : '#4e4e4e';
        sx[backgroundColor] = sx.backgroundColor
          ? sx.backgroundColor
          : '#abd8ff';
      }
    }

    return (
      <WiniChip
        key={chip}
        label={'#' + chip}
        {...chipsProps}
        variant={'outlined'}
        // color={"primary"}
        sx={sx}
        size={'small'}
        onDelete={readOnly ? undefined : () => handleDelete(chip)}
      />
    );
  };

  let className = 'winicomponent winihashtaginput ';
  if (props.className !== undefined && props.className !== null) {
    className += props.className;
  }
  return (
    <>
      <WiniBox
        ref={ref}
        className={className}
        {...props}
        sx={{
          border: readOnly ? undefined : '1px solid lightgrey',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          padding: '2px 5px ',
          position: 'relative',
          overflowY: 'auto',
          borderRadius: 1,
          marginTop: '1px',
          height: props.height ? props.height : 'auto',
          width: props.width
            ? isNaN(props.width)
              ? props.width
              : props.width - 12
            : null,
          maxWidth: props.maxWidth ? props.maxWidth - 12 : null,
        }}
      >
        {showAll || chips.length <= viewCount
          ? chips.map((chip) => Hashtag(chip))
          : [
              chips.slice(0, viewCount).map((chip) => Hashtag(chip)),
              <WiniButton
                key="showAll"
                variant="text"
                color="info"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAll(true);
                }}
                sx={{
                  minWidth: 'fit-content',
                  padding: '0 8px',
                  mx: '-1px',
                  height: '24px',
                  minHeight: '24px',
                }}
              >
                +{chips.length - viewCount}
              </WiniButton>,
            ]}
        {!readOnly && (
          <WiniInputBase
            variant="standard"
            onKeyDown={(e) => handleKey(e)}
            onChange={(e) => setText(e.target.value)}
            value={text}
            sx={{ fontSize: '1.28rem', flex: 1, height: 24 }}
            placeholder="해시태그 입력 후 Enter"
            onFocus={() => setShowAll(true)}
            onBlur={() => setShowAll(false)}
          />
        )}
      </WiniBox>
    </>
  );
});

export default WiniHashTagInput;
