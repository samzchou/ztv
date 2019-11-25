<template>
    <section>
        <page-data :data="data" :listParam="listParam" />
    </section>
</template>

<script>
// 已废弃
import { mapState, mapMutations, mapActions } from 'vuex';
import samForm from '~/components/form';
import dataOptions from '~/config/options';
import dataUtil from '~/util/data_util';
import pageData from '~/components/page/data';
export default {
    name: "sam-page",
    components: {
        samForm, pageData
    },
    props: {
        data: {
            type: Object,
            default: {}
        },
        listParam: {
            type: Object,
            default: {}
        },
        isRelease: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        data: {
            handler(obj) {
                if (!this.isInit) {
                    /* this.resetConst();
                    this.isInit = true; */
                }
            },
            immediate: true
        },
        collectionData: {
            handler(obj) {
                if (!_.isEmpty(obj)) {
                    this.resetConst();
                    this.isInit = true;
                }
            },
            immediate: true
        }
    },
}
</script>

<style lang="scss" scoped>
.page-enginer {
    margin: 20px;
    border: 1px solid #eee;
    box-shadow: 3px 3px 5px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    .title {
        padding: 15px 20px;
        border-bottom: 1px solid #eee;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
            &:first {
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
    .form-container {
        .btns {
            padding: 0 20px 40px;
        }
    }
    .table-container {
        .filter {
            padding: 10px 0;
            background-color: #f1f5ff;
            border-bottom: 1px solid #dde6f3;
            .btns {
                padding: 0 0 10px 20px;
            }
        }
        .tables {
            .pages {
                padding: 10px;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>