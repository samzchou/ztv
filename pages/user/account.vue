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
            this.listParam = {
                department: this.$store.state.user.department
            }
            let dept = this.$storage.session.get("dept");
            if (dept) {
                this.viewAll = true;
                let deptIds = dept.map(item => {
                    return item.id;
                })
                this.listParam.department = { $in: deptIds };
            } else {
                this.listParam.id = this.$store.state.user.id;
            }
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