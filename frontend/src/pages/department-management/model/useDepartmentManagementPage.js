import { useEffect, useRef } from 'react';
import { useDepartmentManageTree } from '@/features/department/manage';
import { useDepartmentManageEditor } from '@/features/department/manage';
import { useDepartmentManageOrder } from '@/features/department/manage';

/**
 * 부서 관리 페이지 통합 Hook
 */
export const useDepartmentManagementPage = () => {
  const treeRef = useRef(null);

  const {
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
  } = useDepartmentManageTree();

  const {
    formData,
    handleChange,
    handleCheckboxChange,
    handleCreate,
    handleUpdate,
    handleDelete,
    setDeptInfo,
    reset,
  } = useDepartmentManageEditor(() => {
    loadDepartmentTree();
    treeRef.current.openAll();
  });

  const { saveDepartmentOrder } = useDepartmentManageOrder(() => {
    loadDepartmentTree();
  });

  const handleSelectNode = (nodeInfo) => {
    const selected = selectNode(nodeInfo);
    if (selected) {
      setDeptInfo(selected);
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSearch = () => {
    searchDepartment(searchTerm);
    reset();
  };

  const handleKeyUpSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTreeChange = (e, newData) => {
    setDeptTreeList(newData);
  };

  const handleSaveOrder = () => {
    saveDepartmentOrder(deptTreeList);
  };

  const handleReset = () => {
    reset();
    loadDepartmentTree('');
    resetSelectedNode();
    setSearchTerm('');
    if (treeRef.current) {
      treeRef.current.deselectAll();
      treeRef.current.closeAll();
    }
  };

  const handleAdd = () => {
    handleCreate(deptList);
  };

  useEffect(() => {
    if (selectedNode) {
      setDeptInfo(selectedNode);
    }
  }, [selectedNode, setDeptInfo]);

  useEffect(() => {
    if (searchTerm?.trim() && treeRef.current && deptTreeList.length > 0) {
      treeRef.current.openAll();
    }
  }, [searchTerm, deptTreeList]);

  return {
    treeRef,
    deptTreeList,
    deptList,
    formData,
    searchTerm,
    handleSelectNode,
    handleSearchChange,
    handleKeyUpSearch,
    handleSearch,
    handleTreeChange,
    handleSaveOrder,
    handleChange,
    handleCheckboxChange,
    handleReset,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};
