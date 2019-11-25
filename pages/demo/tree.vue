<template>
    <section class="tree-content">
        <!--:check-strictly="true" -->
        <el-tree ref="tree" :data="data" show-checkbox default-expand-all node-key="id" highlight-current :props="defaultProps" @check-change="checkChange" @check="setCheck" />

    </section>
</template>
<script>
export default {
    data() {
        return {
            selectOrg: {
                orgsid: []
            },
            data: [
                {
                    id: 1,
                    pid: 0,
                    label: '一级 1',
                    children: [
                        {
                            id: 2,
                            pid: 1,
                            label: '一级 1-1',

                        },
                        {
                            id: 3,
                            pid: 1,
                            label: '一级 1-2',

                        }
                    ]
                },
                {
                    id: 4,
                    pid: 0,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        pid: 4,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        pid: 4,
                        label: '二级 2-2'
                    }]
                },
                {
                    id: 7,
                    pid: 0,
                    label: '一级 3',
                    children: [{
                        id: 8,
                        pid: 7,
                        label: '二级 3-1'
                    }, {
                        id: 9,
                        pid: 7,
                        label: '二级 3-2'
                    }]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            selectNodes: [],
            editCheckId: 0,
        };
    },
    methods: {

        checkChange(item, node) {
            console.log(item, node)
            if (node === true) {
                if (item.pid == 0) {
                    this.editCheckId = item.id;
                    let keys = this.getItemKeys(item.children);
                    this.$refs.tree.setCheckedKeys(keys);
                } else {
                    if (item.pid !== this.editCheckId) {
                        this.editCheckId = item.pid;
                        this.$refs.tree.setCheckedKeys([item.id]);
                    } else {
                        let keys = this.$refs.tree.getCheckedKeys();
                        keys.push(item.id);
                        this.$refs.tree.setCheckedKeys(keys);
                    }
                }
            }
            let checkedNodes = this.$refs.tree.getCheckedNodes().filter(o => { return o.pid !== 0 });
            console.log('getCheckedNodes', checkedNodes)
        },
        getItemKeys(nodes) {
            let keys = nodes.map(item => {
                return item.id;
            })
            return keys;
        },
        setCheck(item, { checkedNodes }) {
            console.log('setCheck', item, checkedNodes)
        }

    },


};
</script>
<style lang="scss" scoped>
.tree-content {
    .buttons {
        padding: 20px;
    }
}
</style>
