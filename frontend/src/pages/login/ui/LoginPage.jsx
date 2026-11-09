import { WiniBox, WiniGridLayout, WiniCard, WiniGridItem } from '@/shared/ui/wini';
import { LoginFormSection } from './LoginFormSection';
import { useLogin } from '@/features/auth/login';

/**
 * 로그인 페이지
 */
export const LoginPage = () => {
  // 로그인 로직
  const {
    id,
    password,
    isLoading,
    onInputsChange,
    onKeyDownPassword,
    handleLogin,
  } = useLogin();

  return (
    <>
      <WiniGridLayout container className="mainWrapper">
        <WiniGridItem size={{ xs: 12 }}>
          <WiniBox className="flex justify-center items-center flex-column">
            <WiniCard className="max-w-[330px] min-h-[400px] text-center shadow-none">
              <LoginFormSection
                id={id}
                password={password}
                isLoading={isLoading}
                onInputsChange={onInputsChange}
                onKeyDownPassword={onKeyDownPassword}
                handleLogin={handleLogin}
              />
            </WiniCard>
          </WiniBox>
        </WiniGridItem>
      </WiniGridLayout>
    </>
  );
};
