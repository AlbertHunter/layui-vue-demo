<template>
  <lay-container fluid>
    <div class="container-page">
		<div class="login-container">
			<lay-form :model="formData" ref="formFields" :pane="pane1" :size="size1" :rules="rules">
				<div class="login-container__title">后台登录</div>
				<lay-form-item label="账户" prop="username" required>
					<lay-input v-model="formData.username"></lay-input>
				</lay-form-item>
				<lay-form-item label="密码" prop="password" required>
					<lay-input v-model="formData.password" type="password"></lay-input>
				</lay-form-item>
				<div class="login-container__submit">
					<lay-button type="primary" @click="submit" fluid>登录</lay-button>
				</div>
			</lay-form> 
		</div>
    </div>
  </lay-container>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { layer } from '@layui/layer-vue'
import { useRouter } from 'vue-router'
//公用方法
const useCommonEffect = () => {
	//表单验证
	const validateForm = (rule, value, callback) => {
		const length = value.toString().length
		if ( length < 6 || length > 16 ) callback(new Error(`${rule.field}长度需要在8和16之间`))
		const regexp = /^[A-Za-z0-9]{6,16}$/
		if (!regexp.test(value)) callback(new Error(`${rule.field}格式错误`))
		return true		
	}
	return { validateForm }
}

const router = useRouter()
const size1 = ref("md");
const pane1 = ref(true);
const formData = reactive({
  username: "",
  password: ""
})
const { validateForm } = useCommonEffect()
const formFields = ref();
const rules = ref({
  username : {
    type :  'string',
    min : 6,
    max : 16,
	validator: (rule, value, callback) => validateForm(rule, value, callback)
  },
  password : {
    type :  'string',
    min : 6,
    max : 16
  }
})
const submit = () => {
//   layer.msg(`${JSON.stringify(model)}`, { time: 2000 })
	formFields.value.validate((isValidate, model, errors) => {
		console.log(isValidate, model, errors)
		if (!isValidate) return false
		localStorage.isLogin = true
		router.push({ name: 'Dashboard' })
		layer.open({
			type: 1,
			title:"表单提交结果", 
			content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(model)} </p> <p>错误信息 : ${JSON.stringify(errors)}</p></div>`, 
			shade: false,
			isHtmlFragment: true,
			btn : [{ text: '确认', callback(index) {  layer.close(index) }}],
			area : '500px'
    	});
  	});
}
</script>
<style lang="scss" scoped>
.container-page {
	width:100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
.login-container {
	min-width: 300px;
	border: 1px solid #eee;
	padding: 60px;
	border-radius: 5px;
	&__title {
		text-align: center;
		font-size: .2rem;
		padding-bottom: .25rem;
	}
	&__submit {
		text-align: center;
	}
}
</style>
