<template>
  <div class="auth__signin-email">

      <InputDefault type="email" placeholder="이메일" />

      <InputDefault type="password" placeholder="비밀번호" />

  </div>
</template>

<script>

import InputDefault from '@/components/input/InputDefault.vue';

export default {
    components : {
        InputDefault ,
    },
}
</script>

<style>
.auth__signin-email {
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>