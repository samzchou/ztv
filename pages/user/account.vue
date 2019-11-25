<template>
    <section class="sam-page">
        <div class="header">
            <div class="title"><i class="el-icon-price-tag" />用户个人信息</div>

        </div>
    </section>
</template>

<script>
import samForm from '~/components/form';
import pageData from '~/components/page/data';
export default {
    components: {
        samForm, pageData
    },
    data: () => ({

        listParam: {
            username: { "$ne": "admin" }
        }
    }),
    methods: {

    },
    mounted() {
        //this.setData();
    }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/admin-form';
</style>