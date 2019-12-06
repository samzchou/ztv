<template>
    <section class="doc-container">
        <slider-panel :title="sliderTitle" :visible.sync="viewOption" :width="sliderWidth" position="left" shadow />
        <div class="mid">
            <div class="btns">
                <div :class="{'active':activeName=='user'}" @click="activeName='user'">我的文档</div>
                <div :class="{'active':activeName=='department'}" @click="activeName='department'">部门文档</div>
                <div :class="{'active':activeName=='company'}" @click="activeName='company'">公司共享文档</div>
            </div>
            <document :doctype="activeName" />
            <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的文档" name="mine">
                    <document :doctype="activeName" />
                </el-tab-pane>
                <el-tab-pane label="部门文档" name="department">部门文档</el-tab-pane>
                <el-tab-pane label="公司文档" name="company">公司共享文档</el-tab-pane>
            </el-tabs> -->
        </div>
        <div class="top-btns">
            <!-- <el-button size="small" type="warning">批量删除</el-button>
            <el-button size="small" type="primary" @click="viewOpts('upload')">上传文档</el-button> -->
        </div>
    </section>
</template>

<script>
import sliderPanel from '~/components/sliderPanel';
import document from '~/components/document';
export default {
    components: {
        sliderPanel, document
    },
    data: () => ({
        activeName: "user",
        sliderTitle: "上传文档",
        sliderWidth: "300px",
        viewOption: false
    }),
    methods: {
        handleClick() {

        },
        viewOpts(type) {
            this.sliderTitle = "上传文档";
            if (type == 'setting') {
                this.sliderTitle = "文档设置";
            }
            this.viewOption = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import './doc';
</style>