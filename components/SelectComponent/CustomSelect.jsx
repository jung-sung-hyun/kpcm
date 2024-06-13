import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CustomSelect({ label, options, selectedOptions, setSelectedOptions, width = 300 }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl sx={{ m: 1, width }}>
      <InputLabel id="custom-multiple-checkbox-label">{label}</InputLabel>
      <Select
        labelId="custom-multiple-checkbox-label"
        id="custom-multiple-checkbox"
        multiple
        value={selectedOptions}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedOptions.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}