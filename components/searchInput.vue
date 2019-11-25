<template>
	<div class="search-input" :class="{'show':visible}" :style="style">
		<slot name="search">
			<el-button class="icon-link btn" icon="el-icon-search" @click="$emit('update:visible', !visible)">搜索 </el-button>
		</slot>
		<div class="search-container">
			<el-input ref="input" v-model="searchValue" :size="size" :placeholder="placeholder" autofocus
				@change="changeKey" clearable>
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
				<i slot="suffix" class="el-input__icon el-icon-close" @click="$emit('update:visible', false)"></i>
			</el-input>
		</div>
	</div>
</template>
<script>
export default {
	data: () => ({
		searchValue: "",
	}),
	watch: {
		visible(val) {

		},
		value(val) {
			this.searchValue = val;
		}
	},
	props: {
		width: {
			type: String,
			default: '100%'
		},
		value: [String, Number],
		visible: { //是否显示
			type: Boolean,
			default: false
		},
		placeholder: String, //提示文案
		size: { //大小
			type: String,
			default: "medium"
		}
	},
	computed: {
		style() {
			return {
				"width": this.visible ? this.width : "50px"
			};
		}
	},
	methods: {
        changeKey(val){
            console.log('changeKey', val);
            this.$emit('change', val);
        }
	},
	mounted() {

	},
};
</script>

<style lang="scss" scoped>
.search-input {
	display: flex;
	align-items: center;
	overflow: hidden;
	min-width: 50px;
	height: 28px;
	position: relative;
	.btn {
		transition: left 0.5s;
		position: absolute;
	}
	.search-container {
		position: absolute;
		width: 100%;
		left: -100%;
		opacity: 0;
		transition: all 0.35s;
	}

	&.show {
		.btn {
			left: -100%;
		}
		.search-container {
			opacity: 1;
			left: 0;
		}
	}
}
</style>
