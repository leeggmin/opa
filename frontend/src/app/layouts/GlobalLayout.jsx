import { useSignals } from '@preact/signals-react/runtime';
import { MessageBox } from '@/shared/ui/blocks/message-box';
import { ComHelpForm } from '@/shared/ui/blocks/help-dialog';
import { ComSnackbar } from '@/shared/ui/blocks/snackbar';
import { _comSnackbarList, _helpformList, _msgList } from '@/shared/model';

export function GlobalLayout({ children }) {
  useSignals();

  return (
    <>
      <div style={{ width: '100%', height: '100vh' }}>{children}</div>

      {/* 전역 메시지박스 */}
      <div>
        {_msgList.value.map((item) => (
          <MessageBox
            open={item.value.open}
            item={item.value}
            key={item.value.key}
          />
        ))}
      </div>

      {/* 전역 헬프폼 */}
      <div>
        {_helpformList.value.map((item) => (
          <ComHelpForm
            open={item.value.open}
            key={item.value.key}
            item={item.value}
          />
        ))}
      </div>

      {/* 전역 토스트/스낵바 */}
      <div>
        {_comSnackbarList.value.map((item) => (
          <ComSnackbar
            open={item.value.open}
            key={item.value.key}
            item={item.value}
          />
        ))}
      </div>
    </>
  );
}
