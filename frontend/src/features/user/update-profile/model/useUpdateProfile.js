import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { fetchDepartments } from '@/entities/department';
import { winiMsg, userStore } from '@/shared/model';
import { winiCom, winiFormat } from '@/shared/lib';
import { fetchUser as fetchUserApi, updateUser } from '@/entities/user';

const DEFAULT_PROFILE_BODY = {
    username: "",
    lastName: "",
    firstName: "",
    dutyName: "",
    departmentId: "",
    departmentName: "",
    phoneNumber: "",
    email: "",
};

export function useUpdateProfile(connector) {
    const formRef = useRef(null);
    const connectorRef = useRef(connector);
    const initialValuesRef = useRef({
        ...DEFAULT_PROFILE_BODY,
    });
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [values, setValues] = useState(() => ({
        ...DEFAULT_PROFILE_BODY,
    }));

    useEffect(() => {
        const loadDepartments = async () => {
            try {
                const data = await fetchDepartments(connectorRef.current);
                if (data.result === "SUCCESS") {
                    setDepartmentOptions(data.data || []);
                }
            } catch (error) {
                winiMsg.showSnackbar(winiCom.getErrorMessage(error?.response?.data?.message));
            }
        };

        loadDepartments();
    }, []);

    const loadUser = useCallback(async (userId) => {
        try {
            const data = await fetchUserApi(connector, userId);

            if (data && data.result === "SUCCESS") {
                const u = data.data || {};

                const phoneFormatted = u.phoneNumber
                    ? winiFormat.formatPhoneNumber(String(u.phoneNumber).replace(/\D/g, ""))
                    : "";

                const nextValues = {
                    ...DEFAULT_PROFILE_BODY,
                    id: u.id ?? userId ?? "",
                    username: u.username ?? "",
                    lastName: u.lastName ?? "",
                    firstName: u.firstName ?? "",
                    departmentId: u.departmentId ?? "",
                    departmentName: u.departmentName ?? "",
                    dutyName: u.dutyName ?? "",
                    phoneNumber: phoneFormatted,
                    email: u.email ?? "",
                };

                initialValuesRef.current = nextValues;

                setValues(nextValues);
            }
        } catch (error) {
            winiMsg.showSnackbar(winiCom.getErrorMessage(error?.response?.data?.message));
        }
    }, []);

    useEffect(() => {
        const userId = userStore.getUserId();
        if (!userId) return;

        loadUser(userId);

        return () => {};
    }, [loadUser]);

    useEffect(() => {
        if (values.departmentId || !values.departmentName || departmentOptions.length === 0) return;

        const selectedDepartment = departmentOptions.find((department) =>
            (department.departmentName || department.name) === values.departmentName
        );
        if (!selectedDepartment) return;

        setValues((prev) => ({
            ...prev,
            departmentId: prev.departmentId || selectedDepartment.id,
        }));
    }, [departmentOptions, values.departmentId, values.departmentName]);

    const handleReset = useCallback(() => {
        setValues({
            ...DEFAULT_PROFILE_BODY,
        });
    }, []);

    const handlers = useMemo(() => {
        const make = (key) => (e) => {
            const nextRaw = e?.target?.value ?? e;

            if (key === "phoneNumber") {
                const value = String(nextRaw ?? "");
                const cleaned = value.replace(/\D/g, "");
                const isSeoul = cleaned.startsWith("02");
                const maxLen = isSeoul ? 10 : 11;
                const limited = cleaned.slice(0, maxLen);

                setValues((prev) => ({
                    ...prev,
                    phoneNumber: winiFormat.formatPhoneNumber(limited),
                }));
                return;
            }

            if (key === "departmentId") {
                const selectedDepartment = departmentOptions.find((department) => department.id === nextRaw);
                setValues((prev) => ({
                    ...prev,
                    departmentId: nextRaw,
                    departmentName: selectedDepartment?.departmentName || selectedDepartment?.name || "",
                }));
                return;
            }

            setValues((prev) => ({ ...prev, [key]: nextRaw }));
        };

        return {
            lastName: make("lastName"),
            firstName: make("firstName"),
            dutyName: make("dutyName"),
            departmentId: make("departmentId"),
            phoneNumber: make("phoneNumber"),
            email: make("email"),
        };
    }, [departmentOptions]);

    const handleSubmit = useCallback(async () => {
        if (!formRef.current) {
            winiMsg.showAlert("폼 참조가 없어 저장할 수 없습니다.");
            return;
        }

        const check = winiCom.isValidCheck(formRef.current);
        if (!check) return;
        const userId = userStore.getUserId();
        const params = {
            lastName: values.lastName,
            firstName: values.firstName,
            fullName: values.lastName + values.firstName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            departmentId: values.departmentId,
            dutyName: values.dutyName,
        };
        try {
            const result = await updateUser(connector, userId, params);
            if (result.result === "SUCCESS") {
                winiMsg.showSnackbar("수정 되었습니다.");
                loadUser(userId);
            } else {
                winiMsg.showSnackbar(result.message);
            }
        } catch (error) {
            winiMsg.showSnackbar(winiCom.getErrorMessage(error.response?.data?.message));
        }
    }, [connector, loadUser, values.departmentId, values.dutyName, values.email, values.firstName, values.lastName, values.phoneNumber]);

    return {
        formRef,
        values,
        departmentOptions,
        handlers,
        handleReset,
        handleSubmit,
    };
}
