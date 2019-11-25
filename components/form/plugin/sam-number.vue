<template>
    <el-input :size="size" :type="itemData.cptype" v-model="itemData.value" :placeholder="itemData.placeholder" :readonly="itemData.readonly" :clearable="itemData.clearable" :disabled="itemData.disabled" @change="changeValue" />
</template>
<script>
import $bus from '~/util/bus';
export default {
    name: "sam-input",
    props: {
        data: Object,
        size: {
            type: String,
            default: "mini"
        },
        isEdit: {
            type: Boolean,
            default: false
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
        itemData: {}
    }),
    methods: {
        setItemData() {
            this.itemData = _.cloneDeep(this.data);
        },
        changeValue() {
            $bus.$emit('submitForm', { "name": this.itemData.name, "value": this.itemData.value });
        }
    },
}
</script>
