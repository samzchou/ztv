<template>
    <el-select :size="size" v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
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
        options: [],
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
