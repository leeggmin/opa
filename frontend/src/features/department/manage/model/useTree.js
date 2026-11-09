import { useState, useEffect } from 'react';
import { winiCom, handleApiError } from '@/shared/lib';
import menuStore from '@/shared/model/store/menuStore';
import { getDepartmentTree, getDepartmentList } from '../api/api';

/**
 * 부서 트리 조회 및 선택 관리
 */
export const useTree = () => {
  const { connector, id: formMenuId } = winiCom.getFormInfo();
  const [deptTreeList, setDeptTreeList] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * 부서 트리 목록 조회
   */
  const loadDepartmentTree = async (search = '') => {
    const currentMenuId = menuStore.getCurrentMenuId();
    if (formMenuId && currentMenuId !== formMenuId) return;

    try {
      const treeData = await getDepartmentTree(connector);
      const listData = await getDepartmentList(connector);

      if (treeData.result === 'SUCCESS') {
        let tree = treeData.data;

        if (search && search.trim() !== '') {
          tree = filterTree(tree, search);
        }

        setDeptTreeList(tree);
      }

      if (listData.result === 'SUCCESS') {
        setDeptList(listData.data);
      }
    } catch (error) {
      await handleApiError(error);
    }
  };

  /**
   * 트리 검색 필터링
   */
  const filterTree = (nodes, term) => {
    return nodes
      .map((node) => {
        if (node.children) {
          const filteredChildren = filterTree(node.children, term);

          if (
            filteredChildren.length > 0 ||
            node.departmentName.toLowerCase().includes(term.toLowerCase())
          ) {
            return { ...node, children: filteredChildren };
          }
        } else if (
          node.departmentName.toLowerCase().includes(term.toLowerCase())
        ) {
          return node;
        }
        return null;
      })
      .filter(Boolean);
  };

  /**
   * 노드 선택
   */
  const selectNode = (nodeInfo) => {
    if (nodeInfo && nodeInfo.length > 0) {
      const selected = { ...nodeInfo[0].data };
      setSelectedNode(selected);
      return selected;
    }
    return null;
  };

  /**
   * 부서 검색
   */
  const searchDepartment = (term) => {
    setSearchTerm(term);
    loadDepartmentTree(term);
  };

  /**
   * 선택된 노드 초기화
   */
  const resetSelectedNode = () => {
    setSelectedNode(null);
  };

  /**
   * 초기 로드
   */
  useEffect(() => {
    loadDepartmentTree();
    // 최초 진입 1회 로드: 메뉴 이동 중 connector 변경으로 인한 재호출 방지
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    deptTreeList,
    setDeptTreeList,
    deptList,
    selectedNode,
    searchTerm,
    setSearchTerm,
    loadDepartmentTree,
    selectNode,
    searchDepartment,
    resetSelectedNode,
  };
};
