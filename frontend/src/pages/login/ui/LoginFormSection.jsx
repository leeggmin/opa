import {
  WiniBox,
  WiniButton,
  WiniText,
  WiniTypography,
  WiniInputLabel,
} from '@/shared/ui/wini';

/**
 * 로그인 폼 섹션
 */
export const LoginFormSection = ({
  id,
  password,
  isLoading,
  onInputsChange,
  onKeyDownPassword,
  handleLogin,
}) => {
  return (
    <WiniBox
      component="form"
      // sx={{
      //   '& .MuiText-root': { m: 1, width: '25ch' },
      // }}
      noValidate
      autoComplete="off"
    >
      <WiniBox className="my-[30%]">
        <WiniTypography fontWeight={'bold'}>
          위니텍 React 표준
        </WiniTypography>
      </WiniBox>

      <WiniBox>
        <WiniInputLabel
          htmlFor="idid"
          className="block text-left text-[20px] font-bold text-[#010066]"
        >
          ID
        </WiniInputLabel>
        <WiniText
          autoFocus={true}
          className="min-w-[310px]"
          name="id"
          onChange={onInputsChange}
          value={id}
          disabled={isLoading}
        />
      </WiniBox>

      <WiniBox>
        <WiniInputLabel
          htmlFor="passid"
          className="block text-left text-[20px] font-bold text-[#010066]"
        >
          PASSWORD
        </WiniInputLabel>
        <WiniText
          id={'passid'}
          type={'password'}
          className="min-w-[310px]"
          name="password"
          onChange={onInputsChange}
          value={password}
          onKeyDown={onKeyDownPassword}
          disabled={isLoading}
        />
      </WiniBox>

      <WiniButton
        className='w-full mt-15'
        onClick={() => handleLogin()}
        disabled={isLoading}
      >
        {isLoading ? 'LOADING...' : 'LOGIN'}
      </WiniButton>
    </WiniBox>
  );
};
