import React from 'react';
import { Communicator } from '@/shared/api';
import { ENV } from '@/shared/config';

const modules = {
  ...import.meta.glob('../../../pages/**/*.{js,jsx}'),
};

/**
 * 사용자 입력 경로를 정규화하는 함수
 * ../pages/, pages/, ../ 등의 prefix 제거
 */
const normalizePath = (path) => {
  if (!path) return '';
  return path
    .trim()
    .replace(/\\/g, '/') // windows 경로 호환
    .replace(/^(\.\.\/)+/, '') // ../ 반복 제거
    .replace(/^\/+/, '') // leading slash 제거
    .replace(/^src\/pages\//, '') // src/pages prefix 제거
    .replace(/^pages\//, ''); // pages prefix 제거
};

/**
 * 사용자 입력 경로로 modules 키를 찾는 함수
 * @param {string} path - 사용자 입력 경로 (예: menu-management/ui/MenuManagementPage)
 * @returns {string|undefined} - 매칭되는 modules 키
 */
const findModulePath = (path) => {
  const normalizedPath = normalizePath(path);
  if (!normalizedPath) return undefined;

  // 우선순위: 파일 직접 지정 -> 폴더 엔트리(index)
  const candidates = [
    `${normalizedPath}.jsx`,
    `${normalizedPath}.js`,
    `${normalizedPath}/index.jsx`,
    `${normalizedPath}/index.js`,
  ];

  const moduleKeys = Object.keys(modules);
  for (const candidate of candidates) {
    const found = moduleKeys.find((key) => key.endsWith(`/${candidate}`));
    if (found) return found;
  }

  console.error('No module path found for:', path, 'normalized:', normalizedPath);
  return undefined;
};

const noop = () => {};

/**
 * 개발 환경에서 동적 컴포넌트 로딩을 위한 훅
 * localhost에서만 동작하며, URL 쿼리 파라미터로 컴포넌트 경로를 받아 로드
 * @example ?path=menu-management/ui/MenuManagementPage
 */
export const useDynamicDevComponent = () => {
  const [DynamicComponent, setDynamicComponent] = React.useState('...loading');
  const [winiEvent, setWiniEvent] = React.useState({
    noop,
    select: noop,
    insert: noop,
    update: noop,
    delete: noop,
    print: noop,
    reset: noop,
  });
  const [contextValue, setContextValue] = React.useState({});

  // 동적 컴포넌트 로딩
  React.useEffect(() => {
    if (location.hostname !== 'localhost') {
      return setDynamicComponent('로컬 개발환경에서만 사용 가능합니다.');
    }
    if (ENV.IS_PROD) {
      return setDynamicComponent('프로덕션 환경에서는 사용할 수 없습니다.');
    }

    const params = new URLSearchParams(window.location.search);
    const rawPath = params.get('path');

    if (!rawPath) {
      return setDynamicComponent(
        '주소형식은 localhost:5173/dev?path=menu-request-permission 또는 localhost:5173/dev?path=menu-management/ui/MenuManagementPage 입니다. 형식에 맞추어주세요',
      );
    }

    const uriString = decodeURIComponent(rawPath);
    const modulePath = findModulePath(uriString);
    if (!modulePath) {
      return setDynamicComponent(
        uriString +
          ' 해당 주소가 없습니다. 주소 및 주소의 대소문자 확인 해주세요.',
      );
    }

    const Component = React.lazy(() =>
      modules[modulePath]().then((mod) => {
        if (mod?.default) return { default: mod.default };

        // named export만 있는 케이스 폴백: export가 1개면 그걸 사용
        const keys = mod ? Object.keys(mod) : [];
        if (keys.length === 1 && mod[keys[0]]) {
          return { default: mod[keys[0]] };
        }

        return {
          default: () => `모듈은 로드했지만 default export가 없습니다: ${modulePath}`,
        };
      }),
    );
    return setDynamicComponent(Component);
  }, []);

  // 개발용 컨텍스트 설정
  React.useEffect(() => {
    const connector = new Communicator();
    connector.client.defaults.headers.common['X-Menu-Id'] = 'DEV';
    setContextValue({
      id: 'DEV',
      winiEvent,
      info: {},
      connector,
      winiAut: {
        select: 'ALLOW',
        insert: 'ALLOW',
        update: 'ALLOW',
        delete: 'ALLOW',
        print: 'ALLOW',
        down: 'ALLOW',
        manage: 'ALLOW',
      },
    });
  }, [winiEvent]);

  return {
    DynamicComponent,
    contextValue,
  };
};
