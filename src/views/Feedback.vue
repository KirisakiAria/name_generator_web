<template>
  <section class="feedback container">
    <p>请在下方输入您的意见或建议：</p>
    <section class="form">
      <textarea v-model="form.content"></textarea>
      <div class="form-item">
        <label for="email">您的联系邮箱：</label>
        <input type="email" id="email" v-model="form.email" />
      </div>
      <button type="button" @click="submitForm">提交</button>
    </section>
  </section>
</template>
<script>
  import mixin from '../mixin/mixin'

  export default {
    name: 'Feedback',
    mixins: [mixin],
    data() {
      return {
        form: {
          tel: '',
          username: '',
          content: '',
          email: '',
        },
      }
    },
    methods: {
      async submitForm() {
        if (!this.form.content) {
          return this.$toasted
            .show('请输入您的意见或建议', {
              position: 'bottom-center',
            })
            .goAway(2500)
        }
        if (this.form.tel == 'null') {
          this.form.tel = 0
        }
        const res = await this.$post(this.API.feedback, this.form)
        if (res.data.code == '1000') {
          this.$toasted
            .show('提交成功，感谢您的意见或建议', {
              position: 'bottom-center',
            })
            .goAway(2500)
        }
      },
    },
    created() {
      this.form.tel = this.$route.query.tel
      this.form.username = this.$route.query.username
    },
  }
</script>

<style lang="less" scoped>
  @import url('../assets/css/style.less');
  .feedback {
    padding-top: 0.4rem;
    textarea {
      margin-top: 0.2rem;
      width: 100%;
      height: 300px;
      border-radius: 0.16rem;
      border: 1px solid #efefef;
      padding: 0.2rem;
      font-size: 0.3rem;
      resize: none;
    }

    .form-item {
      display: flex;
      align-items: center;
      margin-top: 0.4rem;

      input {
        display: block;
        flex-grow: 1;
        border-bottom: 1px solid #efefef;
        padding-bottom: 0.15rem;
        font-size: 0.3rem;
      }
    }

    button {
      display: block;
      margin: auto;
      margin-top: 0.5rem;
      color: #fff;
      background-color: #67c23a;
      border-radius: 0.08rem;
      width: 4rem;
      height: 0.6rem;
    }
  }
</style>
