<template>
    <section class="file-container">
        <div class="box">
            <div class="left" id="box-left" :style="{'width':leftWidth+'px'}">
                <div class="root">
                    <div>系统文件目录</div>
                    <div>
                        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addDir(null)">添加下级目录</el-button>
                    </div>
                </div>
                <div class="tree-content">
                    <el-scrollbar class="scrollbar">
                        <client-only>
                            <el-tree ref="tree" :data="treeData" node-key="id" default-expand-all highlight-current :expand-on-click-node="false" :props="defaultProps" @node-drop="handleDrop" draggable @node-click="nodeClick">
                                <div class="custom-tree-node" slot-scope="{ node, data }">
                                    <div v-if="editNode && editNode.id == data.id" class="edits">
                                        <input type="text" v-model="editNode.label" />
                                        <div class="btns">
                                            <i class="el-icon-check" @click.stop.prevent="updateNode" />
                                            <i class="el-icon-close" @click.stop.prevent="editNode=null" />
                                        </div>
                                    </div>
                                    <div v-else><i class="el-icon-folder" />{{ node.label }}</div>

                                    <div class="btns">
                                        <el-button class="icon-link" size="mini" @click.stop.prevent="() => editTree(data)" icon="el-icon-edit" />
                                        <el-button class="icon-link" size="mini" @click.stop.prevent="() => addDir(data)" icon="el-icon-plus" />
                                        <el-button class="icon-link" size="mini" @click.stop.prevent="() => removeTree(node, data)" icon="el-icon-delete" />
                                    </div>
                                </div>
                            </el-tree>
                        </client-only>
                    </el-scrollbar>
                </div>
            </div>
            <div class="resize" @mousedown="handlerMouseDown"></div>
            <!--中间部分-->
            <div class="mid" id="box-mid">
                <div class="forms" v-if="isAddForm">
                    <div class="title">{{formTitle}}</div>
                    <sam-form ref="editform" :data="formData" :isEdit="false" v-model="formValue" />
                    <div class="submit">
                        <el-button size="mini" type="primary" @click="submitForm">提交保存</el-button>
                        <el-button size="mini" @click="resetForm">重置</el-button>
                        <el-button size="mini" @click="isAddForm=false">返回</el-button>
                    </div>
                </div>
                <div v-else class="files-list">
                    <div class="lists" v-if="!isAddFile">
                        <div class="title">
                            <div>{{currNode?currNode.name:'根目录'}} 文件列表</div>
                            <div>
                                <el-button size="mini" @click="addDir(currNode)">新增目录</el-button>
                                <el-button size="mini" @click="isAddFile=true">上传文件</el-button>
                            </div>
                        </div>
                        <div class="file-content">
                            <el-scrollbar class="scrollbar">
                                <el-row :gutter="20">
                                    <el-col :span="3" v-for="node in childrenList" :key="node.id">
                                        <el-card :body-style="{padding: '0px'}">
                                            <div class="icon-img" :style="{'background-image':`url(/images/icons/${getFolder(node)}.png)`}"></div>
                                            <div class="desc">
                                                <span>{{node.name}}</span>
                                            </div>
                                        </el-card>
                                    </el-col>
                                    <el-col :span="3" v-for="file in fileList" :key="file.id">
                                        <el-card :body-style="{padding: '0px'}">
                                            <div class="icon-img" :style="{'background-image':`url(/images/icons/${getExt(file)}.png)`}"></div>
                                            <div class="desc">
                                                <span>{{file.filename}}</span>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-scrollbar>
                        </div>
                    </div>

                    <div v-else class="uploads">
                        <div class="title">
                            <div>
                                <el-button size="mini" @click="resetUpload">{{uploadList.length?'重新上传':'上传文件'}}</el-button>
                                <el-button size="mini" v-show="uploadList.length" type="primary" @click="submitUpload">提交上传</el-button>
                            </div>
                        </div>
                        <div v-if="uploadList.length" class="file-content">
                            <el-scrollbar class="scrollbar">
                                <el-row :gutter="20" class="row-content">
                                    <el-col :span="3" v-for="(pic,idx) in picList" :key="idx">
                                        <el-card :body-style="{padding: '0px'}" v-loading="loadingUpload" element-loading-text="正在上传中...">
                                            <div class="icon-img" style="background-image:url('/images/icons/xlsx.png')"></div>
                                            <div class="desc">
                                                <span>{{pic.name}}</span>
                                            </div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </el-scrollbar>
                        </div>
                        <div v-else class="upload-comp">
                            <el-upload ref="uploadFile" drag multiple action="" :auto-upload="false" :show-file-list="false" :on-change="uploadChange">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<el-button id="updalodBtn" slot="trigger" type="text">点击上传</el-button>
                                </div>
                                <div class="el-upload__tip" slot="tip">上传的文件不超过1M</div>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import samForm from '~/components/form';
import dataUtil from '~/util/data_util';
import axios from 'axios';
export default {
    name: 'files',
    components: {
        samForm
    },
    data: () => ({
        dragging: false,
        leftWidth: 400,
        selectOrg: {
            orgsid: []
        },
        sourceData: [],
        treeData: [],
        defaultProps: {
            children: 'children',
            label: 'name'
        },
        isAddForm: false,
        formTitle: "",
        formData: {
            "gutter": 20,
            "colspan": 6,
            "size": "small",
            "itemList": [
                {
                    "name": "name",
                    "label": "目录名称",
                    "type": "String",
                    "required": true,
                    "component": "sam-input",
                    "cptype": "text",
                    "default": "",
                    "rules": [
                        {
                            "required": true,
                            "message": "请填写目录名称",
                            "trigger": "blur"
                        }
                    ],
                    "table": "fileCatalog",
                    "value": "",
                    "tableName": "fileCatalog-name",
                    "key": "name"
                },
                {
                    "name": "cata_name",
                    "label": "系统目录命名(英文)",
                    "type": "String",
                    "required": true,
                    "component": "sam-input",
                    "cptype": "text",
                    "default": "",
                    "rules": [
                        {
                            "required": true,
                            "message": "系统目录命名",
                            "trigger": "blur"
                        },
                        {
                            "pattern": "^[A-Za-z0-9]+$",
                            "message": "正则验证失败: 须匹配由数字和英文",
                            "trigger": [
                                "blur",
                                "change"
                            ]
                        }
                    ],
                    "table": "fileCatalog",
                    "value": "",
                    "tableName": "fileCatalog-cata_name",
                    "key": "cata_name"
                }

            ]
        },
        formValue: {
            name: "",
            cata_name: ""
        },
        currNode: null,
        editNode: null,
        childrenList: [],
        fileList: [],
        isAddFile: false,
        uploadList: [],
        picList: [],
        loadingUpload: false,
        uploadCompleted: false,
    }),
    methods: {

        getFolder(node) {
            return node.children ? 'folder' : 'empty-folder';
        },
        // 此处还需优化
        getExt(file) {
            let ext = this.$global.getExt(file.filename);
            if (['doc', 'docx', 'xlsx', 'pdf', 'ppt', 'zip', 'rar'].includes(ext)) {
                return ext;
            }
            return "common";
        },
        resetUpload() {
            this.uploadList = [];
            this.picList = [];
        },
        removeFile(index) {
            this.uploadList.splice(index, 1);
            this.picList.splice(index, 1);
        },
        // 提交上传，不适用封装的axios
        submitUpload() {
            let formData = new FormData();
            this.uploadList.forEach((file, index) => {
                formData.append(`file_${index}`, file.raw);
            });
            console.log(this.currNode);
            if (this.currNode) {
                formData.append('path', this.currNode.path);
            }
            //return;
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
                },
                transformRequest: [function (data) {
                    return data
                }]
            }
            axios.post("/upload", formData, config).then(res => {
                console.log('progressEvent', res)
                //this.$refs.uploadFile.clearFiles();
                if (res && res.status == 200) {
                    //this.uploadList = [];
                    if (res.data && res.data.success) {
                        this.$message.info("上传成功");
                        this.addFiles(res.data.response);
                    }
                }
            });
        },
        // 添加数据到该目录下
        addFiles(lists) {
            let arr = lists.map(item => {
                return {
                    "cid": this.currNode ? this.currNode.id : 0,
                    "filename": item.originalFilename,
                    "filepath": item.filePath,
                    "filesize": item.size
                }
            })
            let condition = {
                type: 'addPatch',
                collectionName: "fileList",
                data: arr
            };
            this.$axios.$post('mock/db', { data: condition }).then(res => {
                console.log('addFiles', res);
                this.setCurrNode(this.currNode, true);
            });
        },
        uploadChange(file, fileList) {
            console.log('uploadChange', file, fileList);
            if (file.status === 'ready') {
                this.uploadList.push(file);
                let windowURL = window.URL || window.webkitURL;
                let obj = {
                    'url': windowURL.createObjectURL(file.raw),
                    'uid': file.uid,
                    'name': file.raw.name,
                    'size': file.raw.size,
                    'status': file.status,
                    'percent': 0
                };
                this.picList.push(obj);
            }
        },
        // 计算文件大小
        formatFileSize(fileSize) {
            if (fileSize < 1024) {
                return fileSize + 'B';
            } else if (fileSize < (1024 * 1024)) {
                var temp = fileSize / 1024;
                temp = temp.toFixed(2);
                return temp + 'KB';
            } else if (fileSize < (1024 * 1024 * 1024)) {
                var temp = fileSize / (1024 * 1024);
                temp = temp.toFixed(2);
                return temp + 'MB';
            } else {
                var temp = fileSize / (1024 * 1024 * 1024);
                temp = temp.toFixed(2);
                return temp + 'GB';
            }
        },
        addDir(node = null) {
            this.currNode = node;
            this.formTitle = "添加一级目录";
            if (node) {
                this.formTitle = "添加" + node.name + "下级目录";
            }
            console.log('addDir', this.currNode);
            this.isAddForm = true;
        },

        submitForm() {
            let data = { ...this.formValue };
            data.pid = 0;
            let refForm = this.$refs['editform'];
            let isValidate = refForm.checkFormValidate();
            if (!isValidate) {
                this.$message.error('表单数据的验证有误，请核查！');
                return;
            }
            data.path = data.cata_name;
            if (this.currNode) {
                data.pid = this.currNode.id;
                data.path = this.currNode.path + "/" + data.cata_name;
            }
            let condition = {
                type: 'addData',
                collectionName: "fileCatalog",
                data: data
            };
            this.$axios.$post('mock/db', { data: condition }).then(res => {
                //console.log('submitForm', res);
                if (res) {
                    let cn = {
                        type: 'mkdir',
                        path: data.path
                    }
                    this.$axios.$post('mock/files', { data: cn }).then(result => {
                        //console.log('mkdir', result);
                        if (result) {
                            this.$message.info("目录提交成功！")
                        }
                        this.isAddForm = false;
                    });
                }
            });
        },
        resetForm() {
            this.$refs.editform.resetForm();
        },
        updateNode() {
            console.log(this.editNode);
        },
        editTree(data) {
            this.editNode = { ...data };
            /* data.isEdit = true;
            let index = _.findIndex(this.treeData, { "id": data.id });
            this.$set(this.treeData, index, data); */
        },

        removeTree(node, data) {
            console.log('removeTree', node, data)
            /* const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1); */
        },

        // 节点上点击列出该目录下文件
        nodeClick(data) {
            console.log('nodeClick', data);
            this.setCurrNode(data)
        },
        setCurrNode(data, flag) {
            this.isAddForm = false;
            this.isAddFile = false;
            this.fileList = [];
            this.uploadList = [];
            this.picList = [];
            this.childrenList = data.children || [];
            if (!flag) this.currNode = { ...data };
            let condition = {
                type: 'listData',
                collectionName: "fileList",
                data: { "cid": data.id }
            };
            this.$axios.$post('mock/db', { data: condition }).then(res => {
                console.log('fileList', res);
                this.fileList = res.list;
            });
        },

        handleDrop(draggingNode, dropNode, dropType, ev) {
            console.log('tree drop: ', dropNode.label, dropType);
        },
        allowDrop(draggingNode, dropNode, type) {
            if (dropNode.data.label === '二级 3-1') {
                return type !== 'inner';
            } else {
                return true;
            }
        },

        handlerMouseDown(evt) {
            this.dragging = true;
            let startX = evt.clientX;
            const handleMouseMove = (event) => {
                const deltaX = event.clientX - startX;
                //this.leftWidth += deltaX;
            }
            const handleMouseUp = () => {
                if (this.dragging) {
                    this.dragging = false;
                }
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.onselectstart = null;
                document.ondragstart = null;
            }
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        },
        // 获取文件树目录结构
        async getTreeList() {
            let condition = {
                type: 'listData',
                collectionName: "fileCatalog",
                data: {}
            };
            let res = await this.$axios.$post('mock/db', { data: condition });
            this.sourceData = [...res.list];

            this.treeData = this.$global.toTree(res.list, { parentKey: 'pid' });
            this.childrenList = [...this.treeData];
            console.log('getTreeList', this.treeData);
        }

    },
    mounted() {
        this.getTreeList();
    },

    layout: "admin"
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
