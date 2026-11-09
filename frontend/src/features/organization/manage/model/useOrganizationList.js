import { createOrganization, deleteOrganization, fetchOrganizations, updateOrganization } from "@/entities/organization";
import { winiCom } from "@/shared/lib";
import { winiMsg } from "@/shared/model";
import { useCallback, useRef, useState } from "react";

/*
  조직 목록 조회 및 검색 로직
*/
export const useOrganizationList = () => {
  const ORGANIZATION_CODE_REGEX = /^[A-Z0-9]+$/;
  const { connector } = winiCom.getFormInfo();
  const [searchParam, setSearchParam] = useState({
    name: '',
  });
  const [open, setOpen] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const gridApiRef = useRef(null);
  const [selectedOrg, setSelectedOrg] = useState({
    id: '',
    organizationCode: '',
    organizationName: ''
  });

  const handleSearch = async () => {
    try {
      const data = await fetchOrganizations(connector);
      if (data.result === 'SUCCESS') {
        if (searchParam.name === '') {
          setOrgList(data.data);
        } else {
          setOrgList(
            data.data.filter((org) =>
              org.organizationName?.toLowerCase().includes(searchParam.name.toLowerCase()),
            ),
          );
        }
      }
    } catch (error) {
      winiMsg.showSnackbar(winiCom.getErrorMessage(error.response?.data?.message));
    }
  }

  const onSelectionChanged = useCallback((params) => {
    const api = gridApiRef.current?.api || params.api;
    const row = api?.getSelectedRows?.()[0];
    if (row) {
      setSelectedOrg(row);
    }
  }, []);

  const onCellDoubleClicked = useCallback((params) => {
    const api = gridApiRef.current?.api || params.api;
    const row = api?.getSelectedRows?.()[0];
    if (row) {
      setSelectedOrg(row);
    }
    setOpen(true);
  }, []);

  const onClose = () => {
    setOpen(false);
  }
  const onTextChange = (e) => {
    const { name, value } = e.target;

    if (name === "organizationCode") {
      const normalizedCode = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
      setSelectedOrg({ ...selectedOrg, [name]: normalizedCode });
      return;
    }

    setSelectedOrg({ ...selectedOrg, [name]: value });
  }
  const onSave = async () => {
    if (selectedOrg.organizationCode === '') {
      winiMsg.showAlert('조직코드를 입력해주세요.');
      return;
    }
    if (selectedOrg.organizationName === '') {
      winiMsg.showAlert('조직명을 입력해주세요.');
      return;
    }
    if(selectedOrg.organizationCode.length < 4) {
      winiMsg.showAlert('조직코드는 4자 이상 입력해주세요.');
      return;
    }
    if (!ORGANIZATION_CODE_REGEX.test(selectedOrg.organizationCode)) {
      winiMsg.showAlert('조직코드는 영문 대문자와 숫자만 입력 가능합니다.');
      return;
    }
    let payload = {
      organizationCode: selectedOrg.organizationCode,
      organizationName: selectedOrg.organizationName,
    }
    if (selectedOrg.id === '') {
      const res = await createOrganization(connector, payload);
      if (res.result === 'SUCCESS') {
        winiMsg.showSnackbar('조직이 등록 되었습니다');
        setOpen(false);
        handleSearch();
      }
    } else {
      const res = await updateOrganization(connector, selectedOrg.id, payload);
      if (res.result === 'SUCCESS') {
        winiMsg.showSnackbar('조직이 수정 되었습니다');
        setOpen(false);
        handleSearch();
      }
    }
  }
  const onDelete = async () => {
    if (selectedOrg.id === '00000000-0000-0000-0000-000000000000') {
      winiMsg.showAlert('해당 조직은 삭제할 수 없습니다.')
      return;
    } else {
      const ans = await winiMsg.showConfirm('해당 조직을 삭제 하시겠습니까?');
      if (ans !== 'Y') return;
      const res = await deleteOrganization(connector, selectedOrg.id);
      if (res.result === 'SUCCESS') {
        winiMsg.showSnackbar('조직이 삭제 되었습니다');
        setOpen(false);
        handleSearch();
      }
    }
  }
  const openCreate = () => {
    setOpen(true);
    setSelectedOrg({
      id: '',
      organizationCode: '',
      organizationName: ''
    });
  }
  
  return {
    open,
    setOpen,
    gridApiRef,
    searchParam,
    setSearchParam,
    handleSearch,
    // onGridReady,
    onSelectionChanged,
    onCellDoubleClicked,
    onClose,
    selectedOrg,
    setSelectedOrg,
    onTextChange,
    onSave,
    onDelete,
    orgList,
    openCreate,
  };
};