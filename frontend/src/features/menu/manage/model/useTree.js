import { useState, useCallback } from 'react';
import { getMenuTree } from '../api/api';
import { winiMsg } from '@/shared/model';
import { filterMenuTreeById, getMenuOnly } from '@/shared/lib/menuUtils';
import { winiCom } from '@/shared/lib';

/**
 * 메뉴 트리 조회 및 관리 Hook
 */
export const useTree = () => {
  const connector = winiCom.getConnector();

  const [menu, setMenu] = useState([]);
  const [menuOnly, setMenuOnly] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const loadMenuTree = useCallback(
    async (search = '') => {
      try {
        const response = await getMenuTree(connector);
        let list = response.data || response;
        if (search.trim() !== '') {
          list = filterMenuTreeById(list, search.trim());
        }
        setMenu(list);
        setMenuOnly(getMenuOnly(response.data || response));
      } catch (err) {
        if (err.response) {
          winiMsg.showAlert(err.response.data.message);
        }
      }
    },
    [connector],
  );

  const selectNode = useCallback((nodeInfo) => {
    if (nodeInfo && nodeInfo.length > 0) {
      const data = nodeInfo[0].data;
      const selectedData = {
        id: data.id,
        chk: data.chk,
        name: data.name,
        menuCode: data.menuCode,
        menuMapping: data.menuMapping,
        status: data.status,
        menuStatus: data.menuStatus,
        menuType: data.menuType,
        sortSeq: data.sortSeq,
        parentMenuId: data.parentMenuId,
        programId: data.programId,
        programMapping: data.programMapping,
        children: data.children,
      };
      setSelectedNode((prev) => {
        if (
          prev &&
          prev.id === selectedData.id &&
          prev.chk === selectedData.chk &&
          prev.name === selectedData.name &&
          prev.menuCode === selectedData.menuCode &&
          prev.menuMapping === selectedData.menuMapping &&
          prev.status === selectedData.status &&
          prev.menuStatus === selectedData.menuStatus &&
          prev.menuType === selectedData.menuType &&
          prev.sortSeq === selectedData.sortSeq &&
          prev.parentMenuId === selectedData.parentMenuId &&
          prev.programId === selectedData.programId &&
          prev.programMapping === selectedData.programMapping
        ) {
          return prev;
        }
        return selectedData;
      });
    } else {
      setSelectedNode((prev) => (prev === null ? prev : null));
    }
  }, []);

  const resetSelectedNode = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const searchMenu = useCallback(
    async (term) => {
      setSearchTerm(term);
      await loadMenuTree(term);
    },
    [loadMenuTree],
  );

  return {
    menu,
    menuOnly,
    selectedNode,
    searchTerm,
    setMenu,
    setSelectedNode,
    loadMenuTree,
    selectNode,
    resetSelectedNode,
    searchMenu,
  };
};
