import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

/**
 * @description: RadioGroup 공통 컴포넌트를 정의한다.
 * @function CustomRadioGroup
 * @param {string} label - RadioGroup의 레이블을 나타낸다.
 * @param {Array} options - 선택 가능한 라디오 버튼 옵션 배열. 각 옵션은 value, label, disabled 속성을 가질 수 있다.
 * @param {boolean} [row=true] - 라디오 버튼을 가로로 배치할지 여부를 설정한다.
 * @param {string} name - 라디오 버튼 그룹의 이름을 설정한다.
 * @param {string} [size='medium'] - 라디오 버튼의 크기를 설정한다. 'small' 또는 'medium' 중 하나를 선택할 수 있다.
 * @param {boolean} [disabled=false] - 라디오 버튼 그룹의 비활성화 상태를 설정한다. 비활성화 상태일 경우 모든 라디오 버튼이 클릭할 수 없다.
 * @returns {JSX.Element} - 커스텀 RadioGroup 컴포넌트를 반환한다.
 * 
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.06.12       박대철                                  최초작성
 *   2024.06.12       박대철                                  size 및 disabled 속성 추가
 * ========================================================================================================
 */

const CustomRadioGroup = ({ label, options, row = true, name, size = 'medium', disabled = false }) => {
  return (
    <FormControl component="fieldset" disabled={disabled}>
      <FormLabel component="legend" id={`${name}-radio-buttons-group-label`}>{label}</FormLabel>
      <RadioGroup
        row={row}
        aria-labelledby={`${name}-radio-buttons-group-label`}
        name={name}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio size={size} />}
            label={option.label}
            disabled={option.disabled || disabled}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;


/*
 사용예시
 const App = () => {
  const radioOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', disabled: true },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <Container>
      <Box mt={4}>
        <CustomRadioGroup
          label="Radio Group Example"
          options={radioOptions}
          name="exampleRadioGroup"
          size="small" // 동적으로 설정된 size 속성
          disabled={false} // 동적으로 설정된 disabled 속성
        />
      </Box>
    </Container>
  );
};
*/