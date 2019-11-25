<template>
    <section class="edit-container">
        <div class="content" v-if="checkEdit">
            <div class="title"><span>{{editItem.label}}</span>属性编辑</div>
            <component class="cp" :is="editItem.component" />
        </div>
        <div v-else class="error">请点选表单组件配置</div>
    </section>
</template>

<script>
import {
    mapState, mapMutations, mapActions
} from 'vuex';
export default {
    name: "edit-itme",
    components: {
        "sam-date": resolve => require(["./edit/sam-date.vue"], resolve),
        "sam-input": resolve => require(["./edit/sam-input.vue"], resolve),
        "sam-number": resolve => require(["./edit/sam-number.vue"], resolve),
        "sam-radio": resolve => require(["./edit/sam-radio.vue"], resolve),
        "sam-select": resolve => require(["./edit/sam-select.vue"], resolve),
        "sam-cascader": resolve => require(["./edit/sam-cascader.vue"], resolve),
        "sam-switch": resolve => require(["./edit/sam-switch.vue"], resolve),
    },
    computed: {
        ...mapState('forms', ['currComponent']),
        checkEdit() {
            if (this.currComponent) {
                return true;
            }
            return false;
        }
    },
    watch: {
        currComponent: {
            handler(obj) {
                /* this.$nextTick(() => {
                    this.setItemData();
                }) */
                this.setItemData();
            },
            immediate: true
        }
    },
    data: () => ({
        editItem: null,
    }),
    methods: {
        setItemData() {
            if (this.currComponent) {
                this.editItem = _.cloneDeep(this.currComponent);
            } else {
                this.editItem = null;
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.setItemData();
        })

    }
}
</script>

<style lang="scss" scoped>
.edit-container {
    //padding: 20px;
    .content {
        .title {
            line-height: 30px;
            background-color: #dfedfb;
            text-align: center;
            > span {
                margin-right: 5px;
                color: #2d47ff;
            }
        }
        .cp {
            padding: 20px;
        }
    }
    .error {
        font-weight: bold;
        padding: 20px;
        color: #f99c9c;
    }
}
</style>