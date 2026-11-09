import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';
import { authAdapter } from '@/shared/adapters';
import loginData from '@/shared/adapters/data/login.json';
import { winiMsg } from '@/shared/model';

/**
 * 로그인 로직을 처리하는 커스텀 훅
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    id: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { id, password } = inputs;

  /**
   * 로그인 실행
   */
  const handleLogin = async (organizationId = null) => {
    setIsLoading(true);

    try {
      const data = authAdapter.toLoginResult(
        await login(id, password, organizationId),
        // loginData,
      );
      const authState = authAdapter.toAuthState(data);

      if (authState.isAuthenticated) {
        const userData = data.data;
        const org = userData.userOrganizationList[0];

        // Communicator가 생성될 때 헤더에 필요한 값들을 미리 저장
        if (authState.authMode === 'jwt' && authState.accessToken) {
          localStorage.setItem('jwtsessiontoken', authState.accessToken);
        } else {
          localStorage.removeItem('jwtsessiontoken');
        }
        localStorage.setItem('OrgId', org.organizationId);
        localStorage.setItem('UserId', userData.userId);
        localStorage.setItem('UserName', userData.fullName);
        localStorage.setItem('GroupId', org.userGroupId);

        navigate('/', {
          state: {
            orgId: userData.userOrganizationList[0].organizationId,
            autId: userData.userOrganizationList[0].userGroupId,
            username: userData.fullName,
            name: userData.fullName,
            userId: userData.userId,
          },
        });
      }else{
        console.log('jwt토큰이 아닌경우, 로그인사용자를 조회하여 동일하게 세팅 필요.');
        //jwt토큰이 아닌경우 사용자 정보를 조회해서 
        //동일하게 세팅 필요.
        //로컬스토리지 UserId 필수 세팅 없으면 페이지 이동 못함
        localStorage.setItem('UserId',"0194cf9a-86b4-7ff6-819a-02557f94ee3f");
        localStorage.setItem('UserName', "관리자");
        navigate('/', {
          state: {
            orgId: null,
            autId: null,
            username: null,
            name: '관리자',
            userId: "0194cf9a-86b4-7ff6-819a-02557f94ee3f",
          },
        });
      }

    } catch (error) {
      if (
        error.response?.data?.errorCodeName === 'COMMON_RESTAPI_ENC_REQUIRED' &&
        error.response?.data?.shouldRetry
      ) {
        await handleLogin(organizationId);
      } else if (error.response) {
        winiMsg.showAlert(error.response.data.message);
      } else {
        winiMsg.showAlert('아이디와 비밀번호를 확인해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 입력값 변경 핸들러
   */
  const onInputsChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  /**
   * 입력값 초기화
   */
  const onInputsReset = () => {
    setInputs({
      id: '',
      password: '',
    });
  };

  /**
   * Enter 키 입력 핸들러
   */
  const onKeyDownPassword = (e) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  return {
    id,
    password,
    isLoading,
    onInputsChange,
    onInputsReset,
    onKeyDownPassword,
    handleLogin,
  };
};
