import { useState } from 'react';
import { WiniGridLayout, WiniBox, WiniBreadcrumbs, WiniCard, WiniDivider, WiniSnackbar, WiniTypography, WiniFormControl, WiniDateTimePicker, WiniMenuItem, WiniListSubheader, WiniGridItem } from '@/shared/ui/wini';

import { AddIcon, NavigateNextIcon } from '@/shared/lib';
import { winiDate } from '@/shared/lib';

export default function GuideDatePicker() {
  const [date, setDate] = useState(winiDate.now());
  const [date2, setDate2] = useState(winiDate.now());
  const [date3, setDate3] = useState(winiDate.now());
  const [date4, setDate4] = useState(winiDate.now());
  const [time, setTime] = useState(winiDate.now());

  return (
    <WiniBox ui="form">

      <WiniBox>
        <WiniTypography variant="h2">datepicker 상단 label 구성</WiniTypography>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              sx={{}}
              format="YYYY-MM-DD"
              label="default"
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              readOnly
              sx={{}}
              format="YYYY-MM-DD"
              label="readOnly"
              value={date3}
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              disabled
              sx={{}}
              format="YYYY-MM-DD"
              label="disabled"
              value={date3}
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>

      <WiniBox>
        <WiniTypography variant="h2">시간 표시 (날짜+시간 / 시간만)</WiniTypography>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              sx={{}}
              label="date + time (HH:mm)"
              format="YYYY-MM-DD HH:mm"
              ampm={false}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              ui="time"
              sx={{}}
              label="time only"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
            />
          </WiniGridItem>
        </WiniGridLayout>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              sx={{}}
              format="YYYY-MM-DD"
              label="medium"
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
              size="medium"
            />
          </WiniGridItem>
        </WiniGridLayout>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              sx={{}}
              format="YYYY-MM-DD"
              label="standard"
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
              variant="standard"
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              sx={{}}
              format="YYYY-MM-DD"
              label="filled"
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
              variant="filled"
            />
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>

      <WiniBox>
        <WiniTypography variant="h2">datepicker 좌측 label 구성</WiniTypography>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              ui="row"
              sx={{}}
              format="YYYY-MM-DD"
              label="default"
              onChange={(value) => {
                setDate2(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              readOnly
              ui="row"
              sx={{}}
              value={date3}
              format="YYYY-MM-DD"
              label="readOnly"
              onChange={(value) => {
                setDate2(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              disabled
              ui="row"
              sx={{}}
              value={date3}
              format="YYYY-MM-DD"
              label="disabled"
              onChange={(value) => {
                setDate2(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
        </WiniGridLayout>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              ui="row"
              sx={{}}
              format="YYYY-MM-DD"
              label="medium"
              onChange={(value) => {
                setDate2(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
              size="medium"
            />
          </WiniGridItem>
        </WiniGridLayout>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              ui="row"
              sx={{}}
              format="YYYY-MM-DD"
              label="standard"
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
              variant="standard"
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              ui="row"
              sx={{}}
              format="YYYY-MM-DD"
              label="filled"
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
              variant="filled"
            />
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>

      <WiniBox>
        <WiniTypography variant="h2">datepicker 내부 label 구성</WiniTypography>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              sx={{}}
              format="YYYY-MM-DD"
              label="default"
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              readOnly
              sx={{}}
              format="YYYY-MM-DD"
              label="readOnly"
              value={date3}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              disabled
              sx={{}}
              format="YYYY-MM-DD"
              label="disabled"
              value={date3}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
        </WiniGridLayout>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              sx={{}}
              format="YYYY-MM-DD"
              label="medium"
              slotProps={{}}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
              size="medium"
            />
          </WiniGridItem>
        </WiniGridLayout>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              sx={{}}
              format="YYYY-MM-DD"
              label="standard"
              slotProps={{}}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
              variant="standard"
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              sx={{}}
              format="YYYY-MM-DD"
              label="filled"
              slotProps={{}}
              onChange={(value) => {
                setDate(value);
              }}
              className=""
              labelClassName=""
              inputClassName=""
              variant="filled"
            />
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>

      <WiniBox>
        <WiniTypography variant="h2">datepicker 상단(2) label 구성</WiniTypography>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              ui="column"
              sx={{}}
              format="YYYY-MM-DD"
              label="default"
              onChange={(value) => {
                setDate4(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              readOnly
              ui="column"
              sx={{}}
              value={date3}
              format="YYYY-MM-DD"
              label="readOnly"
              onChange={(value) => {
                setDate2(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              disabled
              ui="column"
              sx={{}}
              value={date3}
              format="YYYY-MM-DD"
              label="disabled"
              onChange={(value) => {
                setDate2(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
            />
          </WiniGridItem>
        </WiniGridLayout>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              ui="column"
              sx={{}}
              format="YYYY-MM-DD"
              label="medium"
              onChange={(value) => {
                setDate2(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
              size="medium"
            />
          </WiniGridItem>
        </WiniGridLayout>
        <WiniGridLayout container columnSpacing={2} rowSpacing={3}>
          <WiniGridItem>
            <WiniDateTimePicker
              ui="column"
              sx={{}}
              format="YYYY-MM-DD"
              label="standard"
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
              variant="standard"
            />
          </WiniGridItem>
          <WiniGridItem>
            <WiniDateTimePicker
              ui="column"
              sx={{}}
              format="YYYY-MM-DD"
              label="filled"
              slotProps={{
                textField: {
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              onChange={(value) => {
                setDate(value);
              }}
              className="w-full"
              labelClassName=""
              inputClassName=""
              variant="filled"
            />
          </WiniGridItem>
        </WiniGridLayout>
      </WiniBox>
      
    </WiniBox>
  );
}
