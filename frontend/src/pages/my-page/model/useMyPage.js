import { useUserChangeTheme } from '@/features/user/change-theme';
import { useUserSelectLanguage } from '@/features/user/select-language';
import { useUserUpdateProfile } from '@/features/user/update-profile';
import { winiCom } from '@/shared/lib';

export function useMyPage() {
    const { connector } = winiCom.getFormInfo('');

    const themeModel = useUserChangeTheme("system");
    const languageModel = useUserSelectLanguage("ko");
    const updateProfileModel = useUserUpdateProfile(connector);

    return {
        themeValue: themeModel.value,
        onThemeChange: themeModel.onChange,

        languageValue: languageModel.value,
        onLanguageChange: languageModel.onChange,

        updateProfileModel: updateProfileModel,
    };
}
