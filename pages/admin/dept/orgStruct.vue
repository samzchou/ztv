<template>
    <section class="org-container">
        <div class="title">组织机构（人事）图</div>
        <div class="desc">
            <div><i class="root" />总部</div>
            <div><i class="noemp" />部门无员工</div>
            <div><i class="hasemp" />部门有员工</div>
            <div><i class="disabled" />部门已禁用</div>
        </div>
        <div class="content">
            <el-scrollbar class="scrollbar">
                <client-only>
                    <tree-chart :json="treeData" :userList="userList" :isDetail="false" />
                </client-only>
            </el-scrollbar>
        </div>
    </section>
</template>

<script>
import treeChart from '~/components/treeChart';
export default {
    components: {
        treeChart
    },
    data: () => ({
        userList: [],
        treeData: {
            dept_name: '中浙高铁总公司',
            pid: 0,
            id: 0,
            children: []
        }
    }),
    methods: {
        async getUser() {
            let result = await this.$axios.$post('mock/db', {
                data: {
                    type: 'listData',
                    collectionName: 'employee',
                    data: {},
                    column: { "id": 1, "name": 1 }
                }
            });
            this.userList = result.list;
            console.log('getUser', this.userList)
            this.getList();
        },
        async getList() {
            let result = await this.$axios.$post('mock/db', {
                data: {
                    type: 'aggregate',
                    collectionName: 'department',
                    data: {},
                    aggregate: [
                        {
                            $lookup: {
                                from: "employee",
                                localField: "leaderId",
                                foreignField: "id",
                                as: "leader"
                            }
                        },
                        {
                            $unwind: { // 拆分子数组
                                path: "$leader",
                                preserveNullAndEmptyArrays: true // 空的数组也拆分
                            }
                        }/* ,
                        {
                            $addFields: { leaderName: "$leader.e_name" }
                        } */
                    ]
                }
            });

            if (result) {
                this.treeData.children = this.$global.toTree(result.list, { parentKey: 'dept_parentid' });
            }
        }
    },
    mounted() {
        this.getUser();

    },
    layout: "admin"
}
</script>

<style lang="scss" scoped>
.org-container {
    height: 100%;
    .title {
        text-align: center;
        padding: 20px;
        height: 40px;
        box-sizing: border-box;
        font-size: 16px;
    }
    .desc {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        > div {
            display: flex;
            align-items: center;
            margin: 0 10px;
            > i {
                background-color: #ccc;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                display: block;
                &.root {
                    background-color: #3eca96;
                }
                &.noemp {
                    background-color: #199ed8;
                }
                &.hasemp {
                    background-color: #ffcc00;
                }
            }
        }
    }
    .content {
        height: calc(100% - 70px);
        overflow: hidden;
        .scrollbar {
            height: 100%;
            /deep/ .el-scrollbar__wrap {
                overflow-x: hidden;
                .el-menu--collapse {
                    width: auto;
                }
            }
            /deep/ .el-scrollbar__bar {
                z-index: 2;
            }
        }
    }
}
</style>