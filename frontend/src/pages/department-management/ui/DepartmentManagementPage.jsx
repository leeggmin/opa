import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { WiniGridItem, WiniGridLayout } from '@/shared/ui/wini';
import {
  DepartmentManageSearch,
  DepartmentManageTreeView,
  DepartmentManageEditor,
} from '@/features/department/manage';
import { useDepartmentManagementPage } from '../model/useDepartmentManagementPage';

/**
 * 부서 관리 페이지
 */
const DepartmentManagementPage = () => {
  const {
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
  } = useDepartmentManagementPage();

  return (
    <WiniFormNormal>
      <WiniGridLayout container>
        <WiniGridItem size={{ md: 6, xs: 12 }}>
          <DepartmentManageSearch
            searchTerm={searchTerm}
            onChange={handleSearchChange}
            onKeyUp={handleKeyUpSearch}
            onSearch={handleSearch}
            onSaveOrder={handleSaveOrder}
          />
        </WiniGridItem>
      </WiniGridLayout>

      <WiniGridLayout container className="flex justify-between">
        <WiniGridItem size={{ md: 6, xs: 12 }}>
          <DepartmentManageTreeView
            treeRef={treeRef}
            deptTreeList={deptTreeList}
            onSelect={handleSelectNode}
            onMove={handleTreeChange}
          />
        </WiniGridItem>

        <WiniGridItem size={{ md: 5.8, xs: 12 }}>
          <DepartmentManageEditor
            formData={formData}
            deptList={deptList}
            treeRef={treeRef}
            onChange={handleChange}
            onCheckboxChange={handleCheckboxChange}
            onReset={handleReset}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </WiniGridItem>
      </WiniGridLayout>
    </WiniFormNormal>
  );
};

export default DepartmentManagementPage;
