import { fetcher } from './api';
  
export const getCommonCode = async (info) => {
  let param = [];
  let groupedData = {};

  for (let i = 0; i < info.length; i++) {
    param.push({ 'codeCd': info[i].codeCd });
  };

  const url = 'cm9801/selectCommonCodeList';
  try {
    const data = await fetcher(url, param);
    console.log('Data fetched successfully:', data);
    groupedData = data.reduce((acc, { grpCd, codeCd, codeNm }) => {
    if (!acc[grpCd]) {
      acc[grpCd] = {};
    }
    acc[grpCd][codeCd] = codeNm;
    return acc;
    }, {});
    
  } catch (error) {
      console.error('Error fetching data:', error);
  }
  return groupedData;
};
