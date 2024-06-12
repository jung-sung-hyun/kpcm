import Button from '@mui/material/Button';

/**
 * @description: Button 공통 컴포넌트를 정의한다.
 * @function CustomButton
 * @param {string} variant - Button의 변형을 나타낸다. 'text', 'outlined', 'contained' 중 하나를 선택할 수 있다.
 *                           - 'text': 기본 버튼으로, 배경이 없는 버튼.
 *                           - 'outlined': 테두리가 있는 버튼.
 *                           - 'contained': 배경이 채워진 버튼.
 * @param {string} color - Button의 색상을 나타낸다. 'default', 'inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning' 중 하나를 선택할 수 있다.
 * @param {boolean} [disabled=false] - Button의 비활성화 상태를 설정한다. 비활성화 상태일 경우 클릭할 수 없다.
 * @param {string} [size='medium'] - Button의 크기를 설정한다. 'small', 'medium', 'large' 중 하나를 선택할 수 있다.
 * @param {boolean} [fullWidth=false] - Button이 부모의 가로폭을 모두 차지하도록 설정한다.
 * @param {function} onClick - Button이 클릭될 때 호출되는 이벤트 핸들러 함수.
 * @param {ReactNode} children - Button의 자식 요소로, 버튼의 레이블이나 아이콘을 포함할 수 있다.
 * @returns {JSX.Element} - 커스텀 Button 컴포넌트를 반환한다.
 * 
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.06.12       박대철                                  최초작성
 *   2024.06.12       박대철                                  disabled, size, fullWidth 속성 추가
 * ========================================================================================================
 */

const CustomButton = ({ variant, color, disabled = false, size = 'medium', fullWidth = false, onClick, children }) => {
  return (
    <Button
      variant={variant}
      color={color}
      disabled={disabled}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;