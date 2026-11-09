import { TypographyTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type WiniUiInput = string | string[];

type WiniTypographyTypeMap = {
  props: TypographyTypeMap['props'] & {
    ui?: WiniUiInput;
  };
  defaultComponent: TypographyTypeMap['defaultComponent'];
};

declare const WiniTypography: OverridableComponent<WiniTypographyTypeMap>;

export default WiniTypography;
