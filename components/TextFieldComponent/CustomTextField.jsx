import TextField from '@mui/material/TextField';

/**
 * @description: TextField 공통 컴포넌트를 정의한다.
 * @function CustomTextField
 * @param {string} label - TextField의 레이블을 나타낸다.
 * @param {string} value - TextField의 현재 값을 나타낸다.
 * @param {string} variant - TextField의 변형을 나타낸다. 'outlined', 'filled', 'standard' 중 하나를 선택할 수 있다.
 *                          - 'outlined': TextField가 테두리로 둘러싸여 있어, 입력 필드가 명확하게 구분된다.
 *                          - 'filled': TextField의 배경이 채워져 있어, 내용이 강조된다.
 *                          - 'standard': 기본 TextField로, 다른 스타일링 없이 간단하고 깔끔하다.
 * @param {boolean} [error=false] - TextField에 에러 상태를 설정한다. 에러 상태일 경우 빨간색으로 표시된다.
 * @param {string} [helperText=''] - TextField 아래에 표시할 도움말 텍스트를 설정한다.
 * @param {function} onChange - TextField의 값이 변경될 때 호출되는 이벤트 핸들러 함수.
 * @returns {JSX.Element} - 커스텀 TextField 컴포넌트를 반환한다.
 * 
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.06.12       박대철                                  최초작성
 * ========================================================================================================
 */

const CustomTextField = ({ label, value, variant, error = false, helperText = '', onChange }) => (
  <TextField
    label={label}
    value={value}
    variant={variant}
    error={error}
    helperText={helperText}
    onChange={onChange}
    fullWidth
  />
);

export default CustomTextField;