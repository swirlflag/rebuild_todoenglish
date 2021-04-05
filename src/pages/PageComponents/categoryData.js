import { randomOne } from '@/utils';

const makeArrayLength = (length) => [...new Array(length).keys()];

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
        title : '선택도구 드롭다운 타입 (단일선택)',
        text : '드롭다운 타입 선택도구에 대한 설명 -',
        props : {
            '[필수] slot' : '<option value="option value"> option text </option>',
            'name' : '(String)',
            'placeholder' : '(String)',
            'v-model' : '(String ,Number)',
        },
        info : {
            'TBD prop' : 'TBD value',
        },
        control : {
            change : (v) => {{v}
                console.component('↓ 선택 드롭다운 : @change');
                console.log({...v});
            },
        }
    },
    {
        name : '입력/선택 라디오',
        title : '선택도구 라디오 타입 (다중택일)',
        text : '라디오 버튼은 최소 2개 이상의 다중 선택지 중에서 하나의 선택을 지원합니다. 1개 이상으로 선택하거나 미선택 옵션은 지원하지 않으며 미선택의 선택지를 구현시엔 "선택하지 않음" 과 같은 항목의 추가로 이루어져야 합니다.',
        props : {
            '[필수] name' : '(String)',
            '[필수] value' : '(String,Number)',
            '@change' : '(Function)',
            'v-model' : '(String,Number)',
            'checked' : '(Boolean)',
            'index' : '(Number)',
        },
        info : {
            'TBD prop' : 'TBD value',
        },
        control : {
            value : randomOne('yes', 'no' , 'unmatch',),
            change : (v) => {{v}
                console.component('↓ 선택 라디오 : @change');
                console.log(v);
            },
        }
    },
    {
        name : '입력/선택 라디오 컬렉션',
        title : '선택도구 라디오 타입 컬렉션 (다중택일)',
        text : '라디오 컬렉션은 [선택 라디오]의 묶음으로 이루어진 확장 컴포넌트이며 자체적으로 나열 규칙을 가집니다. 기능은 [선택 라디오]와 동일하며 동시에 라디오 선택 묶음을 컨트롤 하거나 change의 반환으로 묶음에 대한 전체 정보를 얻을 수 있습니다.',
        props : {
            '[필수] list ' : '[ { text : (String,Number), value : (String,Number) } ]',
            'name' : '(String)',
            'v-model' : '(String,Number)',
            '@change' : '(Function)',
            'direction' : "'row' , 'col' , 'vertical' , 'horizontal'" ,
        },
        info : {
            '개요' : '[선택 라디오]를 확장해 제작하였습니다.',
            'TBD prop' : 'TBD value',
        },
        control : {
            list : makeArrayLength(10).map((c,i) =>  ({text : `라디오 ${i+1}` , value : `select_value_${i+1}`})),
            direction : randomOne('row' , 'col'),
            directionChange : (controls) => {
                controls.direction = controls.direction === 'row' ? 'col' : 'row';
            },
            change : (v) => {{v}
                console.component('↓ 선택 라디오 컬렉션 : @change');
                console.log({...v});
            }
        }
    },
    {
        name : '입력/선택 체크박스',
        title : '선택도구 체크박스 타입 (다중선택)',
        text : '체크박스 설명 - ',
        props : {

        },
        info : {
            'TBD prop' : 'TBD value',
        },
        control : {
            checks : [false,false,false],
            change : (v) => { {v}
                console.component('↓ 선택 체크박스 : @change');
                console.log(v);
            }
        }
    },
    {
        name : '입력/선택 체크박스 컬렉션',
        title : '선택도구 체크박스 타입 컬렉션 (다중선택)',
        text : '체크박스 설명 - ',
        props : {

        },
        info : {
            'TBD prop' : 'TBD value',
            '개요' : '[선택 체크박스]를 확장해 제작하였습니다.',
        },
        control : {
            checks : [false,false,false],
            list : makeArrayLength(5).map((c,i) =>  ({text : `체크박스 ${i+1}` , value : `checkbox_value_${i+1}`, checked : randomOne(true,false)})),
            direction : randomOne('row' , 'col'),
            directionChange : (controls) => {
                controls.direction = controls.direction === 'row' ? 'col' : 'row';
            },
            change : (v) => { {v}
                console.component('↓ 선택 체크박스 컬렉션 : @change');
                console.log({...v});
            }
        }
    },

    {
        name : '입력/입력 텍스트',
        title : '입력 텍스트 ',
        text : '입력 테스트에 대한 설명 ',
        // props : {

        // },
        info : {
            'TBD prop' : 'TBD value',
            // '개요' : '[선택 체크박스]를 확장해 제작하였습니다.',
        },
        control : {
            value: `random_start_${Math.ceil(Math.random()*100)}`,
            change : (v) => { {v}
                console.component('↓ 입력 텍스트 : @change');
                console.log({...v});
            }
        }
    },

    {
        name : '입력/입력 이메일',
        title : '입력 이메일 ',
        text : '입력 이메일에 대한 설명 ',
        // props : {

        // },
        info : {
            'TBD prop' : 'TBD value',
            // '개요' : '[선택 체크박스]를 확장해 제작하였습니다.',
        },
        control : {
            value: `mail@naver.com`,
            change : (v) => { {v}
                console.component('↓ 입력 이메일 : @change');
                console.log({...v});
            }
        }
    },

];


data.map(c => {
    c.info && (c.info = {});
    c.props && (c.props = {});
})

export default data;