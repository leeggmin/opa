import { UserProfileForm } from '@/entities/user';
import { WiniFormNormal } from '@/shared/ui/blocks/form-layout';
import { useMyPage } from '../model/useMyPage';

export function MyPage() {
  const { updateProfileModel } = useMyPage();
  const { formRef, values, departmentOptions, handlers, handleSubmit, handleReset } = updateProfileModel;

  const handleProfileChange = (event) => {
    const fieldName = event?.target?.name;
    if (!fieldName) return;

    handlers[fieldName]?.(event);
  };

  return (
    <WiniFormNormal>
      <UserProfileForm
        ref={formRef}
        title="정보 수정"
        values={values}
        departmentOptions={departmentOptions}
        onChange={handleProfileChange}
        onUpdate={handleSubmit}
        showActionButtons={true}
      />
    </WiniFormNormal>
  );
}
