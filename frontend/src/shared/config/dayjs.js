import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Locale imports
import 'dayjs/locale/de';
import 'dayjs/locale/uk';
import 'dayjs/locale/fr';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import 'dayjs/locale/ms-my';

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

// Set default timezone
dayjs.tz.setDefault('Asia/seoul');

// Set default locale
dayjs.locale('en');

export { dayjs };

