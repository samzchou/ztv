<template>
    <section class="sampage-container">
        <el-scrollbar class="scrollbar">
            <div v-loading="!isInit">
                <template v-if="isInit">
                    <page-data v-if="!notFound" :data="pageForm" :listParam="listParam" />
                    <div v-else class="page-error">
                        对不起，系统无法定位到具体页面，请核查参数！
                    </div>
                </template>
            </div>
        </el-scrollbar>
    </section>
</template>

<script>
import pageData from '~/components/page/data';
export default {
    name: 'sys-page',
    components: {
        pageData
    },
    watch: {
        $route: 'getPage'
    },
    data: () => ({
        isInit: false,
        pageForm: null,
        notFound: false,
        listParam: {}
    }),
    methods: {
        async getPage(pageId) {
			pageId = pageId?pageId:this.$route.query.id;
			if(!pageId){
				this.$alert("页面参数出错！");
				this.isInit = true;
				this.notFound = true;
				return;
			}
            let condition = {
                type: 'getData',
                collectionName: 'pageList',
                data: {
                    id: pageId
                }
            }
            let result = await this.$axios.$post('mock/db', { data: condition })
            if (!result) {
                this.$alert("无法定位到具体页面！请核查问题");
                this.notFound = true;
            } else {
                let pageForm = Object.assign({}, result.content);
                //this.pageForm = Object.assign({}, result.content)
                let cn = {
                    type: 'getData',
                    collectionName: 'formList',
                    data: {
                        id: result.content.formid
                    }
                }

                let form_content = await this.$axios.$post('mock/db', {
                    data: cn
                });
                console.log('form_content', form_content)
                if (!form_content) {
                    this.$alert("无法获取表单数据，请联系管理员！");
                    this.notFound = true;
                    return;
                }
                pageForm.content = form_content.content;
                this.pageForm = _.cloneDeep(pageForm);
                //console.log('this.pageForm', JSON.stringify(this.pageForm))
            }
            this.isInit = true;
        }
    },
    mounted() {
        this.getPage()
    }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/page';
</style>
