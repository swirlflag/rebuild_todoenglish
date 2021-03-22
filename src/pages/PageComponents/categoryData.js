const data = [
    {
        name : '버튼/기본',
        title : '기본형 버튼',
        text : '기본형 버튼으로 확인, 취소와 같은 일반적인 시스템 버튼에 사용됩니다. 버튼으로 컨트롤 하려는 내용의 정보를 전부 소모한 뒤 확인할 수 있는 위치에 있어야 합니다.',
        info : {
            '기본 너비(PC)'                 : '120px',
            '기본 너비(MO)'                 : '100%',
            '패딩(PC)'                      : '상 : 18px / 하 : 16px / 좌우 : 30px',
            '패딩(MO)'                      : '상 : 18px / 하 : 16px / 좌우 : 30px',
            '외곽 라운드(PC)'               : '25px',
            '외곽 라운드(MO)'               : '12px',
            '폰트 사이즈(PC)'               : '22px',
            '폰트 사이즈(MO)'               : '14px',
            '두께감'                        : '5px',
            '[mouse over] 박스 그림자'      : 'y:17.1px(두께감+변형Y) / 블러:5px / 색상:#000 / 투명도:10%',
            '[mouse over] 텍스트 그림자'    : 'y:2px / 블러:3px / 색상:#000 / 투명도:15%',
            '[mouse over] 위치 변형 Y'      : '10px',
            '[mouse down] 위치 변형 Y'      : '전체:7.1px (위치 변형Y/1.4) / 내부:5px(두께감)',
        },
        control : {
            text : '확인',
            theme : '',
        }
    },

    {
        name : '버튼/다운로드',
        title : '스토어 다운로드 버튼',
        text : '앱스토어와 플레이 스토어 다운로드 버튼으로 [버튼/기본] 에서 파생되었습니다. 타입에 맞는 아이콘과 컨텐츠에 맞는 폰트 svg를 기본 내장합니다. 모바일 타입의 경우 IOS,Android 판별에 따라 이동합니다.',
        info : {
            '파생'                              : '버튼/기본',
            '링크: 앱스토어 '                   : 'TBD',
            '링크: 플레이 스토어 '              : 'TBD',
            '기본 너비(PC)'                     : '220px',
        },
        control : {
            type : 'apple',
            theme : 'navy',
        }
    },

    {
        name : '텍스트/제목',
        title : '프로젝트의 제목용 텍스트',
        text : '-',
        info : {
        },
        control : {

        }
    },

    {
        name : '입력/선택 드롭다운',
        title : '선택 드롭다운 입력창',
        text : '선택 드롭다운 입력창에 대한 설명',
        info : {
            '사용' : 'TBD',
        },
        control : {
            testvalue : '',
            change : (modelData) => {
                {modelData}
                // console.log('$emit change : ' , modelData);
            },
        }
    },


];



export default data;