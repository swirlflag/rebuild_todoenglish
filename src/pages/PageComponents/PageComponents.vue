<!--
RADIO
    <label class="radio-label">
        <input type="radio" name="버튼/일반 링크/색테마" value="" v-model="controls.theme"><span>default or auto</span>
    </label>

TEXT INPUT
    <input type="text" v-model="controls.text" value="">

CHECKBOX
    <label class="checkbox-label">
        <input type="checkbox" v-model="controls.value">
        <span>SYNC</span>
    </label>
-->
<template>
    <div>
        <div id="comp">

            <div id="mylog">

            </div>
            <div id="comp-wrap">
                <!-- <div id="comp-not-mobile">
                    모바일에선 안보여줄거임
                </div> -->
                <div    id="comp-tab"
                        :class="{'st-opentab' : isTabOpen}"
                >

                    <div    class="comp-tab__toggle"
                            @click="onClickControlTab"
                    >
                        menu
                    </div>

                    <div class="comp-tab__dimmed" @click="onClickControlTab(false)"></div>

                    <div class="comp-tab__wrap">
                        <template v-for="([category,items],idx) in Object.entries(categoryOrder)">
                            <div  class="tab__category" :key="idx">
                                <div class="tab__category-name" @click="onClickCategoryName">
                                    {{category}}
                                </div>
                                <div class="tab__list">
                                    <template v-for="(item, idx) in items">
                                        <div :key="idx" class="tab__item" :data-id="item" @click="onClickItem(item)">
                                            {{item.split('/')[1]}}
                                        </div>
                                    </template>
                                </div>

                            </div>
                        </template>
                    </div>
                </div>

                <div id="comp-content">

                    <div id="comp-content-wrap">







                    <!-- 버튼/기본 -->
                        <div v-if="renderId === '버튼/기본'" class="comp-component" >
                            <div class="comp-view">
                                <ButtonDefault
                                    :theme="controls.theme"
                                >
                                    {{controls.text}}
                                </ButtonDefault>
                            </div>
                            <div class="comp-control">
                                <div>
                                    버튼에 들어갈 텍스트 : <input type="text" v-model="controls.text" value="">
                                </div>
                                <div>
                                    버튼 색상 테마 :
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="" v-model="controls.theme"><span>default</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="navy" v-model="controls.theme"><span>navy</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="pink" v-model="controls.theme"><span>pink</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="green" v-model="controls.theme"><span>green</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    <!-- 버튼/기본 -->













                    <!-- 버튼/다운로드 -->
                        <div v-if="renderId === '버튼/다운로드'" class="comp-component" >
                            <div class="comp-view">
                                <ButtonDownload :type="controls.type" :theme="controls.theme"/>
                            </div>
                            <div class="comp-control">
                                <div>
                                    다운로드 버튼 타입 :
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/타입" value="apple" v-model="controls.type"><span>apple</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/타입" value="google" v-model="controls.type"><span>google</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/타입" value="mobile" v-model="controls.type"><span>mobile</span>
                                    </label>
                                </div>
                                <div>
                                    버튼 색상 테마 :
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/색테마" value="" v-model="controls.theme"><span>default</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/색테마" value="navy" v-model="controls.theme"><span>navy</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    <!-- 버튼/다운로드 -->









                    <!-- 버튼/일반 링크 -->
                        <div v-if="renderId === '버튼/일반 링크'" class="comp-component" >
                            <div class="comp-view">
                                <div>
                                    Lorem ipsum dolor sit amet,
                                    <ButtonUndermask    :underline="controls.underline"
                                                        :theme="controls.theme"
                                                        :to="controls.switchLink ? controls.to : null"
                                                        :href="controls.switchLink ? null : controls.href"

                                    >
                                        {{ controls.text }}
                                    </ButtonUndermask>
                                    dignissim eu tincidunt eget, efficitur eu urna.
                                </div>

                            </div>
                            <div class="comp-control">
                                <div>
                                    예시로 들어갈 텍스트 : <input type="text" v-model="controls.text" value="">
                                </div>
                                <div>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/일반 링크/색테마" value="" v-model="controls.theme"><span>default or auto</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/일반 링크/색테마" value="navy" v-model="controls.theme"><span>navy</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/일반 링크/색테마" value="pink" v-model="controls.theme"><span>pink</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/일반 링크/색테마" value="mint" v-model="controls.theme"><span>mint</span>
                                    </label>
                                </div>
                                <div>
                                    밑줄 사용 : <button class="default-button" @click="controls.underline = !controls.underline">{{controls.underline}}</button>
                                </div>
                                <div v-if="controls.switchLink">
                                    이동 라우터 : <input type="text" v-model="controls.to" value="">
                                    <button class="default-button" @click="controls.switchLink = !controls.switchLink">링크</button>
                                </div>
                                <div v-else>
                                    이동 링크 : <input type="text" v-model="controls.href" value="">
                                    <button class="default-button" @click="controls.switchLink = !controls.switchLink">라우터</button>
                                </div>
                            </div>
                        </div>
                    <!-- 버튼/일반 링크 -->





                    <!-- 텍스트/범주 -->
                    <div v-if="renderId === '텍스트/범주'">
                        <div class="comp-view ">
                            <div class="show-child-tempblue">

                                <input type="text" class="text--display-l texttype-input" value="Display L" placeholder="Display L">
                                <input type="text" class="text--display-m texttype-input" value="Display M" placeholder="Display M">
                                <input type="text" class="text--display-s texttype-input" value="Display S" placeholder="Display S">
                                <input type="text" class="text--display-xs texttype-input" value="Display XS" placeholder="Display XS">

                                <input type="text" class="text--heading-l texttype-input" value="Heading L" placeholder="Heading L">
                                <input type="text" class="text--heading-m texttype-input" value="Heading M" placeholder="Heading M">
                                <input type="text" class="text--heading-s texttype-input" value="Heading S" placeholder="Heading S">
                                <input type="text" class="text--heading-xs texttype-input" value="Heading XS" placeholder="Heading XS">

                                <input type="text" class="text--subtitle-l texttype-input" value="Subtitle L" placeholder="Subtitle L">
                                <input type="text" class="text--subtitle-m texttype-input" value="Subtitle M" placeholder="Subtitle M">
                                <input type="text" class="text--subtitle-s texttype-input" value="Subtitle S" placeholder="Subtitle S">

                                <input type="text" class="text--button-m texttype-input" value="Button M" placeholder="Button M">
                                <input type="text" class="text--button-s texttype-input" value="Button S" placeholder="Button S">

                            </div>
                        </div>
                        <div class="comp-control">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <!-- 텍스트/범주 -->








                    <!-- 텍스트/리스트 -->
                    <div v-if="renderId === '텍스트/리스트'">
                        <div class="comp-view ">
                            <ul class="list--dot">
                                <li>tristique lectus</li>
                                <li>Praesent sodales</li>
                                <li>Proin augue</li>
                                <li>Nam vel consectetu</li>
                                <li>Integer accumsan vel leo at aliquet. Nullam consectetur magna et tortor </li>
                                <li>tempus. Class aptent taciti sociosqu ad litora torquent per conubia</li>
                                <li>enatis nunc suscipit vitae. Nulla quis neque hendrerit, condimentum ex sit amet, faucibus eros. Mauris dictum lacus a rutrum pharetra. Cras gravida commodo metus id mattis. Praesent tempus ac ex quis mollis. Nam vel consectetur ligula. Nulla pellentesque gravida est, non commodo sem. Sed ante urna, blandit non augue ac, fringilla interdum augue. Praesent faucibus a velit id cursus. Sed fermentum, turpis non ultrices maximus, nulla magna vehicula justo, blandit bibendum tellus nibh vitae orci. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt orci velit, vitae dapibus orci dictum ac. Aenean dapibus dignissim bibendum. Phasellus sed augue pharetra, bibendum lorem vel, fac</li>
                            </ul>

                            <ul class="list--asterisk">
                                <li>tristique lectus</li>
                                <li>Praesent sodales</li>
                                <li>Proin augue</li>
                                <li>Nam vel consectetu</li>
                                <li>Integer accumsan vel leo at aliquet. Nullam consectetur magna et tortor </li>
                                <li>tempus. Class aptent taciti sociosqu ad litora torquent per conubia</li>
                                <li>enatis nunc suscipit vitae. Nulla quis neque hendrerit, condimentum ex sit amet, faucibus eros. Mauris dictum lacus a rutrum pharetra. Cras gravida commodo metus id mattis. Praesent tempus ac ex quis mollis. Nam vel consectetur ligula. Nulla pellentesque gravida est, non commodo sem. Sed ante urna, blandit non augue ac, fringilla interdum augue. Praesent faucibus a velit id cursus. Sed fermentum, turpis non ultrices maximus, nulla magna vehicula justo, blandit bibendum tellus nibh vitae orci. In hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt orci velit, vitae dapibus orci dictum ac. Aenean dapibus dignissim bibendum. Phasellus sed augue pharetra, bibendum lorem vel, fac</li>
                            </ul>
                        </div>
                        <div class="comp-control">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <!-- 텍스트/리스트 -->







                    <!-- 입력/선택 드롭다운 -->
                        <div v-if="renderId === '입력/선택 드롭다운'">
                            <div class="comp-view row">

                                <InputDropdown  placeholder="선택해주세요"
                                                @change="controls.onChange"
                                                v-model="VMODEL_SELECTVALUE"
                                >
                                    <option     v-for="(item,idx) in 4"
                                                :key="idx"
                                                :value="`select_value_${item}`"
                                    >
                                        value {{item}}
                                    </option>
                                </InputDropdown>

                                <InputDropdown  placeholder="test placeholder"
                                                @change="controls.onChange"
                                                v-model="VMODEL_SELECTVALUE"
                                >
                                    <option     v-for="(item,idx) in 40"
                                                :key="idx"
                                                :value="`select_value_${item}`"
                                    >
                                        value {{item}}
                                    </option>
                                </InputDropdown>

                            </div>

                            <div class="comp-control">
                                <div>
                                    연결 값 : <strong>{{ VMODEL_SELECTVALUE }}</strong>
                                    &nbsp;
                                    <button class="default-button" @click="CHANGE_VMODEL_SELECTVALUE(6)">
                                        무작위변경 (1~6)
                                    </button>
                                </div>
                            </div>
                        </div>
                <!-- //입력/선택 드롭다운 -->










                <!-- 입력/토글 스위치 -->
                    <div v-if="renderId === '입력/토글 스위치'">
                        <div class="comp-view">
                            <InputToggleSwitch  v-model="controls.value"
                                                @change="controls.onChange"
                            />
                        </div>
                        <div class="comp-control">
                            <div>
                                연결 값 : <strong>{{ controls.value }}</strong>
                            </div>
                            <div>
                                <label class="checkbox-label">
                                    <input type="checkbox" v-model="controls.value">
                                    <span>SYNC</span>
                                </label>
                            </div>
                        </div>
                    </div>
                <!-- 입력/토글 스위치 -->









                <!-- 입력/선택 라디오 -->
                    <div v-if="renderId === '입력/선택 라디오'">

                        <div class="comp-view row">

                            <InputRadio value="yes"
                                        name="input-radio"
                                        @change="controls.onChange"
                                        v-model="controls.value"
                            >
                                yes
                            </InputRadio>

                            <InputRadio value="no"
                                        name="input-radio"
                                        @change="controls.onChange"
                                        v-model="controls.value"
                            >
                                no
                            </InputRadio>

                        </div>

                        <div class="comp-control">
                            <div>
                                연결 값 : <strong> {{ controls.value }} </strong>
                            </div>
                            <div>
                                연결 값 설정해보기 :
                                <label class="radio-label">
                                    <input type="radio" name="입력/선택 라디오/값" value="yes" v-model="controls.value" ><span>yes</span>
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="입력/선택 라디오/값" value="no" v-model="controls.value" ><span>no</span>
                                </label>
                                <label class="radio-label">
                                    <input type="radio" name="입력/선택 라디오/값" value="unmatch" v-model="controls.value" ><span>unmatch</span>
                                </label>
                            </div>
                        </div>
                    </div>
                <!-- //입력/선택 라디오 -->










                    <!-- 입력/선택 라디오 컬렉션 -->
                        <div v-if="renderId === '입력/선택 라디오 컬렉션'">
                            <div class="comp-view">

                                <!-- <InputRadioCollection -->
                                <InputRadioCollection   v-model="VMODEL_SELECTVALUE"
                                                        name="input-radio-collection"
                                                        @change="controls.onChange"
                                                        :direction="controls.direction"
                                                        :list="controls.list"
                                                        class="show-tempblue"
                                />

                            </div>
                            <div class="comp-control">
                                <div>
                                    연결 값 :  <strong> {{ VMODEL_SELECTVALUE }} </strong>
                                    &nbsp;
                                    <button class="default-button" @click="CHANGE_VMODEL_SELECTVALUE(10)">
                                        무작위변경 (1~10)
                                    </button>
                                </div>
                                <div>
                                    나열 방향 : {{ controls.direction === 'col' ? '세로' : '가로'}}
                                    &nbsp;
                                    <button class="default-button" @click="controls.direction = controls.direction === 'row' ? 'col' : 'row'">
                                        변환
                                    </button>
                                </div>
                            </div>
                        </div>
                    <!-- 입력/선택 라디오 컬렉션 -->









                    <!--  입력/선택 체크박스 -->
                        <div v-if="renderId === '입력/선택 체크박스'">
                            <div class="comp-view row">
                                <InputCheckbox
                                    v-model="controls.checks[0]"
                                    @change="controls.onChange"
                                    checked
                                    text="체크박스 A"
                                />
                                <InputCheckbox
                                    v-model="controls.checks[0]"
                                    @change="controls.onChange"
                                    text="체크박스 A"
                                />
                                <InputCheckbox
                                    v-model="controls.checks[1]"
                                    @change="controls.onChange"
                                    text="체크박스 B"
                                />
                                <InputCheckbox
                                    v-model="controls.checks[2]"
                                    @change="controls.onChange"
                                    text="체크박스 C"
                                />
                            </div>
                            <div class="comp-control">
                                <div>
                                    체크 옵저버 : <strong>{{ controls.checks }}</strong>
                                </div>
                                <div>
                                    체크 값 설정해보기
                                    &nbsp;
                                    <label class="checkbox-label">
                                        <input type="checkbox" v-model="controls.checks[0]">
                                        <span>sync A</span>
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" v-model="controls.checks[1]">
                                        <span>sync B</span>
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" v-model="controls.checks[2]">
                                        <span>sync C</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    <!--  입력/선택 체크박스 -->






                    <!--  입력/선택 체크박스 컬렉션 -->
                        <div v-if="renderId === '입력/선택 체크박스 컬렉션'">
                            <div class="comp-view">
                                <InputCheckboxCollection    v-model="controls.list"
                                                            @change="controls.onChange"
                                                            :direction="controls.direction"
                                                            name="input-checkbox-collection"
                                                            class="show-tempblue"

                                />
                            </div>
                            <div class="comp-control">
                                <div>
                                    체크 옵저버 : <strong>{{ controls.list.map(c => c.checked) }}</strong>
                                </div>
                                <div>
                                    체크 값 설정해보기
                                    &nbsp;
                                    <label class="checkbox-label" v-for="(item,idx) in controls.list" :key="idx">
                                        <input type="checkbox" v-model="item.checked">
                                        <span>sync {{idx+1}}</span>
                                    </label>
                                </div>
                                <div>
                                    나열 방향 : {{ controls.direction === 'col' ? '세로' : '가로'}}
                                    &nbsp;
                                    <button class="default-button" @click="controls.direction = controls.direction === 'row' ? 'col' : 'row'">
                                        변환
                                    </button>
                                </div>
                            </div>
                        </div>
                    <!--  입력/선택 체크박스 컬렉션 --> 






                    <!--  입력/입력 텍스트 -->
                        <div v-if="renderId === '입력/입력 텍스트'">
                            <div class="comp-view">
                                <InputText      style="max-width: 500px"
                                                placeholder="텍스트 - v-model 방식"
                                                v-model="controls.value"
                                                :mark="controls.mark"
                                                :focus="controls.focus"
                                                @change="controls.onChange"
                                                @focus="() => {
                                                    controls.mark = false;
                                                    controls.onFocus();
                                                }"
                                                @blur="() => {
                                                    controls.focus = false;
                                                    controls.onBlur();
                                                }"
                                />
                                <br>
                                <InputText      placeholder="텍스트 - :value 방식"
                                                style="max-width: 500px"
                                                :value="controls.value"
                                                @change="controls.onChange"
                                                @focus="controls.onFocus"
                                                @blur="controls.onBlur"
                                />
                            </div>
                            <div class="comp-control">
                                <div>
                                    연결 값 : <strong>{{controls.value}}</strong>
                                </div>
                                <div>
                                    <input type="text" v-model="controls.value" value="">
                                </div>
                                <div>
                                    1번 mark : <strong>{{controls.mark}}</strong>
                                    <button class="default-button" @click="controls.mark = !controls.mark" v-if="!controls.mark">전환</button>
                                </div>
                                <div>
                                    1번 focus : <strong>{{controls.focus}}</strong>
                                    <button class="default-button" @click="controls.focus = !controls.focus" v-if="!controls.focus">전환</button>
                                </div>
                            </div>
                        </div>
                    <!--  입력/입력 텍스트 -->







                    <!--  입력/입력 이메일 -->
                        <div v-if="renderId === '입력/입력 이메일'">
                            <div class="comp-view">
                                <InputTextEmail style="max-width: 500px"
                                                placeholder="이메일 - v-model 방식"
                                                v-model="controls.value"
                                                :mark="controls.mark"
                                                :focus="controls.focus"

                                                @change="(payload) => {
                                                    controls.onChange(payload);
                                                    controls.valid = payload.valid;
                                                }"
                                                @focus="() => {
                                                    controls.mark = false;
                                                    controls.onFocus();
                                                }"
                                                @blur="() => {
                                                    controls.focus = false;
                                                    controls.onBlur();
                                                }"
                                />
                                <br>
                                <InputTextEmail style="max-width: 500px"
                                                placeholder="이메일 - :value 방식"
                                                :value="controls.value"
                                                @change="controls.onChange"
                                                @focus="controls.onFocus"
                                                @blur="controls.onBlur"
                                />
                            </div>
                            <div class="comp-control">
                                <div>연결 값 : <strong>{{controls.value}}</strong></div>
                                <div><input type="text" v-model="controls.value" value=""></div>
                                <div>이메일 형식 검증 : {{ controls.valid }}</div>
                                <div>
                                    1번 mark : <strong>{{controls.mark}}</strong>
                                    <button class="default-button" @click="controls.mark = !controls.mark" v-if="!controls.mark">전환</button>
                                </div>
                                <div>
                                    1번 focus : <strong>{{controls.focus}}</strong>
                                    <button class="default-button" @click="controls.focus = !controls.focus" v-if="!controls.focus">전환</button>
                                </div>
                            </div>
                        </div>
                    <!--  입력/입력 이메일 -->







                    <!--  입력/입력 비밀번호 -->
                        <div v-if="renderId === '입력/입력 비밀번호'">
                            <div class="comp-view">
                                <InputTextPassword  placeholder="비밀번호 - v-model 방식"
                                                    style="max-width:500px"
                                                    v-model="controls.value"
                                                    :mark="controls.mark"
                                                    :focus="controls.focus"
                                                    @change="(v) => {
                                                        controls.valid = v.valid;
                                                        controls.error = v.errorState;
                                                        controls.onChange(v);
                                                    }"
                                                    @focus="() => {
                                                        controls.mark = false;
                                                        controls.onFocus();
                                                    }"
                                                    @blur="() => {
                                                        controls.focus = false;
                                                        controls.onBlur();
                                                    }"

                                />
                                <br>
                                <InputTextPassword  placeholder="비밀번호 - :value 방식"
                                                    style="max-width:500px"
                                                    :value="controls.value"
                                                    @change="(v) => {
                                                        controls.valid = v.valid;
                                                        controls.error = v.errorState;
                                                        controls.onChange(v);
                                                    }"
                                                    @focus="controls.onFocus"
                                                    @blur="controls.onBlur"
                                />
                            </div>
                            <div class="comp-control">
                                <div>
                                    입력 값 : {{controls.value}}
                                </div>
                                <div><input type="text" v-model="controls.value" value=""></div>

                                <div>
                                    비밀번호 사용 가능 여부 : {{controls.valid}}
                                </div>

                                <div v-if="controls.error">
                                    사용 불가능 상태 : {{ controls.error }}
                                </div>
                                <div>
                                    1번 mark : <strong>{{controls.mark}}</strong>
                                    <button class="default-button" @click="controls.mark = !controls.mark" v-if="!controls.mark">전환</button>
                                </div>
                                <div>
                                    1번 focus : <strong>{{controls.focus}}</strong>
                                    <button class="default-button" @click="controls.focus = !controls.focus" v-if="!controls.focus">전환</button>
                                </div>
                            </div>
                        </div>
                    <!--  입력/입력 비밀번호 -->








                    <!-- 디스플레이/sticky stack -->
                        <div v-if="renderId === '디스플레이/sticky stack'">
                            <div class="comp-view">
                                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                                <StickyStack>
                                    ho
                                    <br>
                                    hello
                                    <br>
                                    hey~
                                </StickyStack>
                                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                                <!-- <StickyStack>
                                    ho
                                </StickyStack>
                                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
                                <StickyStack>
                                    ho
                                </StickyStack>
                                <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br> -->
                            </div>
                            <div class="comp-control">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    <!-- 디스플레이/sticky stack -->









                    <!-- 모달/(구)Alert -->
                        <div v-if="renderId === '모달/(구)Alert'">
                            <div class="comp-control">
                                <div>
                                    Title : <input type="text" v-model="controls.payload.title">
                                </div>
                                <div>
                                    Message : <input type="text" v-model="controls.payload.message">
                                </div>
                                <div>
                                    ButtonText : <input type="text" v-model="controls.payload.buttonText">
                                </div>
                                <div>
                                    <button class="default-button" @click="controls.call(controls.payload)">
                                        호출하기
                                    </button>
                                </div>
                                <div>
                                    현재 호출 상태 : {{ $store.state.$modal.is_activeAlert }}
                                </div>
                            </div>
                        </div>
                    <!-- 모달/(구)Alert -->











                    <!-- 모달/(구)Confirm -->
                        <div v-if="renderId === '모달/(구)Confirm'">
                            <div class="comp-control">
                                <div>
                                    Title : <input type="text" v-model="controls.payload.title">
                                </div>
                                <div>
                                    Message : <input type="text" v-model="controls.payload.message">
                                </div>
                                <div>
                                    ButtonTrueText : <input type="text" v-model="controls.payload.buttonTrueText">
                                </div>
                                <div>
                                    ButtonFalseText : <input type="text" v-model="controls.payload.buttonFalseText">
                                </div>
                                <div>
                                    <button class="default-button" @click="controls.call(controls.payload)">
                                        호출하기
                                    </button>
                                </div>
                                <div>
                                    현재 호출 상태 : {{ $store.state.$modal.is_activeConfirm }}
                                </div>
                            </div>
                        </div>
                    <!-- 모달/(구)Confirm -->








                    <!-- 모달/다이얼로그 -->
                        <div v-if="renderId === '모달/다이얼로그'">
                            <div class="comp-control">
                                <div>
                                    <button class="default-button" @click="controls.call(controls.payload)">
                                        호출하기
                                    </button>
                                </div>
                                <div>
                                    타입 :
                                    <label class="radio-label">
                                        <input type="radio" name="모달/다이얼로그/type" value="alert" v-model="controls.payload.type"><span>alert</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="모달/다이얼로그/type" value="confirm" v-model="controls.payload.type"><span>confirm</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="모달/다이얼로그/type" value="prompt" v-model="controls.payload.type"><span>prompt</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="모달/다이얼로그/type" value="wait" v-model="controls.payload.type"><span>wait</span>
                                    </label>
                                </div>
                                <div>
                                    타이틀 : <input type="text" v-model="controls.payload.title">
                                </div>
                                <div>
                                    메세지 : <input type="text" v-model="controls.payload.message">
                                </div>
                                <div>
                                    Confirm 버튼 텍스트 : <input type="text" v-model="controls.payload.buttonConfirmText">
                                </div>
                                <div>
                                    Cancel 버튼 텍스트 : <input type="text" v-model="controls.payload.buttonCancelText">
                                </div>
                                <div>
                                    prompt pre-value : <input type="text" v-model="controls.payload.promptValue">
                                </div>
                                <div>
                                    prompt placeholder : <input type="text" v-model="controls.payload.promptPlaceholder">
                                </div>
                            </div>
                        </div>
                    <!-- 모달/다이얼로그 -->









                     <!-- 디스플레이/레이어 컨텐츠 -->
                        <div v-if="renderId === '디스플레이/레이어 컨텐츠'">
                            <div class="comp-view">

                                <div class="show-tempblue">
                                    <strong>레이어 컨텐츠 표시 예시용 레이아웃. 아래의 호출하기 버튼으로 레이어 컨텐츠를 호출해주세요.</strong>
                                </div>
                                <br>
                                <div class="show-tempblue">
                                    <KakaoEvent class=""/>
                                </div>

                                <LayerContent   :title="controls.mobileTitle"
                                                v-model="controls.isShow"
                                                :hash="controls.useHash ? controls.hash : null"

                                >
                                    <KakaoEvent :isShowList="controls.isShowList"/>
                                </LayerContent>

                            </div>
                            <div class="comp-control">
                                <div>
                                    <button class="default-button" @click="controls.isShow = !controls.isShow">
                                        호출하기
                                    </button>
                                </div>
                                <div>
                                    현재 호출 상태 : {{ controls.isShow }}
                                </div>
                                <div>
                                    <label class="checkbox-label">
                                        <input type="checkbox" v-model="controls.isShowList">
                                        <span>스크롤 리스트 더미 만들기</span>
                                    </label>
                                </div>
                                <div>
                                    <label class="checkbox-label">
                                        <input type="checkbox" v-model="controls.useHash">
                                        <span>해시 사용</span>
                                    </label>
                                    &nbsp;
                                    <input type="text" v-if="controls.useHash" v-model="controls.hash">
                                </div>

                                <div class="visible-phone">
                                    타이틀(모바일 전용)
                                    &nbsp;
                                    <input type="text" v-model="controls.mobileTitle">
                                </div>
                            </div>
                        </div>
                    <!-- 디스플레이/레이어 컨텐츠 -->








                        <!-- <div v-if="renderId === '맞는 ID'">
                            <div class="comp-view">
                            </div>
                            <div class="comp-control">
                                <div></div>
                                <div></div>
                            </div>
                        </div> -->



























                        <template v-if="selectItem.name">
                            <div class="comp-infomation">
                                <div class="comp-title">{{selectItem.title}}</div>
                                <div class="comp-text">{{selectItem.text}}</div>

                                <ul class="comp-propslist" v-if="selectItem.props">
                                   <li v-for="([c,v],idx) in Object.entries(selectItem.props)" :key="idx">
                                        <div class="comp-propslist-key">{{c}}</div>
                                        <div class="comp-propslist-value">{{v}}</div>
                                   </li>
                                </ul>

                                <ul class="comp-infovalue" v-if="selectItem.info" >
                                    <!-- <p>기본 설정 시트<p> -->
                                    <li v-for="([c,v],idx) in Object.entries(selectItem.info)" :key="idx">
                                        <div class="comp-infovalue-key">{{c}}</div>
                                        <div class="comp-infovalue-value">{{v}}</div>
                                    </li>
                                </ul>

                            </div>
                        </template>

                        <template v-else>
                            <div class="comp-need-select">
                                <!-- <span class="visible-overphone">←</span> -->
                                <!-- <span class="visible-phone">↑</span> -->
                                ← please select component
                            </div>
                        </template>
                    </div>

                </div>

            </div>

        </div>
    </div>

</template>

<script>

// import Category from './Category.vue';
import categoryData from './categoryData.js';
import ButtonDefault from '@/components/button/ButtonDefault.vue';
import ButtonDownload from '@/components/button/ButtonDownload.vue';
import ButtonUndermask from '@/components/button/ButtonUndermask.vue';
import InputDropdown from '@/components/input/InputDropdown.vue';
import InputToggleSwitch from '@/components/input/InputToggleSwitch.vue';
import InputRadio from '@/components/input/InputRadio.vue';
import InputRadioCollection from '@/components/input/InputRadioCollection.vue';
import InputCheckbox from '@/components/input/InputCheckbox.vue';
import InputCheckboxCollection from '@/components/input/InputCheckboxCollection.vue';
import InputText from '@/components/input/InputText.vue';
import InputTextEmail from '@/components/input/InputTextEmail.vue';
import InputTextPassword from '@/components/input/InputTextPassword.vue';
import StickyStack from '@/components/display/StickyStack.vue';

import LayerContent from '@/components/display/LayerContent.vue';
import KakaoEvent from '@/components/layout/KakaoEvent.vue';


export default {
    name : 'PageComponents',
    components : {
    // Category,
        ButtonDefault,
        ButtonDownload,
        ButtonUndermask,

        InputDropdown,
        InputRadio,
        InputRadioCollection,
        InputToggleSwitch,
        InputCheckbox,
        InputCheckboxCollection,
        InputText,
        InputTextEmail,
        InputTextPassword,

        StickyStack,

        LayerContent,
        KakaoEvent,

    },
    data() {

        const categoryOrder = categoryData.reduce((p,c) => {
            const [ categoryName ] = c.name.split('/');
            if(!p[categoryName]){
                p[categoryName] = [];
            }
            p[categoryName].push(c.name);
            return p;
        },{});

        return {

            isTabOpen : false,
            categoryData ,
            categoryOrder,

            selectItem : {},

            controls : {},

            renderId : '',

            VMODEL_SELECTVALUE : 'select_value_3',

        }
    },
    watch : {
        "VMODEL_SELECTVALUE"(){
            // console.log(this.VMODEL_SELECTVALUE)
        }
    },

    methods : {
        TEST_ONCHANGE(e) {
            console.log(e);
        },
        CONSOLE_EVENT(payload) {
            {payload}
            // console.log('console evnet : ', payload);
        },
        CHANGE_VMODEL_SELECTVALUE(limit) {
            limit === undefined && (limit = 10);

            const newValue = `select_value_${Math.ceil(Math.random() * limit)}`;

            if(newValue === this.VMODEL_SELECTVALUE){
                this.CHANGE_VMODEL_SELECTVALUE(limit);
            }else {
                this.VMODEL_SELECTVALUE = newValue;
            }

        },

        onClickControlTab(bool) {
            this.isTabOpen = bool === undefined ? !this.isTabOpen : bool;
        },

        onClickCategoryName(e) {
            const parent = e.currentTarget.parentElement;

            if(parent.classList.contains('st-open')){
                parent.classList.remove('st-open');
            }else {
                parent.classList.add('st-open');
            }

        },

        onClickItem(itemName) {
            if(this.renderId === itemName){
                return
            }

            const before = document.querySelector(`.tab__item.st-selected`);
            const target = document.querySelector(`[data-id='${itemName}']`);

            before && before.classList.remove('st-selected');
            target.classList.add('st-selected');

            this.selectItem =  null;

            const find = this.categoryData.find((c) => c.name === itemName);

            this.selectItem = {...find};

            this.controls = {...find.control};

            this.renderId = itemName;

            this.onClickControlTab(false);

        },

    },
    created() {
        this.CHANGE_VMODEL_SELECTVALUE(3);
    },

    updated () {

    },

    mounted() {

    }
}
</script>


<style src="./PageComponents.scss" lang="scss"></style>