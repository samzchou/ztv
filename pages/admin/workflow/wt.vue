<template>
    <section class="sampage-container">
        <el-scrollbar class="scrollbar">
            <page-data :data="pageForm" :listParam="listParam" />
        </el-scrollbar>
    </section>
</template>

<script>
import pageData from '~/components/page/data'
import wtForm from './wtForm.json';
export default {
    components: {
        pageData
    },
    data: () => ({
        pageForm: { ...wtForm },
        listParam: {},
    }),

    layout: "admin"
}
</script>
