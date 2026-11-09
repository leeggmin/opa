import React, { useEffect, useRef, useState } from 'react';
import {
  WiniAccordion,
  WiniAccordionDetails,
  WiniAccordionSummary,
  WiniBox,
  WiniButton,
  WiniCode,
  WiniGridLayout,
  WiniTab,
  WiniTabPanel,
  WiniTabs,
  WiniTypography,
} from '@/shared/ui/wini';
import { color } from '@/shared/config/theme';
import { WiniFormEmpty } from '@/shared/ui/blocks/form-layout';

const normalizeKeys = (keys) =>
  Array.from(
    new Set(
      (keys ?? []).filter((key) => typeof key === 'string' && key.length > 0),
    ),
  );

const createCopyState = (keys) =>
  Object.fromEntries(keys.map((key) => [key, 'copy']));

const hasSameKeys = (prevState, nextKeys) => {
  const prevKeys = Object.keys(prevState);
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }

  const prevKeySet = new Set(prevKeys);
  return nextKeys.every((key) => prevKeySet.has(key));
};

export const useGuideCopy = (keys) => {
  const normalizedKeys = normalizeKeys(keys);
  const serializedKeys = JSON.stringify(normalizedKeys);

  const [copyState, setCopyState] = useState(createCopyState(normalizedKeys));
  const timersRef = useRef({});

  useEffect(() => {
    const nextKeys = JSON.parse(serializedKeys);
    setCopyState((prevState) => {
      if (hasSameKeys(prevState, nextKeys)) {
        return prevState;
      }
      return createCopyState(nextKeys);
    });
  }, [serializedKeys]);

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleCopy = async (key, code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState((prev) => ({ ...prev, [key]: 'complete' }));

      if (timersRef.current[key]) {
        clearTimeout(timersRef.current[key]);
      }
      timersRef.current[key] = setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [key]: 'copy' }));
      }, 2000);

      window?.pubUI?.toast?.({
        text: '복사가 완료되었습니다.',
        time: 2000,
        type: 'success',
      });
    } catch (error) {
      console.error('복사 실패:', error);
    }
  };

  return { copyState, handleCopy };
};

const normalizeGuideItems = (value) => {
  if (Array.isArray(value)) {
    return value
      .filter((item) => typeof item === 'string')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }

  return [];
};

const normalizeGuideExampleItems = (value) => {
  const source = Array.isArray(value) ? value : value ? [value] : [];

  return source
    .map((item) => {
      if (typeof item === 'string') {
        const trimmed = item.trim();
        return trimmed ? { code: trimmed } : null;
      }

      if (!item || typeof item !== 'object') {
        return null;
      }

      const title = typeof item.title === 'string' ? item.title.trim() : '';
      const description =
        typeof item.description === 'string' ? item.description.trim() : '';
      const code = typeof item.code === 'string' ? item.code.trim() : '';
      const previewTitle =
        typeof item.previewTitle === 'string' ? item.previewTitle.trim() : '';
      const previewDescription =
        typeof item.previewDescription === 'string'
          ? item.previewDescription.trim()
          : '';

      if (
        !title &&
        !description &&
        !code &&
        !item.preview &&
        !previewTitle &&
        !previewDescription
      ) {
        return null;
      }

      return {
        title,
        description,
        code,
        preview: item.preview,
        previewTitle,
        previewDescription,
      };
    })
    .filter(Boolean);
};

const normalizeGuidePropOptions = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === 'string') {
        const trimmed = item.trim();
        return trimmed ? { value: trimmed } : null;
      }

      if (!item || typeof item !== 'object') {
        return null;
      }

      const optionValue =
        typeof item.value === 'string' ? item.value.trim() : '';
      const label = typeof item.label === 'string' ? item.label.trim() : '';
      const description =
        typeof item.description === 'string' ? item.description.trim() : '';
      const examples = normalizeGuideExampleItems(
        item.examples ?? item.example,
      );

      if (!optionValue && !label && !description && !examples.length) {
        return null;
      }

      return {
        value: optionValue,
        label,
        description,
        examples,
      };
    })
    .filter(Boolean);
};

const normalizeGuidePropItems = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === 'string') {
        const trimmed = item.trim();
        return trimmed ? { name: trimmed } : null;
      }

      if (!item || typeof item !== 'object') {
        return null;
      }

      const name = typeof item.name === 'string' ? item.name.trim() : '';
      const description =
        typeof item.description === 'string' ? item.description.trim() : '';
      const values = Array.isArray(item.values)
        ? item.values
            .filter((valueItem) => typeof valueItem === 'string')
            .map((valueItem) => valueItem.trim())
            .filter(Boolean)
        : typeof item.values === 'string'
          ? item.values
              .split('|')
              .map((valueItem) => valueItem.trim())
              .filter(Boolean)
          : [];
      const examples = normalizeGuideExampleItems(item.examples ?? item.example);
      const options = normalizeGuidePropOptions(item.options);

      if (
        !name &&
        !description &&
        !values.length &&
        !examples.length &&
        !options.length
      ) {
        return null;
      }

      return { name, description, values, examples, options };
    })
    .filter(Boolean);
};

const extractGuidePropNames = (value) =>
  uniqueItems(
    normalizeGuidePropItems(value)
      .map((item) => item.name)
      .filter(Boolean),
  );

const uniqueItems = (items) => Array.from(new Set(items));

const DEFAULT_META_TITLE_PROPS = {
  variant: 'span',
  ui: 'point_text',
};

const GUIDE_BOX_UI = 'noAutoGap';
const GUIDE_BTNBOX_UI = 'btnbox noAutoGap';
const GUIDE_PROP_GROUP_STYLES = {
  required: {
    sectionClassName:
      'mt-3 overflow-hidden rounded-xl border border-[#CFE0F4] bg-[#F8FBFF]',
    sectionHeaderClassName:
      'flex items-center gap-2 border-b border-[#DCE9F7] px-4 py-3',
    badgeClassName: 'rounded-full bg-[#E7F1FB] px-2 py-1',
    badgeTextClassName: 'text-xs font-bold',
    badgeTextSx: { color: color.brand.main },
    titleSx: { color: color.brand.main },
    cardClassName:
      'mt-2 overflow-hidden rounded-sm border border-[#CFE0F4] bg-white',
    cardHeaderClassName: 'border-b border-[#DCE9F7] bg-[#F8FBFF] px-4 py-3',
    valueChipClassName: 'rounded-full bg-[#EEF6FF] px-2 py-1',
  },
  optional: {
    sectionClassName:
      'mt-3 overflow-hidden rounded-xl border border-[#E5EAF0] bg-[#FCFDFE]',
    sectionHeaderClassName:
      'flex items-center gap-2 border-b border-[#EDF1F5] px-4 py-3',
    badgeClassName: 'rounded-full bg-[#F2F4F7] px-2 py-1',
    badgeTextClassName: 'text-xs font-bold',
    badgeTextSx: { color: color.text.sub },
    titleSx: { color: color.text.dark },
    cardClassName:
      'mt-2 overflow-hidden rounded-sm border border-[#E2E8F0] bg-white',
    cardHeaderClassName: 'border-b border-[#EDF1F5] bg-[#FAFBFC] px-4 py-3',
    valueChipClassName: 'rounded-full bg-[#F5F7FA] px-2 py-1',
  },
};

const resolveSxValue = (sx, theme) => {
  if (!sx) {
    return {};
  }

  return typeof sx === 'function' ? sx(theme) : sx;
};

const mergeSx = (baseSx, overrideSx) => {
  if (!baseSx && !overrideSx) {
    return undefined;
  }

  return (theme) => ({
    ...resolveSxValue(baseSx, theme),
    ...resolveSxValue(overrideSx, theme),
  });
};

const mergeTypographyProps = (...propsList) =>
  propsList.filter(Boolean).reduce(
    (acc, current) => ({
      ...acc,
      ...current,
      className: [acc.className, current.className].filter(Boolean).join(' '),
      sx: mergeSx(acc.sx, current.sx),
    }),
    {},
  );

const extractPropsFromCode = (code) => {
  if (typeof code !== 'string' || !code.trim()) {
    return [];
  }

  const openingTagMatch = code.match(/<([A-Z][A-Za-z0-9_]*)\s*([^>]*)>/m);
  if (!openingTagMatch) {
    return [];
  }

  const propsSegment = openingTagMatch[2] ?? '';
  const propNames = [];
  const propPattern = /([A-Za-z_][A-Za-z0-9_-]*)\s*=/g;

  let match = propPattern.exec(propsSegment);
  while (match) {
    propNames.push(match[1]);
    match = propPattern.exec(propsSegment);
  }

  return uniqueItems(propNames);
};

const REQUIRED_HINT_PROPS = new Set([
  'value',
  'onChange',
  'label',
  'icon',
  'name',
  'checked',
  'container',
  'rowData',
  'columnDefs',
  'nodes',
  'data',
  'options',
  'id',
]);

const OPTIONAL_HINT_PROPS = new Set([
  'ui',
  'className',
  'sx',
  'size',
  'variant',
  'disabled',
  'readOnly',
  'multiline',
  'minRows',
  'titleFix',
  'columnSpacing',
  'rowSpacing',
  'fontSize',
  'scrollHidden',
  'ratio',
]);

const REQUIRED_KEYWORDS = /(필수|반드시|required|must|기본 사용)/i;
const OPTIONAL_KEYWORDS = /(옵션|선택|추가|조합|권장|보조)/i;

export const buildGuideMeta = ({ description, required, optional, code }) => {
  const descriptionItems = normalizeGuideItems(description);
  const explicitRequired = normalizeGuideItems(required);
  const explicitOptional = normalizeGuideItems(optional);

  const keywordRequired = descriptionItems.filter((item) =>
    REQUIRED_KEYWORDS.test(item),
  );
  const keywordOptional = descriptionItems.filter((item) =>
    OPTIONAL_KEYWORDS.test(item),
  );

  const codeProps = extractPropsFromCode(code);
  const requiredHintProps = codeProps
    .filter((prop) => REQUIRED_HINT_PROPS.has(prop))
    .slice(0, 3);
  const optionalHintProps = codeProps
    .filter((prop) => OPTIONAL_HINT_PROPS.has(prop))
    .slice(0, 4);

  let requiredItems = explicitRequired;
  let optionalItems = explicitOptional;

  if (!requiredItems.length) {
    if (keywordRequired.length) {
      requiredItems = keywordRequired;
    } else if (requiredHintProps.length) {
      requiredItems = [`핵심 props: \`${requiredHintProps.join('`, `')}\``];
    } else if (descriptionItems.length) {
      requiredItems = [descriptionItems[0]];
    } else {
      requiredItems = ['예제 코드를 기준으로 핵심 컴포넌트 props를 먼저 설정'];
    }
  }

  if (!optionalItems.length) {
    if (keywordOptional.length) {
      optionalItems = keywordOptional;
    } else if (optionalHintProps.length) {
      optionalItems = [`추가 props: \`${optionalHintProps.join('`, `')}\``];
    } else if (descriptionItems.length > 1) {
      optionalItems = descriptionItems.slice(1);
    } else {
      optionalItems = ['`className`, `ui`, `sx` 등을 상황에 맞게 선택 적용'];
    }
  }

  const requiredSet = new Set(requiredItems);
  const filteredOptional = optionalItems.filter(
    (item) => !requiredSet.has(item),
  );

  return {
    requiredItems: uniqueItems(requiredItems),
    optionalItems: uniqueItems(filteredOptional),
  };
};

export const GuideMetaInfo = ({
  requiredItems = [],
  optionalItems = [],
  requiredTitle = '필수 입력 요소',
  optionalTitle = '추가 옵션',
  displayMode = 'list',
  titleProps,
  requiredTitleProps,
  optionalTitleProps,
}) => {
  if (!requiredItems.length && !optionalItems.length) {
    return null;
  }

  const renderList = (title, items, customTitleProps) => {
    if (!items.length) {
      return null;
    }

    const mergedTitleProps = mergeTypographyProps(
      DEFAULT_META_TITLE_PROPS,
      titleProps,
      customTitleProps,
    );

    return (
      <WiniBox ui={GUIDE_BOX_UI} className="mt-3">
        <WiniTypography {...mergedTitleProps}>{title}</WiniTypography>
        {displayMode === 'chip' ? (
          <WiniBox
            ui={GUIDE_BOX_UI}
            className="mt-2 flex flex-wrap items-center gap-2"
          >
            {items.map((item, index) => (
              <WiniBox
                ui={GUIDE_BOX_UI}
                key={`${title}-${index}`}
                className="rounded-full bg-[#F3F7FB] px-3 py-1"
              >
                <WiniTypography
                  variant="span"
                  className="font-mono text-sm text-[#334155]"
                >
                  {item}
                </WiniTypography>
              </WiniBox>
            ))}
          </WiniBox>
        ) : (
          <ul className="list-disc pl-5 space-y-1 mt-1">
            {items.map((item, index) => (
              <li key={`${title}-${index}`}>
                <WiniTypography variant="span" className="text-md">
                  {item}
                </WiniTypography>
              </li>
            ))}
          </ul>
        )}
      </WiniBox>
    );
  };

  return (
    <WiniBox ui={GUIDE_BOX_UI} className="mt-2">
      {renderList(requiredTitle, requiredItems, requiredTitleProps)}
      {renderList(optionalTitle, optionalItems, optionalTitleProps)}
    </WiniBox>
  );
};

const buildGuideExampleEntries = ({
  examples = [],
  baseKey,
  defaultTitle = '예제',
  fallbackDescription,
}) =>
  (examples ?? []).map((example, exampleIndex) => ({
    key: `${baseKey}-${exampleIndex}`,
    title: example.title || defaultTitle,
    description: example.description ?? fallbackDescription,
    preview: example.preview,
    previewTitle: example.previewTitle,
    previewDescription: example.previewDescription,
    code: example.code,
  }));

const buildGuidePropDirectExampleEntries = (item, cardKey) =>
  buildGuideExampleEntries({
    examples: item.examples,
    baseKey: `${cardKey}-example`,
    defaultTitle:
      (item.examples?.length ?? 0) > 1 ? '기본 사용 예제' : '사용 예제',
  });

const buildGuidePropOptionExampleEntries = (option, cardKey, optionIndex) =>
  buildGuideExampleEntries({
    examples: option.examples,
    baseKey: `${cardKey}-option-${option.value || optionIndex}-example`,
    defaultTitle: option.value ? `${option.value} 값 예제` : '옵션 예제',
  });

const buildGuidePropExampleEntries = (item, cardKey) => [
  ...buildGuidePropDirectExampleEntries(item, cardKey),
  ...(item.options ?? []).flatMap((option, optionIndex) =>
    buildGuidePropOptionExampleEntries(option, cardKey, optionIndex),
  ),
];

const hasGuidePropExamples = (item) =>
  (item.examples?.length ?? 0) > 0 ||
  (item.options ?? []).some((option) => (option.examples?.length ?? 0) > 0);

const attachFallbackExampleToItems = (items, fallbackExample) => {
  if (!fallbackExample || !items.length) {
    return items;
  }

  const targetIndex = items.findIndex((item) => !hasGuidePropExamples(item));
  if (targetIndex < 0) {
    return items;
  }

  return items.map((item, index) =>
    index === targetIndex
      ? {
          ...item,
          examples: [...(item.examples ?? []), fallbackExample],
        }
      : item,
  );
};

const GuideExampleEntries = ({ entries = [], copyState, handleCopy }) => {
  if (!entries.length) {
    return null;
  }

  return (
    <WiniBox ui={GUIDE_BOX_UI} className="mt-3 flex flex-col gap-4">
      {entries.map((entry) => (
        <WiniBox ui={GUIDE_BOX_UI} key={entry.key}>
          <WiniTypography variant="span" className="block text-sm font-semibold">
            {entry.title}
          </WiniTypography>
          {entry.description ? (
            <WiniTypography
              variant="span"
              className="mt-1 block text-sm text-[#5B6675]"
            >
              {entry.description}
            </WiniTypography>
          ) : null}
          {entry.preview ? (
            <GuidePreviewBlock
              title={entry.previewTitle || '예제 미리보기'}
              description={entry.previewDescription || '실제 렌더링 결과'}
            >
              {entry.preview}
            </GuidePreviewBlock>
          ) : null}
          {entry.code ? (
            <WiniBox ui={GUIDE_BOX_UI} className="mt-2">
              <GuideCodeBlock
                code={entry.code}
                copyText={
                  copyState[entry.key] === 'copy' ? '복사하기' : '복사 완료'
                }
                onCopy={() => handleCopy(entry.key, entry.code)}
              />
            </WiniBox>
          ) : null}
        </WiniBox>
      ))}
    </WiniBox>
  );
};

const GuidePropOptionInfo = ({ options = [], cardKey, copyState, handleCopy }) => {
  if (!options.length) {
    return null;
  }

  return (
    <WiniBox ui={GUIDE_BOX_UI} className="mt-3">
      <WiniTypography
        variant="span"
        className="block text-sm font-semibold text-[#5B6675]"
      >
        값별 설명
      </WiniTypography>
      <WiniBox
        ui={GUIDE_BOX_UI}
        className="mt-2 overflow-hidden rounded-sm border border-[#E5ECF3] bg-[#FAFCFE]"
      >
        {options.map((option, optionIndex) => {
          const optionEntries = buildGuidePropOptionExampleEntries(
            option,
            cardKey,
            optionIndex,
          );

          return (
            <WiniBox
              ui={GUIDE_BOX_UI}
              key={`${option.value || optionIndex}`}
              className={`px-3 py-3 ${optionIndex > 0 ? 'border-t border-[#E5ECF3]' : ''}`}
            >
              <WiniBox ui={GUIDE_BOX_UI} className="flex flex-wrap items-center gap-2">
                {option.value ? (
                  <WiniBox
                    ui={GUIDE_BOX_UI}
                    className="rounded-full bg-white px-2 py-1"
                  >
                    <WiniTypography
                      variant="span"
                      className="font-mono text-xs font-semibold text-[#334155]"
                    >
                      {option.value}
                    </WiniTypography>
                  </WiniBox>
                ) : null}
                {option.label ? (
                  <WiniTypography
                    variant="span"
                    className="text-sm font-semibold text-[#334155]"
                  >
                    {option.label}
                  </WiniTypography>
                ) : null}
              </WiniBox>
              {option.description ? (
                <WiniTypography
                  variant="span"
                  className="mt-1 block text-sm text-[#5B6675]"
                >
                  {option.description}
                </WiniTypography>
              ) : null}
              <GuideExampleEntries
                entries={optionEntries}
                copyState={copyState}
                handleCopy={handleCopy}
              />
            </WiniBox>
          );
        })}
      </WiniBox>
    </WiniBox>
  );
};

const GuidePropCard = ({
  item,
  cardKey,
  copyState,
  handleCopy,
  groupType = 'optional',
}) => {
  const directExampleEntries = buildGuidePropDirectExampleEntries(item, cardKey);
  const groupStyle =
    GUIDE_PROP_GROUP_STYLES[groupType] ?? GUIDE_PROP_GROUP_STYLES.optional;
  const requirementLabel = groupType === 'required' ? '필수' : '선택';

  return (
    <WiniBox
      ui={GUIDE_BOX_UI}
      className={groupStyle.cardClassName}
    >
      <WiniBox
        ui={GUIDE_BOX_UI}
        className={`${groupStyle.cardHeaderClassName} flex items-center justify-between gap-3`}
      >
        {item.name ? (
          <WiniTypography variant="span" className="text-md font-semibold">
            <code>{item.name}</code>
          </WiniTypography>
        ) : null}
        <WiniBox ui={GUIDE_BOX_UI} className={groupStyle.badgeClassName}>
          <WiniTypography
            variant="span"
            className={groupStyle.badgeTextClassName}
            sx={groupStyle.badgeTextSx}
          >
            {requirementLabel}
          </WiniTypography>
        </WiniBox>
      </WiniBox>

      <WiniBox ui={GUIDE_BOX_UI} className="px-4 py-4">
        {item.description ? (
          <WiniTypography variant="span" className="block text-md">
            {item.description}
          </WiniTypography>
        ) : null}
        {item.values?.length ? (
          <WiniBox ui={GUIDE_BOX_UI} className="mt-3">
            <WiniTypography
              variant="span"
              className="block text-sm font-semibold text-[#5B6675]"
            >
              허용 값
            </WiniTypography>
            <WiniBox ui={GUIDE_BOX_UI} className="mt-1 flex flex-wrap items-center gap-2">
              {item.values.map((value) => (
                <WiniBox
                  ui={GUIDE_BOX_UI}
                  key={`${cardKey}-${value}`}
                  className={groupStyle.valueChipClassName}
                >
                  <WiniTypography
                    variant="span"
                    className="font-mono text-xs text-[#334155]"
                  >
                    {value}
                  </WiniTypography>
                </WiniBox>
              ))}
            </WiniBox>
          </WiniBox>
        ) : null}
        <GuideExampleEntries
          entries={directExampleEntries}
          copyState={copyState}
          handleCopy={handleCopy}
        />
        <GuidePropOptionInfo
          options={item.options}
          cardKey={cardKey}
          copyState={copyState}
          handleCopy={handleCopy}
        />
      </WiniBox>
    </WiniBox>
  );
};

export const GuidePropInfo = ({
  requiredProps = [],
  optionalProps = [],
  fallbackExample,
  sectionTitle = '속성별 설명 및 예제',
  requiredTitle = '필수 props 설명',
  optionalTitle = '선택 props 설명',
  titleProps,
  requiredTitleProps,
  optionalTitleProps,
}) => {
  const normalizedRequiredProps = attachFallbackExampleToItems(
    normalizeGuidePropItems(requiredProps),
    fallbackExample,
  );
  const normalizedOptionalProps = normalizedRequiredProps.length
    ? normalizeGuidePropItems(optionalProps)
    : attachFallbackExampleToItems(
        normalizeGuidePropItems(optionalProps),
        fallbackExample,
      );
  const copyKeys = [
    ...normalizedRequiredProps.flatMap((item, index) =>
      buildGuidePropExampleEntries(item, `required-${item.name || index}`)
        .filter((entry) => entry.code)
        .map((entry) => entry.key),
    ),
    ...normalizedOptionalProps.flatMap((item, index) =>
      buildGuidePropExampleEntries(item, `optional-${item.name || index}`)
        .filter((entry) => entry.code)
        .map((entry) => entry.key),
    ),
  ];
  const { copyState, handleCopy } = useGuideCopy(copyKeys);

  if (!normalizedRequiredProps.length && !normalizedOptionalProps.length) {
    return null;
  }

  const renderPropList = (title, items, customTitleProps, groupType) => {
    if (!items.length) {
      return null;
    }

    const groupStyle =
      GUIDE_PROP_GROUP_STYLES[groupType] ?? GUIDE_PROP_GROUP_STYLES.optional;
    const mergedTitleProps = mergeTypographyProps(
      DEFAULT_META_TITLE_PROPS,
      titleProps,
      customTitleProps,
    );

    return (
      <WiniBox ui={GUIDE_BOX_UI} className={groupStyle.sectionClassName}>
        <WiniBox ui={GUIDE_BOX_UI} className={groupStyle.sectionHeaderClassName}>
          <WiniBox ui={GUIDE_BOX_UI} className={groupStyle.badgeClassName}>
            <WiniTypography
              variant="span"
              className={groupStyle.badgeTextClassName}
              sx={groupStyle.badgeTextSx}
            >
              {groupType === 'required' ? '필수' : '선택'}
            </WiniTypography>
          </WiniBox>
          <WiniTypography
            {...mergedTitleProps}
            sx={mergeSx(mergedTitleProps.sx, groupStyle.titleSx)}
          >
            {title}
          </WiniTypography>
        </WiniBox>
        <WiniBox ui={GUIDE_BOX_UI} className="px-3 py-3">
          {items.map((item, index) => {
            const cardKey = `${title}-${item.name || index}`;

            return (
              <GuidePropCard
                key={cardKey}
                item={item}
                cardKey={cardKey}
                copyState={copyState}
                handleCopy={handleCopy}
                groupType={groupType}
              />
            );
          })}
        </WiniBox>
      </WiniBox>
    );
  };

  return (
    <WiniBox ui={GUIDE_BOX_UI} className="mt-2">
      <WiniTypography
        variant="span"
        component="h4"
        className="block text-md font-bold"
        sx={{ color: color.brand.main, fontSize: '16px' }}
      >
        {sectionTitle}
      </WiniTypography>
      {renderPropList(
        requiredTitle,
        normalizedRequiredProps,
        requiredTitleProps,
        'required',
      )}
      {renderPropList(
        optionalTitle,
        normalizedOptionalProps,
        optionalTitleProps,
        'optional',
      )}
    </WiniBox>
  );
};

export const GuidePage = ({ title, subtitle, description, children }) => (
  <WiniFormEmpty>
    <WiniGridLayout className="pt-8">
      <WiniTypography variant="h1">{title}</WiniTypography>
      <WiniTypography variant="h2">{subtitle}</WiniTypography>

      <WiniBox ui="info">
        <WiniTypography variant="span" className="text-md">
          {description}
        </WiniTypography>
      </WiniBox>

      <WiniBox className="mt-6">{children}</WiniBox>
    </WiniGridLayout>
  </WiniFormEmpty>
);

export const GuideCodeBlock = ({ code, copyText, onCopy }) => (
  <WiniBox ui={GUIDE_BOX_UI} className="bg-[#1A1A1A] p-6 rounded-sm relative">
    <WiniBox ui={GUIDE_BOX_UI} className="flex items-center justify-between">
      <WiniTypography variant="span" className="text-white text-lg">
        코드
      </WiniTypography>
      <WiniBox ui={GUIDE_BTNBOX_UI}>
        <WiniButton
          ui="gray"
          onClick={onCopy}
          className="transition-all duration-300"
        >
          {copyText}
        </WiniButton>
      </WiniBox>
    </WiniBox>
    <WiniCode code={code} language="jsx" />
  </WiniBox>
);

export const GuidePreviewBlock = ({
  children,
  title = '예제 미리보기',
  description = '실제 렌더링 결과',
}) => (
  <WiniBox
    ui={GUIDE_BOX_UI}
    className="mt-5 overflow-hidden rounded-xl border border-[#D9E1EA] bg-[#F8FBFF]"
  >
    <WiniBox
      ui={GUIDE_BOX_UI}
      className="flex items-center justify-between border-b border-[#D9E1EA] px-5 py-3"
    >
      <WiniTypography variant="span" className="text-md font-semibold">
        {title}
      </WiniTypography>
      <WiniTypography variant="span" className="text-sm text-[#5B6675]">
        {description}
      </WiniTypography>
    </WiniBox>
    <WiniBox ui={GUIDE_BOX_UI} className="bg-white px-5 py-5">
      {children}
    </WiniBox>
  </WiniBox>
);

export const GuideSection = ({
  title,
  description,
  required,
  optional,
  requiredItems: requiredItemsProp,
  optionalItems: optionalItemsProp,
  requiredProps = [],
  optionalProps = [],
  metaTitleProps,
  requiredMetaTitleProps,
  optionalMetaTitleProps,
  preview,
  code,
  copyText,
  onCopy,
  defaultExpanded = false,
  defaultTab = 'description',
  exampleLayout = 'tabs',
  keepSectionExample = false,
  hideSectionExample = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const guideMeta = buildGuideMeta({
    description,
    required: requiredItemsProp ?? required,
    optional: optionalItemsProp ?? optional,
    code,
  });
  const requiredPropNames = extractGuidePropNames(requiredProps);
  const optionalPropNames = extractGuidePropNames(optionalProps);
  const hasPropSummary = requiredPropNames.length > 0 || optionalPropNames.length > 0;

  const renderDescription = () => {
    if (Array.isArray(description)) {
      return (
        <ul className="list-disc pl-5 space-y-1">
          {description.map((item, index) => (
            <li key={index}>
              <WiniTypography variant="span" className="text-md">
                {item}
              </WiniTypography>
            </li>
          ))}
        </ul>
      );
    }

    if (React.isValidElement(description)) {
      return description;
    }

    return (
      <WiniTypography variant="span" className="text-md">
        {description}
      </WiniTypography>
    );
  };

  const renderDescriptionContent = () => (
    <>
      {renderDescription()}
      <GuideMetaInfo
        requiredItems={hasPropSummary ? requiredPropNames : guideMeta.requiredItems}
        optionalItems={hasPropSummary ? optionalPropNames : guideMeta.optionalItems}
        requiredTitle={hasPropSummary ? '필수 prop' : '필수 입력 요소'}
        optionalTitle={hasPropSummary ? '선택 prop' : '추가 옵션'}
        displayMode={hasPropSummary ? 'chip' : 'list'}
        titleProps={metaTitleProps}
        requiredTitleProps={requiredMetaTitleProps}
        optionalTitleProps={optionalMetaTitleProps}
      />
      <GuidePropInfo
        requiredProps={requiredProps}
        optionalProps={optionalProps}
        fallbackExample={
          shouldHideSectionExample && preview && code
            ? {
                title: '대표 사용 예제',
                preview,
                code,
              }
            : undefined
        }
        titleProps={metaTitleProps}
        requiredTitleProps={requiredMetaTitleProps}
        optionalTitleProps={optionalMetaTitleProps}
      />
    </>
  );

  const hasProps = requiredProps.length > 0 || optionalProps.length > 0;
  const shouldHideSectionExample =
    hideSectionExample ||
    (!keepSectionExample && hasProps && Boolean(preview) && Boolean(code));
  const hasSectionExample = !shouldHideSectionExample && preview && code;

  return (
    <WiniAccordion
      expanded={expanded}
      onChange={(_event, isExpanded) => setExpanded(isExpanded)}
      sx={{
        '&.MuiAccordion-root': {
          border: '1px solid #D9E1EA',
          borderRadius: '14px',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.06)',
          overflow: 'hidden',
        },
        '&.MuiAccordion-root:first-of-type': {
          borderTop: '1px solid #D9E1EA',
        },
        '&.MuiAccordion-root + .MuiAccordion-root': {
          marginTop: '10px',
        },
      }}
    >
      <WiniAccordionSummary
        sx={{
          minHeight: 84,
          px: 3,
          backgroundColor: expanded ? '#F8FBFF' : '#FFFFFF',
          '&.Mui-expanded': {
            minHeight: 84,
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: 0,
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            transition: 'transform 180ms ease',
          },
        }}
      >
        <WiniBox className="flex flex-col gap-1">
          <WiniTypography variant="h3">{title}</WiniTypography>
          <WiniTypography variant="span" className="text-md text-[#5B6675]">
            {Array.isArray(description)
              ? description[0]
              : typeof description === 'string'
                ? description
                : ''}
          </WiniTypography>
        </WiniBox>
      </WiniAccordionSummary>

      <WiniAccordionDetails sx={{ px: 3, pb: 3 }}>
        <WiniBox className="pt-1">
          {hasSectionExample && exampleLayout === 'stacked' ? (
            <>
              {renderDescriptionContent()}
              <GuidePreviewBlock>{preview}</GuidePreviewBlock>
              <WiniBox className="mt-5">
                <GuideCodeBlock
                  code={code}
                  copyText={copyText}
                  onCopy={onCopy}
                />
              </WiniBox>
            </>
          ) : hasSectionExample ? (
            <>
              <WiniTabs
                ui="full"
                value={activeTab}
                onChange={(_event, nextValue) => setActiveTab(nextValue)}
              >
                <WiniTab label="설명" value="description" />
                <WiniTab label="예제" value="example" />
              </WiniTabs>

              <WiniTabPanel value={activeTab} index="description">
                {renderDescriptionContent()}
              </WiniTabPanel>

              <WiniTabPanel value={activeTab} index="example">
                <GuidePreviewBlock>{preview}</GuidePreviewBlock>

                <WiniBox className="mt-5">
                  <GuideCodeBlock
                    code={code}
                    copyText={copyText}
                    onCopy={onCopy}
                  />
                </WiniBox>
              </WiniTabPanel>
            </>
          ) : (
            <WiniBox>{renderDescriptionContent()}</WiniBox>
          )}
        </WiniBox>
      </WiniAccordionDetails>
    </WiniAccordion>
  );
};
