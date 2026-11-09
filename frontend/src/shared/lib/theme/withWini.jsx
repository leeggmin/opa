import { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import { resolveWiniSx } from "./resolveWiniSx";

const toSxArray = (sx) => {
  if (!sx) return [];
  return Array.isArray(sx) ? sx : [sx];
};

export function withWini(Base) {
  return forwardRef(function WithWini(props, ref) {
    const { wini, sx, ...rest } = props; // ✅ sx를 “해석”하지 않고 “그대로”만 유지

    const theme = useTheme();
    const winiSx = resolveWiniSx(theme, wini);

    // ✅ winiSx + 기존 sx를 같이 전달(기존 sx를 절대 잃지 않음)
    const mergedSx = [winiSx, ...toSxArray(sx)];

    return <Base ref={ref} {...rest} sx={mergedSx} />;
  });
}
