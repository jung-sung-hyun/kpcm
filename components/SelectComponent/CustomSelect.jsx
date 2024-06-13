import { Select, MenuItem, InputLabel, FormControl, FormHelperText, OutlinedInput } from '@mui/material';

/**
 * @description: 공통 Select 컴포넌트를 정의한다.
 * @function CustomSelect
 * @param {string} label - Select의 레이블을 나타낸다.
 * @param {string|Array} value - Select의 현재 값을 나타낸다. 다중 선택일 경우 배열 형태로 전달된다.
 * @param {function} onChange - Select의 값이 변경될 때 호출되는 이벤트 핸들러 함수.
 * @param {Array} options - Select에 표시할 옵션 목록을 나타낸다. 각 옵션은 객체 형태로 { value: string, label: string }을 포함한다.
 * @param {boolean} [displayEmpty=false] - true로 설정하면 빈 값이 표시될 수 있도록 한다.
 * @param {boolean} [fullWidth=false] - true로 설정하면 Select가 전체 너비를 차지한다.
 * @param {boolean} [error=false] - Select에 에러 상태를 설정한다. 에러 상태일 경우 빨간색으로 표시된다.
 * @param {string} [helperText=''] - Select 아래에 표시할 도움말 텍스트를 설정한다.
 * @param {boolean} [multiple=false] - true로 설정하면 다중 선택이 가능하다.
 * @returns {JSX.Element} - 커스텀 Select 컴포넌트를 반환한다.
 * 
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.06.12       박대철                                  최초작성
 * ========================================================================================================
 */
const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  displayEmpty = false,
  fullWidth = false,
  error = false,
  helperText = '',
  multiple = false,
}) => {
  return (
    <FormControl fullWidth={fullWidth} error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty={displayEmpty}
        label={label}
        multiple={multiple}
        input={<OutlinedInput label={label} />}
      >
        {displayEmpty && !multiple && (
          <MenuItem value="">
            <em>선택</em>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;