import { useCallback, useState } from "react";

export function useChangeTheme(initialValue = "system") {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback((e) => {
        const next = e && e.target ? e.target.value : e;
        setValue(next);
    }, []);

    return { value, onChange };
}
