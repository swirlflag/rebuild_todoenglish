import { randomOne } from '@/utils';
import { VM } from '@/main.js';

{randomOne,VM}

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
        name : '버튼/일반 링크',
        title : '일반적인 링크 버튼',
        text : '-',
        control : {
            theme: 'pink',
            text : 'Global Learning Xprize',
            to : '/curriculum',
            href : 'https://www.xprize.org/prizes/global-learning',
            switchLink : false,
            underline : true,
        }
    },


    {
        name : '텍스트/범주',
        title : 'Display',
        text : '-',
    },
    {
        name : '텍스트/리스트',
        title : 'Display 02',
        text : '-',

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
            onChange : (v) => {{v}
                console.component('↓ 선택 드롭다운 : @change');
                console.log({...v});
            },
        }
    },

    {
        name : '입력/토글 스위치',
        title : 'on/off 형태의 토글 스위치 버튼',
        text : '토글 스위치 버튼은 on/off값을 변경하며 조작시 바로 기능에 영향을 끼칩니다.',
        control : {
            value : false,
            onChange: (v) => { {v}
                console.component('↓ 토글 스위치 : @change');
                console.log({...v});
            }
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
            onChange : (v) => {{v}
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
            onChange : (v) => {{v}
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
            onChange : (v) => { {v}
                console.component('↓ 선택 체크박스 : @change');
                console.log({...v});
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
            list : makeArrayLength(5).map((c,i) =>  ({text : `체크박스 ${i+1}` , value : `checkbox_value_${i+1}`, checked : randomOne(true,false) , required : randomOne(true, false)})),
            direction : randomOne('row' , 'col'),
            directiononChange : (controls) => {
                controls.direction = controls.direction === 'row' ? 'col' : 'row';
            },
            onChange : (v) => { {v}
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
        },
        control : {
            value: `random_text_${Math.ceil(Math.random()*100)}`,
            mark : false,
            focus : false,
            onChange : (v) => { {v}
                console.component('↓ 입력 텍스트 : @change');
                console.log({...v});
            },
            onFocus : () => {
                console.component('입력 텍스트 : @focus');
            },
            onBlur : () => {
                console.component('입력 텍스트 : @blur');
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
        },
        control : {
            value: `default@naver.com`,
            valid : true,
            mark : false,
            focus : false,
            onChange : (v) => { {v}
                console.component('↓ 입력 이메일 : @change');
                console.log({...v});
            },
            onFocus : () => {
                console.component('입력 이메일 : @focus');
            },
            onBlur : () => {
                console.component('입력 이메일 : @blur');
            }
        }
    },

// InputTextPassword
    {
        name : '입력/입력 비밀번호',
        title : '입력 비밀번호 ',
        text : '입력 비밀번호에 대한 설명 ',
        // props : {

        // },
        info : {
            'TBD prop' : 'TBD value',
        },
        control : {
            value: `default_password`,
            valid : true,
            error : 0,
            mark : false,
            focus : false,
            onChange : (v) => { {v}
                console.component('↓ 입력 비밀번호 : @change');
                console.log({...v});
            },
            onFocus : () => {
                console.component('입력 비밀번호 : @focus');
            },
            onBlur : () => {
                console.component('입력 비밀번호 : @blur');
            }
        }
    },

    {
        name : '스피너/-',
        title : 'title ',
        text : 'text ',
        control : {

        }
    },

    {
        name : '디스플레이/sticky stack',
        title : 'title ',
        text : 'text ',
        control : {

        }
    },

    {
        name : '프레임/레이어 컨텐츠',
        title : '레이어 컨텐츠 제목',
        text : '레이어 컨텐츠 텍스트',
        control : {
            isShow : false,
            isShowList : false,
            hash : 'kakao',
            useHash : false,
            mobileTitle : '카카오 이벤트?',
        }
    },

    {
        name : '프레임/바텀 시트',
        title : '바텀 시트 제목',
        text : '바텀 시트 텍스트',
        control : {
            isShow : false,
            title : '타이틀을 선택해 주세요',
            sampleType : 'list',

            selectItem : '',
            selectIndex : randomOne(1,2,3,4,5),
        }
    },


    {
        name : '모달/(구)Alert',
        title : 'Alert title',
        text : '다이얼로그로 통합 예정.',
        control : {
            payload : {
                title : 'TITLE' ,
                message : 'MESSAGE' ,
                buttonText : 'OK',
            },
            call(payload) {
                if(!payload){return}
                const { title , message, buttonText } = payload;
                VM.$store.dispatch('openModalAlert' , {
                    title,
                    message ,
                    buttonText,
                    actionClose : () => {
                        console.component('모달 Alert : actionClose');
                    }
                })
            }
        }
    },
    {
        name : '모달/(구)Confirm',
        title : 'Confirm title',
        text : '다이얼로그로 통합 예정.',
        control : {
            payload : {
                title : 'TITLE' ,
                message : 'MESSAGE' ,
                buttonTrueText : 'OK',
                buttonFalseText : 'CANCEL',
                type: 'alert',
            },
            call(payload) {
                if(!payload){return}
                const { title , message, buttonTrueText , buttonFalseText } = payload;
                VM.$store.dispatch('openModalConfirm' , {
                    title,
                    message ,
                    buttonTrueText,
                    buttonFalseText,
                    actionClose : () => {console.component('모달 Confirm : actionClose');},
                    actionTrue : () => {console.component('모달 Confirm : actionTrue');},
                    actionFalse : () => {console.component('모달 Confirm : actionFalse');},
                })
            }
        }
    },

    {
        name : '모달/다이얼로그',
        title : '다이얼로그 title',
        text    : '다이얼로그 text',
        control : {
            payload : {
                title : '알림' ,
                message : '다이얼로그 메세지 내용입니다.' ,
                buttonCancelText : '취소',
                buttonConfirmText : '확인',
                type: 'alert',
                promptValue : 'pre prompt value',
                promptPlaceholder : 'prompt placeholder',
                actionResult : (result) =>  {
                    console.component('모달 다이얼로그 : actionResult');
                    console.log('result : ' ,  result);
                },
            },
            call(payload) { {payload}
                VM.$store.dispatch('openDialog' , payload);
            }
        },
    },

    {
        name : '모달/인증',
        title : '인증 title',
        text : '인증 text',

        control : {
            call() {
                VM.$store.dispatch('openAuthPanel');
            },
        },

    },

];


data.map(c => {
    c.info && (c.info = {});
    c.props && (c.props = {});
});

export default data;