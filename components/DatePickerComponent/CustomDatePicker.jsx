import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('ko');

/**
 * @description: DatePicker 공통 컴포넌트를 정의한다.
 * @function CustomDatePicker
 * @param {string} label - DatePicker의 레이블을 나타낸다.
 * @param {string} defaultValue - DatePicker의 기본 날짜 값을 설정한다. (ISO 형식의 문자열로 입력)
 * @param {boolean} [controlled=false] - DatePicker가 제어형인지 여부를 설정한다. 제어형일 경우 value와 onChange로 상태를 관리한다.
 * @param {boolean} [disabled=false] - DatePicker의 비활성화 상태를 설정한다. 비활성화 상태일 경우 날짜를 선택할 수 없다.
 * @param {string} [minDate] - 선택할 수 있는 최소 날짜를 설정한다. (ISO 형식의 문자열로 입력)
 * @param {string} [maxDate] - 선택할 수 있는 최대 날짜를 설정한다. (ISO 형식의 문자열로 입력)
 * @param {function} [onChange] - 날짜가 변경될 때 호출되는 함수.
 * @returns {JSX.Element} - 커스텀 DatePicker 컴포넌트를 반환한다.
 * 
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.06.12       박대철                                  최초작성
 *   2024.06.12       박대철                                  disabled, minDate, maxDate 속성 추가
 * ========================================================================================================
 */

const CustomDatePicker = ({ label, defaultValue, controlled = false, disabled = false, minDate, maxDate, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        {controlled ? (
          <DatePicker
            label={label}
            disabled={disabled}
            minDate={dayjs(minDate)}
            maxDate={dayjs(maxDate)}
            format="YYYY.MM.DD"
          />
        ) : (
          <DatePicker
            label={label}
            defaultValue={dayjs(defaultValue)}
            disabled={disabled}
            minDate={dayjs(minDate)}
              maxDate={dayjs(maxDate)}
              format="YYYY.MM.DD"
          />
        )}
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;