import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

/**
 * @description: Alert 공통 컴포넌트를 정의한다.
 * @function CustomAlert
 * @param {string} variant - Alert의 변형을 나타낸다. 'standard', 'filled', 'outlined' 중 하나를 선택할 수 있다.
 * @param {string} severity - Alert의 심각도를 나타낸다. 'error', 'warning', 'info', 'success' 중 하나를 선택할 수 있다.
 * @param {string} message - Alert에 표시될 메시지.
 * @returns {JSX.Element} - 커스텀 Alert 컴포넌트를 반환한다.
 * 
 * ========================================================================================================
 *                                    수정 이력관리 (형상관리에도 Copy 반영)
 * --------------------------------------------------------------------------------------------------------
 *      수정일        수정자                                  수정내용
 * --------------------------------------------------------------------------------------------------------
 *   2024.06.16       홍길동                                  최초작성
 * ========================================================================================================
 */

const CustomAlert = ({ variant = 'standard', severity = 'info', message }) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant={variant} severity={severity}>
        {message}
      </Alert>
    </Stack>
  );
};

export default CustomAlert;