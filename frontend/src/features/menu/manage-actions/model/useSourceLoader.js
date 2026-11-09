import { useCallback } from 'react';
import { winiCom, extractUrlPatterns } from '@/shared/lib';
import { winiMsg } from '@/shared/model';
import { createProgramAction } from '../api/api';

/**
 * 소스 코드에서 액션 가져오기 훅
 */
export const useSourceLoader = (
  selectedProgramData,
  actionAllList,
  onActionChanged,
) => {
  const { connector } = winiCom.getFormInfo();

  const loadFromSource = useCallback(async () => {
    if (!selectedProgramData.mapping || !actionAllList) {
      return;
    }

    // 이미 존재하는 액션 목록
    const prevActionMap = {};
    actionAllList.forEach((action) => {
      const key = `${action.actionType}=${action.authType}=${action.uri}`;
      prevActionMap[key] = true;
    });

    // FSD 구조만 스캔 (pages, widgets, features, entities)
    const modules = import.meta.glob([
      '/src/pages/**/*.{jsx,js}',
      '/src/widgets/**/api/**/*.{jsx,js}',
      '/src/features/**/api/**/*.{jsx,js}',
      '/src/entities/**/api/**/*.{jsx,js}',
    ]);

    // 소스 코드를 텍스트로 읽기 위한 raw import
    const rawModules = import.meta.glob(
      [
        '/src/pages/**/*.{jsx,js}',
        '/src/widgets/**/*.{jsx,js}',
        '/src/features/**/*.{jsx,js}',
        '/src/entities/**/*.{jsx,js}',
      ],
      { as: 'raw' },
    );

    modules[import.meta.url] = () => import(import.meta.url);

    // 상대 경로(..)를 제거하고 정규화
    const normalizedMapping = selectedProgramData.mapping.replace(/^\.\.\//, '');

    // 페이지 파일 찾기
    let pageFilePath = null;
    for (let modulesKey in modules) {
      if (modulesKey.includes(`/${normalizedMapping}.`)) {
        pageFilePath = modulesKey;
        break;
      }
    }

    if (!pageFilePath) {
      winiMsg.showSnackbar('페이지 파일을 찾을 수 없습니다.');
      return;
    }

    const normalizePath = (path) => {
      const parts = [];
      path.split('/').forEach((part) => {
        if (!part || part === '.') return;
        if (part === '..') {
          parts.pop();
          return;
        }
        parts.push(part);
      });

      return `/${parts.join('/')}`;
    };

    const getDirectoryPath = (filePath) =>
      filePath.slice(0, filePath.lastIndexOf('/'));

    const resolveImportPath = (filePath, importPath) => {
      if (!importPath.startsWith('@/') && !importPath.startsWith('.')) {
        return null;
      }

      const basePath = importPath.startsWith('@/')
        ? normalizePath(`/src/${importPath.slice(2)}`)
        : normalizePath(`${getDirectoryPath(filePath)}/${importPath}`);

      const candidates = [
        basePath,
        `${basePath}.js`,
        `${basePath}.jsx`,
        `${basePath}/index.js`,
        `${basePath}/index.jsx`,
      ];

      return candidates.find((candidate) => rawModules[candidate]) || null;
    };

    const getFsdSlicePath = (layer, importPath) => {
      const pathParts = importPath.split('/');
      const segmentNames = ['api', 'model', 'ui'];
      const secondPathPart = pathParts[1];

      if (
        layer === 'features' &&
        secondPathPart &&
        !segmentNames.includes(secondPathPart) &&
        !/\.[jt]sx?$/.test(secondPathPart)
      ) {
        return `${pathParts[0]}/${secondPathPart}`;
      }

      return pathParts[0];
    };

    const addFsdPath = (resolvedPath) => {
      const [, layer, importPath] = resolvedPath.match(
        /^\/src\/(widgets|features|entities)\/(.+)$/,
      ) || [];

      if (!layer || !importPath) return;

      const slicePath = getFsdSlicePath(layer, importPath);
      if (layer === 'widgets') widgetPaths.add(slicePath);
      if (layer === 'features') featurePaths.add(slicePath);
      if (layer === 'entities') entityPaths.add(slicePath);
    };

    const extractImportPaths = (sourceCode) => {
      const importRegex = /(?:import|export)\s+(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g;
      return [...sourceCode.matchAll(importRegex)].map((match) => match[1]);
    };

    let featurePaths = new Set();
    let widgetPaths = new Set();
    let entityPaths = new Set();

    // FSD 아키텍처 기반 재귀 추적 (페이지 → widgets → features → entities)
    let visited = new Set();

    const collectDependenciesDFS = async (filePath) => {
      if (!filePath || visited.has(filePath)) return;
      visited.add(filePath);

      try {
        if (rawModules[filePath]) {
          const sourceCode = await rawModules[filePath]();
          const importPaths = extractImportPaths(sourceCode);

          for (const importPath of importPaths) {
            const resolvedPath = resolveImportPath(filePath, importPath);
            if (!resolvedPath) continue;

            addFsdPath(resolvedPath);
            await collectDependenciesDFS(resolvedPath);
          }
        }
      } catch {
        // 의존성 추적 실패 시 무시
      }
    };

      // 페이지부터 재귀적으로 의존성 추적
      await collectDependenciesDFS(pageFilePath);

      let allResults = [];

    // 추적된 widgets/features/entities의 api 세그먼트에서만 URL 추출
    for (let modulesKey in rawModules) {
      // API 파일만 매칭 (api 폴더 내부, model/ui 제외)
      const isApiFile =
        (Array.from(featurePaths).some(
          (f) =>
            modulesKey.includes(`/features/${f}/`) &&
            modulesKey.includes('/api/'),
        ) ||
          Array.from(widgetPaths).some(
            (w) =>
              modulesKey.includes(`/widgets/${w}/`) &&
              modulesKey.includes('/api/'),
          ) ||
          Array.from(entityPaths).some(
            (e) =>
              modulesKey.includes(`/entities/${e}/`) &&
              modulesKey.includes('/api/'),
          )) &&
        !modulesKey.includes('/model/') &&
        !modulesKey.includes('/ui/');

      if (isApiFile) {
        try {
          const apiSourceCode = await rawModules[modulesKey]();
          const result = extractUrlPatterns(apiSourceCode);
          allResults.push(...result);
        } catch {
          // API 파일 파싱 실패 시 무시
        }
      }
    }

    // 중복 제거
    const uniqueResults = [];
    const resultMap = {};
    allResults.forEach((action) => {
      const key = `${action.actionType}=${action.authType}=${action.uri}`;
      if (!resultMap[key]) {
        resultMap[key] = true;
        uniqueResults.push(action);
      }
    });

    let result = uniqueResults;

    // 기존에 존재하는 항목 제외
    result = result.filter(
      (action) =>
        !prevActionMap[`${action.actionType}=${action.authType}=${action.uri}`],
    );

    if (result.length) {
      const actionStr = result
        .map((item) => `${item.authType} ${item.uri}`)
        .join('\n');

      const ans = await winiMsg.showConfirm(
        '다음의 액션이 발견되었습니다. 등록 하시겠습니까?\n\n' + actionStr,
      );

      if (ans === 'Y') {
        // 검색된 url 등록
        for (let resultIndex = 0; resultIndex < result.length; resultIndex++) {
          const item = result[resultIndex];

          const params = {
            actionType: item.actionType,
            authType: item.authType,
            uri: item.uri,
          };

          try {
            await createProgramAction(
              connector,
              selectedProgramData.id,
              params,
            );
          } catch (err) {
            if (err.response) {
              winiMsg.showAlert(err.response.data.message);
            }
          }
        }

        onActionChanged();
        winiMsg.showSnackbar('신규 발견된 액션이 등록되었습니다.');
      }
    } else {
      winiMsg.showSnackbar('신규 발견된 액션이 없습니다.');
    }
  }, [selectedProgramData, actionAllList, connector, onActionChanged]);

  return {
    loadFromSource,
  };
};
