<template>
    <el-date-picker :size="size" v-model="value" type="date" placeholder="选择日期" @change="changeValue" />
</template>
<script>
export default {
    name: "sam-input",
    props: {
        data: Object,
        size: {
            type: String,
            default: "mini"
        }
    },
    watch: {
        data: {
            handler(obj) {
                this.setItemData();
            },
            immediate: true
        }
    },
    data: () => ({
        itemData: {},
        value: ''
    }),
    methods: {
        setItemData() {
            this.itemData = _.cloneDeep(this.data);
        },
        changeValue() {
            this.$emit('change', this.data.value);
        }
    },
}
</script>
