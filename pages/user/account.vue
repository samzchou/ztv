<template>
    <section>
        <commonPage :pageId="pageId" :listParam="listParam" :viewAll="viewAll" :uinq="uinq" />
    </section>
</template>

<script>
import commonPage from '~/components/page';
export default {
    components: {
        commonPage
    },
    data: () => ({
        loadingPage: true,
        pageId: 0,
        viewAll: false,
        listParam: {},
        uinq: ["username", "password"],
    }),
    methods: {
        async getData() {
            this.listParam = {};
            let dept = this.$storage.get("dept");
            let deptList = this.$store.state.collectionData.department;
            let detpIds = [];
            if (dept) {
                dept.forEach(item => {
                    detpIds = detpIds.concat(this.$global.getDeptIds(deptList, item.id));
                })
                console.log('listEmployee', detpIds);
                if (detpIds.length) {
                    this.listParam.department = { $in: detpIds };
                }
            } else {
                this.listParam.id = this.$store.state.user.id;
            }
            // admin管理员
            if (this.$store.state.user.username == "admin") {
                this.listParam = {};
                this.viewAll = true;
            }
            //console.log('account listParam', this.listParam)
            let condition = {
                type: 'getData',
                collectionName: 'service',
                data: {
                    page_url: this.$route.path
                },
                column: { page_id: 1, title: 1 }
            }
            let res = await this.$axios.$post('mock/db', { data: condition });
            if (res) {
                this.pageId = res.page_id;
            }
        }
    },
    mounted() {
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/admin-form';
.mypage-content {
    min-height: 400px;
}
</style>